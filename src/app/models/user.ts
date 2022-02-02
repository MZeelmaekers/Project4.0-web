import {Role} from "./role";

export interface User{
  id: number;
  name: string;
  password: string;
  email: string;
  address: string;
  zipCode: string;
  hometown: string;
  createdAt: string;
  role: Role;
  superVisorId:number;
}
