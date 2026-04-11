import type { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/auth.service.js";
import type { signUpBody,loginBody } from "../types/fastify.js";
export class AuthController{

  constructor(private authService: AuthService){}

  register= async (request: FastifyRequest<{Body:signUpBody}>, reply: FastifyReply)=>{

    try{

      const {passwordHash, ...newUser}= await this.authService.register(request.body);

      return reply.status(201).send(newUser);
    }
    catch(err: any){

      return reply.status(500).send({message:"Internal Service Error",error:"InternalServiceError"});
    }
  }

  login= async (request:FastifyRequest<{Body:loginBody}>,reply:FastifyReply)=>{

    try{

      const {email,password}=request.body;

      const user= await this.authService.login(email,password);

      if(!user){
        return reply.status(401).send({
          message: "Invalid credentials",
          error:"Unauthorized"
        });
      }

      const token= request.server.jwt.sign({id:user.id,email: user.email});

      const { passwordHash, ...userWithoutPassword}= user;
      return reply.status(200).send({user:userWithoutPassword,token});

    }
    catch(err: any){

      return reply.status(500).send({message:"Internal Service Error",error:"InternalServiceError"});
    }
  }
}