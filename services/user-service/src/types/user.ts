export interface User {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  displayName: string;
  email: string;
}
