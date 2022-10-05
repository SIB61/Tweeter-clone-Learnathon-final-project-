export interface UserModel {
  id?: string;
  fullName: string;
  userName: string;
  email: string;
  dateOfBirth: string;
  createdAt?: Date;
  password?: string;
  repeatedPassword?: string;
}
