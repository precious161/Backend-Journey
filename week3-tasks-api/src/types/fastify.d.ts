import "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply}  from "fastify";

declare module "@fastify/jwt"{
  interface FastifyJWT{
    payload: { id: number, email: string}
    user: {id: number, email: string}
  };
}

declare module "fastify"{
  interface FastifyRequest{
    user:{
      id: number
      email: string
    };
  }

  interface FastifyInstance{
  prisma: PrismaClient
  authenticate:(request:FastifyRequest,reply:FastifyReply)=>Promise<void>;
}
}

export interface signUpBody{
  name: string
  email: string
  passwordHash: string
}

export interface loginBody{
  email: string
  password: string
}