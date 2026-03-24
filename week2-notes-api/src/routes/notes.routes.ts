
import {create,findById,list,update} from "../repository/notes.repo.js";
import { createNoteSchema, createParamsSchema, createQuerystringSchema, updateNoteSchema } from "../schemas/notes.schemas.js";
import type { createNote, iParams, qQuery } from "../types/notes.js";
import type { FastifyInstance } from "fastify";

export async function notesRoutes(fastify: FastifyInstance){

  fastify.post<{Body:createNote}>('/',{schema: createNoteSchema},async(request,reply)=>{

    try{
      const {title,content}=request.body;
      const newNote=create(title,content);
      reply.status(201).send(newNote);
    }
    catch(Error){
      reply.status(500).send({"error":"InternalServerError","message":"Failed to create note"});
    }
  });

  fastify.get<{Querystring:qQuery}>('/',{schema: createQuerystringSchema}, async(request,reply)=>{

    try{
      const {q}= request.query;

      const filteredNotes= list(q);
      reply.status(200).send(filteredNotes);
    }
    catch(e){

      reply.status(500).send({"error": "InternalServerError","message":"Failed to fetch notes"});
    }
  });

  fastify.get<{Params: iParams}>('/:id',{schema: createParamsSchema}, async(request,reply)=>{



      const {id}= request.params;
      const foundNote=findById(id);

      if(!foundNote){
        return reply.status(404).send({"error":"NotFoundError","message":"Note not found"});
      }

      reply.status(200).send(foundNote);

  });

  fastify.put<{Params: iParams, Body: createNote}>('/:id',{schema: updateNoteSchema}, async(request,reply)=>{

    const {id}= request.params;
    const {title, content}= request.body;

    const updatedNote= update(id,title,content);

    if(!updatedNote){
      return reply.status(404).send({"error":"NotFoundError","message":"Note not found!"})
    }

    reply.status(200).send(updatedNote);
  })
}

