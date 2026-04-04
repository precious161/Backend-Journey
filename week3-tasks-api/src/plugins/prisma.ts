import fastifyPlugin  from "fastify-plugin";
import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import fastify, { type FastifyInstance } from "fastify";
declare module 'fastify'{
  interface FastifyInstance{
    prisma: PrismaClient;
  }
}


const connectionString= process.env.DATABASE_URL;
const pool= new pg.Pool({connectionString});
const adapter= new PrismaPg(pool);

const prisma= new PrismaClient({adapter});

 async function prismaConnector(fastify: FastifyInstance,options:any){
        fastify.decorate('prisma',prisma);
        fastify.addHook('onClose',async ()=>{
          await prisma.$disconnect()
          await pool.end()});

}

export default fastifyPlugin(prismaConnector);
