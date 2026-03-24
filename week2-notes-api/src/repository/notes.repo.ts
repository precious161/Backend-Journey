import { title } from "node:process";
import type { Note } from "../types/notes.js";

let notes:Note[]=[];

// POST /notes Method
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

// GET /notes Method
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

// GET /notes/:id Method
export function findById(id: string){

  const foundNote= notes.find(note=>
      note.id===id
  )

  return foundNote;
}

// PUT /notes/:id Method
export function update(id: string, title: string, content?: string):Note|undefined{

  const index= notes.findIndex(note=>
    note.id===id
  )

  if(index===-1){
    return undefined;
  }


  const oldNote=notes.find(note=>
    note.id===id
  )

if(!oldNote){
  return undefined;
}
 const updatedNote: Note={
    id,
    title: title ?? oldNote.title ,
    content: content ?? oldNote.content ?? "",
    createdAt:oldNote.createdAt,
    updatedAt: new Date().toISOString()
  }

  notes[index]=updatedNote;

  return updatedNote;
}

// DELETE /notes/:id Method
export function deleteNote(id: string){

  let index= notes.findIndex(note=>
    note.id===id
  )

  if(index===-1){
    return undefined;
  }

  notes.splice(index,1);

  return true;
}