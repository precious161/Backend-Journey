import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import { TaskRoutes } from "./routes/tasks.routes.js";
import  authPlugin from "./plugins/auth.js";
import { AuthRoutes } from "./routes/auth.routes.js";
import { config } from "./config/env.js";
import  errorPlugin  from "./plugins/error-handler.js";

let loggerOptions: any=true;

if(config.node_env==="development"){
  loggerOptions={
    transport: {target: "pino-pretty",
      options: {
        colorize: true
      }
     }
  }

}
else if(config.node_env==="production"){
    loggerOptions=true
}
export const app = Fastify({logger:loggerOptions});

app.register(prismaPlugin, { dbUrl: config.dbUrl});
app.register(authPlugin, { secret: config.jwtSecret});
app.register(errorPlugin);
app.register(AuthRoutes, { prefix: '/auth'});
app.register(TaskRoutes,{prefix:'/tasks'});

