import type { FastifyRequest, FastifyReply} from "fastify";
import { TaskServices } from "../services/task.service.js";
import type { Tquery,Tparams } from "../types/tasks.js";


export class TaskController{

  constructor(private taskService:TaskServices){};

    addTask= async(request:FastifyRequest,reply:FastifyReply)=>{

        const userId= request.user.id;
        const task= await this.taskService.addTask(request.body as any, userId);
        return reply.status(201).send(task);

      }


getTask= async(request:FastifyRequest<{Querystring:Tquery}>, reply:FastifyReply)=>{


         const {status}=request.query;
         const userId= request.user.id;
         const filteredTasks= await this.taskService.findAllTasks(userId,status);

         return reply.status(200).send(filteredTasks);

      }


getTasksById= async(request:FastifyRequest<{Params:Tparams}>,reply:FastifyReply)=>{


        const {id}=request.params;
        const userId= request.user.id;
        const task= await this.taskService.findTaskById(id,userId);
        return reply.status(200).send(task);


}
updateTask= async(request:FastifyRequest<{Params:Tparams}>,reply:FastifyReply)=>{

           const {id}= request.params;
           const userId= request.user.id;
           const updatedTask= await this.taskService.updateTask(id,userId,request.body as any);
           return reply.status(200).send(updatedTask);
      }



deleteTask=async (request:FastifyRequest<{Params:Tparams}>,reply:FastifyReply)=>{



      const {id}= request.params;
      const userId= request.user.id;
      await this.taskService.deleteTask(id,userId);
      return reply.status(204).send();



  };


}