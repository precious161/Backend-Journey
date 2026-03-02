import type{ FastifyRequest, FastifyReply } from "fastify";
const startTime= Date.now();

export default async function getHealth(request:FastifyRequest ,reply:FastifyReply){

  const uptimeInSeconds= Math.floor((Date.now()-startTime)/1000);

  reply.send({status: 'ok',uptime:uptimeInSeconds});

}