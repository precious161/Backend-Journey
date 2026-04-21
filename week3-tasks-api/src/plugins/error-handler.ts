import fp from "fastify-plugin";
import type { FastifyError,FastifyRequest, FastifyReply} from "fastify";

export default fp( async (fastify,options:any)=>{

  fastify.setErrorHandler((error:FastifyError, request:FastifyRequest, reply:FastifyReply)=>{

     request.log.error(error)
    if(error.validation){
      reply.status(400).send({error: "Bad Request", message: "Validation failed", details: error.validation});
    }
    else if(error.code==='P2002'){
      reply.status(409).send({message: "Resource already exists"});
    }
    else if(error.code ==='P2025'){
      reply.status(404).send({message: "Resource not found"});
    }
    else{
      reply.status(500).send({message: "Internal Server Error"});
    }

 })


})