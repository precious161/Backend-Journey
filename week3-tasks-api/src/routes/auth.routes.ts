import { AuthRepository } from "../repositories/auth.repository.js";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import type { FastifyInstance } from "fastify";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

export function AuthRoutes(fastify:FastifyInstance){

  const authRepo= new AuthRepository(fastify.prisma);
  const authService= new AuthService(authRepo);
  const authController= new AuthController(authService);

  fastify.post('/signup',{schema:registerSchema}, authController.register.bind(authController));
  fastify.post('/login',{schema:loginSchema},authController.login.bind(authController));
}