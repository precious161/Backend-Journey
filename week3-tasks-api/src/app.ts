import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import { TaskRoutes } from "./routes/tasks.routes.js";
import  authPlugin from "./plugins/auth.js";
import { AuthRoutes } from "./routes/auth.routes.js";

export const app = Fastify({logger:true});

app.register(prismaPlugin);
app.register(authPlugin);
app.register(AuthRoutes, { prefix: '/auth'});
app.register(TaskRoutes,{prefix:'/tasks'});

