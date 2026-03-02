import type{ FastifyRequest, FastifyReply } from "fastify";

export interface EchoQuery{
  msg: string
}

export default async function getEcho(request:FastifyRequest<{Querystring: EchoQuery}> ,reply:FastifyReply){

  const { msg }= request.query;

      reply.send({msg:msg});
}