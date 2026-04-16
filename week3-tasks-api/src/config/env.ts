import dotenv from "dotenv";

dotenv.config();

export const config={
  port: Number(process.env.PORT) || 3274,
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV
}

if( !config.dbUrl){

  throw new Error("Missing envirnment variable : DATABASE_URL");

}
if( !config.port){

  throw new Error("Missing envirnment variable : PORT");

}

if(!config.jwtSecret){

  throw new Error("Missing envirnment variable : JWT_SECRET");

}

if(!config.node_env){

  throw new Error("Missing envirnment variable : NODE_ENV");

}