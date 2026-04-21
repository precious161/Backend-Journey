export const isOwner= (taskUserId: string | number , userId: string| number): boolean=>{

  if(!taskUserId || !userId){
    return false;
  }

  return taskUserId.toString() === userId.toString();
}