import { TaskRepository } from "../repositories/task.repository.js";
import { Prisma } from "@prisma/client";
import type { CreateTaskDTO } from "../types/tasks.js";

export class TaskServices{

  constructor(private taskRepo:TaskRepository ){}


  async addTask(task:CreateTaskDTO){

    return await this.taskRepo.create({
      ...task,
      user: {connect: { id:1}}
    });
  }


  async findAllTasks(status?: string){
    return await this.taskRepo.findAll(status);
  }


  async findTaskById(id:number){

    const task= await this.taskRepo.findById(id);

    if(!task){
      throw new Error(`Task wth id ${id} not found.`);
    }

    return task;
  }


  async updateTask(id:number, task:Prisma.TaskUpdateInput){

    try{
         return await this.taskRepo.update(id,task);
    }
    catch(e:any){
      throw new Error(`Task with id ${id} not found.`)
    }
  }

  async deleteTask(id: number) {
  try {
    return await this.taskRepo.delete(id);
  } catch (e) {
    throw new Error(`Task with id ${id} not found.`);
  }
}

}