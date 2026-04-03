import { PrismaClient } from "@prisma/client/index.js";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString=process.env.DATABASE_URL;
const pool= new pg.Pool({connectionString});
const adapter = new PrismaPg(pool);

const prisma= new PrismaClient({adapter});

async function main(){

  await prisma.user.upsert({
    where:{
      email:'user@example.com'
    },
    update:{},
    create:{
      email:'user@example.com',
      name: 'User'
    }
  });
}

main()
.then(async ()=>{
   await prisma.$disconnect();
})
.catch( async (e) =>{
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
})