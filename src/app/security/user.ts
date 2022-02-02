import {Role} from "../models/role";

export interface User{
  id: number;
  name: string;
  password: string;
  email: string;
  address: string;
  zipCode: string;
  hometown: string;
  createdAt: Date;
  role: Role;
  superVisorId:number;
  token: string;
}
