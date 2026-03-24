import Fastify from "fastify";
import {notesPost } from "./routes/notes.routes.js";


export const app=Fastify({logger:true});

app.register(notesPost, {prefix: '/notes'});