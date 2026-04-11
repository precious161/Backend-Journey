import { PrismaClient } from "@prisma/client/index.js";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as bcrypt from "bcrypt";

const connectionString=process.env.DATABASE_URL;
const pool= new pg.Pool({connectionString});
const adapter = new PrismaPg(pool);
const prisma= new PrismaClient({adapter});

async function main(){

  const testUserPassword= "test3675we";
  const salt= await bcrypt.genSalt(10);
  const passwordHash= await bcrypt.hash(testUserPassword,salt);

  const testUser= await prisma.user.upsert({
    where:{
      email:'Testuser@example.com'
    },
    update:{},
    create:{
      email:'Testuser@example.com',
      name: 'Test-user',
      passwordHash: passwordHash,
      tasks: { create: [ {title: "Task 1"}, {title: "Task 2"}]}
    }
  });
}

main()
.then(async ()=>{
   await prisma.$disconnect();
   await pool.end();
})
.catch( async (e) =>{
  console.error(e);
  await prisma.$disconnect();
  await pool.end();
  process.exit(1);
})