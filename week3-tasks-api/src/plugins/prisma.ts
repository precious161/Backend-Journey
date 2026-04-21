import fastifyPlugin  from "fastify-plugin";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import  type { FastifyInstance } from "fastify";

declare module 'fastify'{
  interface FastifyInstance{
    prisma: PrismaClient;
  }
}


 async function prismaConnector(fastify: FastifyInstance,options:any){
  const connectionString= options.dbUrl;
  const pool= new pg.Pool({connectionString});
   const adapter= new PrismaPg(pool);

const prisma= new PrismaClient({adapter});
        fastify.decorate('prisma',prisma);
        fastify.addHook('onClose',async ()=>{
          await prisma.$disconnect()
          await pool.end()});

}

export default fastifyPlugin(prismaConnector);
