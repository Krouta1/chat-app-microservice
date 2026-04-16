import { sequelize } from '@/db/sequelize';
import { publishUserRegisteredEvent } from '@/messaging/event-publishing';
import { RefreshToken, UserCredentials } from '@/models';
import { AuthResponse, RegisterInput } from '@/types/auth';
import { hashPassword, signAccessToken, signRefreshToken } from '@/utils/token';
import { HttpError } from '@chat-app-microservice/common';
import { Op, type Transaction } from 'sequelize';

const REFRESH_TOKEN_TTL_DAYS = 30;

export const register = async (input: RegisterInput): Promise<AuthResponse> => {
  // Check if user with the same email already exists
  const existing = await UserCredentials.findOne({
    where: { email: { [Op.eq]: input.email } },
  });

  if (existing) {
    throw new HttpError(409, 'User with this email already exists');
  }

  const transaction = await sequelize.transaction();
  try {
    const passwordHash = await hashPassword(input.password);
    const user = await UserCredentials.create(
      {
        displayName: input.displayName,
        email: input.email,
        passwordHash,
      },
      { transaction },
    );

    // Create a refresh token record for the new user
    const refreshTokenRecord = await createRefreshToken(user.id, transaction);
    await transaction.commit();
    const accessToken = signAccessToken({ sub: user.id, email: user.email });
    const refreshToken = signRefreshToken({ sub: user.id, tokenId: refreshTokenRecord.tokenId });

    const userData = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      createdAt: user.createdAt.toISOString(),
    };

    //Publish user.registered event to RabbitMQ here
    await publishUserRegisteredEvent(userData);

    return {
      user: userData,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const createRefreshToken = async (
  userId: string,
  transaction?: Transaction,
): Promise<RefreshToken> => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_TTL_DAYS);

  const tokenId = crypto.randomUUID();
  const record = await RefreshToken.create(
    {
      tokenId,
      userId,
      expiresAt,
    },
    { transaction },
  );
  return record;
};
