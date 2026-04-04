import { app } from "./app.js";
import "dotenv/config";

const port=Number(process.env.PORT) || 3274;
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