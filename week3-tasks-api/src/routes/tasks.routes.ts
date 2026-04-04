import type { FastifyInstance } from "fastify";
import type { Tquery,Tparams } from "../types/tasks.js";
import { TaskServices } from "../services/task.service.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { createTaskSchema,taskParamsSchema,taskQuerySchema,updateTaskSchema,deleteTaskSchema } from "../schemas/tasks.schema.js";


export async function TaskRoutes(fastify:FastifyInstance){

  const repo= new TaskRepository(fastify.prisma);
  const service = new TaskServices(repo);

  fastify.post('/',{schema:createTaskSchema},async (request,reply)=>{

    const task= await service.addTask(request.body as any);
    return reply.status(201).send(task);
  })


  fastify.get<{Querystring:Tquery}>('/',{schema: taskQuerySchema}, async (request,reply)=>{

    try{
       const {status}=request.query;
       const filteredTasks= await service.findAllTasks(status);

       return reply.status(200).send(filteredTasks);
    }
    catch(e:any){
          return reply.status(404).send({"error":"NotFoundError","message":"Tasks not found."});
    }
  });


  fastify.get<{Params:Tparams}>('/:id',{schema:taskParamsSchema},async (request,reply)=>{

    try{
      const {id}=request.params;
      const task= await service.findTaskById(id);
      return reply.status(200).send(task);
    }
    catch(e:any){
      return reply.status(404).send({"error":"NotFoundError","message":"Task not found."})
    }
  });


  fastify.put<{Params: Tparams}>('/:id',{schema:updateTaskSchema}, async (request,reply)=>{

    try{
         const {id}= request.params;
         const updatedTask= await service.updateTask(id, request.body as any);
         return reply.status(200).send(updatedTask);
    }
    catch(e){

      return reply.status(404).send({"error":"NotFoundError","message":"Task not found."})
    }
  });


  fastify.delete<{Params: Tparams}>('/:id',{schema:deleteTaskSchema},async (request,reply)=>{

    try{

      const {id}= request.params;
      await service.deleteTask(id);
      return reply.status(204).send();
    }
    catch(e:any){

      return reply.status(404).send({"error":"NotFoundError","message":"Task not found."});
    }
  })


}