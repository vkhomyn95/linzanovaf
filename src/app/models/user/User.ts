export interface User {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  password: string;
  location: string;
  number: string;
  warehouse: string;
  postIndex: string;
}
export interface UpdateUser {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  location: string;
  number: string;
  warehouse: string;
  postIndex: string;
  userRole: string;
  password: string;
}

export interface UpdateCurrentUser {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  location: string;
  number: string;
  warehouse: string;
  postIndex: string;
}

export interface PasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
