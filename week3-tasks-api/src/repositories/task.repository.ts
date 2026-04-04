import { PrismaClient,Prisma } from "@prisma/client";


export class TaskRepository{

  constructor(private prisma:PrismaClient){}

  async create(data:Prisma.TaskCreateInput){

    return await this.prisma.task.create({
      data,
    });
  }

  async findAll(status?: string){
    return await this.prisma.task.findMany({
      where:{
          userId: 1,
          ...(status ? { status: status as any}:{})
      }
    });
  }


  async findById(id:number){
    return await this.prisma.task.findUnique({
      where: {id}
    });
  }

  async update(id:number, data:Prisma.TaskUpdateInput){
    return await this.prisma.task.update({
      where: {id},
      data,
    });
  }

  async delete(id:number){
    return await this.prisma.task.delete({
      where: {id},
    });
  }
}


