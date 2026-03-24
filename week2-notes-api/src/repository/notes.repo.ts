import type { Note } from "../types/notes.js";

let notes:Note[]=[];

export function create(title: string, content?:string):Note{

  const id=crypto.randomUUID();
  const now=new Date().toISOString();


  let note:Note={
    id,
    title,
    ...(content!== undefined && { content }),
    createdAt: now,
    updatedAt: now
  };

  notes.push(note);
  return note;
}