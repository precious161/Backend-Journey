import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import { TaskRoutes } from "./routes/tasks.routes.js";
import  authPlugin from "./plugins/auth.js";
import { AuthRoutes } from "./routes/auth.routes.js";
import { config } from "./config/env.js";
import  errorPlugin  from "./plugins/error-handler.js";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";


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

export const buildApp= async()=>{

  const app = Fastify({logger:loggerOptions});

app.register(prismaPlugin, { dbUrl: config.dbUrl});
app.register(authPlugin, { secret: config.jwtSecret});
app.register(errorPlugin);


  await app.register(swagger, {
    openapi:{
      info:{
        title:"Tasks API",
        description:"Simple Task Management API",
        version: "1.0.0"
      },
      components:{
        securitySchemes:{
          bearerAuth:{
            type: "http",
            scheme:"bearer",
            bearerFormat:"JWT"
          }
        }
      }
    }
  });

  await app.register(swaggerUi,{
    routePrefix:"/docs",
    uiConfig:{
      docExpansion:"list",
      deepLinking: false
    }
  });

app.register(AuthRoutes, { prefix: '/auth'});
app.register(TaskRoutes,{prefix:'/tasks'});

return app;
}


