export interface User {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
  location: string;
  number: string;
  warehouse: string;
  userRole: string;
}
export interface UpdateUser {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  location: string;
  number: string;
  warehouse: string;
  userRole: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
