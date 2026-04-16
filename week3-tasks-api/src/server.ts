import { app } from "./app.js";
import { config } from "./config/env.js";

const port= config.port || 3274;
const host='0.0.0.0';

const start= async ()=>{

  try{
    await app.listen({port,host});
  }
  catch(e:any){
    app.log.error(e.message);
    process.exit(1);
  }
}

start();