import { Prisma } from "@prisma/client";
import { AuthRepository } from "../repositories/auth.repository.js";
import bcrypt from "bcrypt";

export class AuthService{

  constructor(private authRepo: AuthRepository){};


  async register(data: Prisma.UserCreateInput){


    const existingUser= await this.authRepo.findByEmail(data.email);

    if(existingUser){
      throw new Error("User already registered.")
    }

    const password= await bcrypt.hash(data.passwordHash,10);

    const newUser= await this.authRepo.create({
      ...data,
      passwordHash: password
    })

    return newUser;
  }


  async login( email: string, password: string){

    const user= await this.authRepo.findByEmail(email);

    if(!user){
      throw new Error("Invalid email or password");
    }

    const verfiedUser= await bcrypt.compare(password,user.passwordHash);

    if(!verfiedUser){
      return null;
    }

    return user;
  }
}