import type { FastifyRequest, FastifyReply} from "fastify";
import { TaskServices } from "../services/task.service.js";
import type { Tquery,Tparams } from "../types/tasks.js";


export class TaskController{

  constructor(private taskService:TaskServices){};

    addTask= async(request:FastifyRequest,reply:FastifyReply)=>{
      try{

        const userId= request.user.id;
        const task= await this.taskService.addTask(request.body as any, userId);
        return reply.status(201).send(task);
      }
      catch(err:any){

        return reply.status(500).send({
        message: "Internal Server Error",
        error: "InternalServerError"
      });
      }
    }

getTask= async(request:FastifyRequest<{Querystring:Tquery}>, reply:FastifyReply)=>{

   try{
         const {status}=request.query;
         const userId= request.user.id;
         const filteredTasks= await this.taskService.findAllTasks(userId,status);

         return reply.status(200).send(filteredTasks);
      }
      catch(e:any){
            return reply.status(401).send({
              messagge: "Authentication required to fetch tasks.",
              error:"UnauthorizedError"
            });
      }
}

getTasksById= async(request:FastifyRequest<{Params:Tparams}>,reply:FastifyReply)=>{

   try{
        const {id}=request.params;
        const userId= request.user.id;
        const task= await this.taskService.findTaskById(id,userId);
        return reply.status(200).send(task);
      }
      catch(e:any){
        return reply.status(404).send(
          {
            message: "Task not found or you do not have permission to view it.",
            error:"NotFoundError"}
        );
      }
}
updateTask= async(request:FastifyRequest<{Params:Tparams}>,reply:FastifyReply)=>{

   try{
           const {id}= request.params;
           const userId= request.user.id;
           const updatedTask= await this.taskService.updateTask(id,userId,request.body as any);
           return reply.status(200).send(updatedTask);
      }
      catch(e){

        return reply.status(404).send({
          message: "Task not found or update unauthorized.",
          error:"NotFoundError"
        })
      }
}

deleteTask=async (request:FastifyRequest<{Params:Tparams}>,reply:FastifyReply)=>{

    try{

      const {id}= request.params;
      const userId= request.user.id;
      await this.taskService.deleteTask(id,userId);
      return reply.status(204).send();
    }
    catch(e:any){

      return reply.status(404).send({
        message: "Task not found or deletion unauthorized.",
        error:"NotFoundError"
      });
    }
  };


}