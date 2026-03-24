import { title } from "node:process";
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

export function list(q?: string){

  if(!q){
    return notes;
  }

  let searchTerm=q.toLowerCase();
const filteredNotes=notes.filter((note)=>
  note.title.toLowerCase().includes(searchTerm)|| note.content?.toLowerCase().includes(searchTerm)
)

return filteredNotes;
}