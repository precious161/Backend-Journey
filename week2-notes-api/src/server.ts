import { app } from "./app.js";

const port=6475;
const host='0.0.0.0';

const start = async()=>{

  try{
    await app.listen({port,host});
    app.log.info(`Server is successfully listening to port ${port} on ${host}`);
  }
  catch(e:any){
    app.log.error(e.message);
    process.exit(1);
  }
}

start();