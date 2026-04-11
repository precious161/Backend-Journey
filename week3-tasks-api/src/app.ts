import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import { TaskRoutes } from "./routes/tasks.routes.js";
import  authPlugin from "./plugins/auth.js";

export const app = Fastify({logger:true});

app.register(prismaPlugin);
app.register(authPlugin);
app.register(TaskRoutes,{prefix:'/tasks'});

