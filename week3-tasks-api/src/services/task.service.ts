import { TaskRepository } from "../repositories/task.repository.js";
import { Prisma } from "@prisma/client";
import type { CreateTaskDTO } from "../types/tasks.js";

export class TaskServices{

  constructor(private taskRepo:TaskRepository ){}


  async addTask(task:CreateTaskDTO, userId: number){

    return await this.taskRepo.create(task,userId);
  }


  async findAllTasks(userId:number,status?: string){
    return await this.taskRepo.findAll(userId,status);
  }


  async findTaskById(id:number,userId: number){

    const task= await this.taskRepo.findById(id,userId);

    if(!task){
      throw new Error(`Task wth id ${id} not found.`);
    }

    return task;
  }


  async updateTask(id:number, userId: number ,task:Prisma.TaskUpdateInput){

    try{
         return await this.taskRepo.update(id,userId,task);
    }
    catch(e:any){
      throw new Error(`Task with id ${id} not found or unauthorized.`)
    }
  }

  async deleteTask(id: number, userId:number) {
  try {
    return await this.taskRepo.delete(id,userId);
  } catch (e) {
    throw new Error(`Task with id ${id} not found or unauthorized.`);
  }
}

}