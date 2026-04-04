import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";

export const app = Fastify({logger:true});

app.register(prismaPlugin);