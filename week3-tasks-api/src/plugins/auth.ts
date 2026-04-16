import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { authenticate } from "../hooks/auth.hook.js";


export default fp(async (fastify, options:any )=>{

  fastify.register(fastifyJwt, {
    secret: options.secret
  });

  fastify.decorate("authenticate",authenticate);

});
