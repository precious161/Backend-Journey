import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { authenticate } from "../hooks/auth.hook.js";

export default fp(async (fastify)=>{

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!
  });

  fastify.decorate("authenticate",authenticate);

});