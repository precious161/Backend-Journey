import Fastify from "fastify";
import {notesRoutes } from "./routes/notes.routes.js";


export const app=Fastify({logger:true});

app.register(notesRoutes, {prefix: '/notes'});