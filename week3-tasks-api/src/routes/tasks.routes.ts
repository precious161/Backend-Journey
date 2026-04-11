import type { FastifyInstance } from "fastify";
import { TaskServices } from "../services/task.service.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { TaskController } from "../controllers/task.controller.js";
import { createTaskSchema,getTasksSchema,getTaskByIdSchema,updateTaskSchema,deleteTaskSchema } from "../schemas/tasks.schema.js";


export async function TaskRoutes(fastify:FastifyInstance){

  const taskRepo= new TaskRepository(fastify.prisma);
  const taskService= new TaskServices(taskRepo);
  const taskController= new TaskController(taskService);

  fastify.addHook('onRequest',fastify.authenticate);

  fastify.post('/add',{schema:createTaskSchema}, taskController.addTask.bind(taskController));
  fastify.get('/getAll',{schema: getTasksSchema},taskController.getTask.bind(taskController));
  fastify.get('/getTask/:id',{schema:getTaskByIdSchema},taskController.getTasksById.bind(taskController));
  fastify.put('/update/:id',{schema:updateTaskSchema},taskController.updateTask.bind(taskController));
  fastify.delete('/delete/:id',{schema:deleteTaskSchema},taskController.deleteTask.bind(taskController));
}