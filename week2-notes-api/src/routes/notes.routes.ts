import {create} from "../repository/notes.repo.js";
import { createNoteSchema } from "../schemas/notes.schemas.js";
import type { createNote } from "../types/notes.js";
import type { FastifyInstance } from "fastify";

export async function notesPost(fastify: FastifyInstance){

  fastify.post<{Body:createNote}>('/',{schema: createNoteSchema},async(request,reply)=>{

    try{
      const {title,content}=request.body;
      const newNote=create(title,content);
      reply.status(201).send(newNote);
    }
    catch(Error){
      reply.status(500).send({"error":"InternalServerError","message":"An unexpected error occurred while creating the note"});
    }
  })
}
