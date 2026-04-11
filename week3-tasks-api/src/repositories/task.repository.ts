import { PrismaClient,Prisma } from "@prisma/client";


export class TaskRepository{

  constructor(private prisma:PrismaClient){}

  async create(data:Prisma.TaskCreateWithoutUserInput, userId:number){

    return await this.prisma.task.create({
      data:{
        ...data,
        user: { connect: {id: userId}}
      }
    });
  }

  async findAll(userId:number,status?: string){
    return await this.prisma.task.findMany({
      where:{
          userId,
          ...(status ? { status: status as any}:{})
      }
    });
  }


  async findById(id:number, userId:number){
    return await this.prisma.task.findFirst({
      where: {id,userId}
    });
  }

  async update(id:number, userId:number ,data:Prisma.TaskUpdateInput){
    return await this.prisma.task.updateMany({
      where: {id,userId},
      data,
    });
  }

  async delete(id:number, userId: number){
    return await this.prisma.task.deleteMany({
      where: {id,userId},
    });
  }
}


