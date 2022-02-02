import {User} from "./user";
import {Role} from "../models/role";

export interface UserResponse {
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
