import { UserRepository } from '@/repositories/user.repositories';
import { User } from '@/types/user';
import { AuthUserRegisteredPayload } from '@chat-app-microservice/common';

class UserService {
  constructor(private readonly repository: UserRepository) {}

  async syncFromAuthUser(payload: AuthUserRegisteredPayload): Promise<User> {
    return this.repository.upsertFromAuthEvent(payload);
  }
}

export const userService = new UserService(new UserRepository());
