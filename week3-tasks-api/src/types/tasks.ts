
import { Prisma } from "@prisma/client";

export type CreateTaskDTO= Omit<Prisma.TaskCreateInput, 'user' | 'id'>;

export type TaskStatus = 'OPEN'| 'IN_PROGRESS' | 'DONE';

export interface Tparams{
  id: number
}

export interface Tquery{
  status: string
}

