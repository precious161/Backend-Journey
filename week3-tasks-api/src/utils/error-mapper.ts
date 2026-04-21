
export const getHttpStatus=(code:string)=>{

  if(code === "P2002"){
    return 409;
  }
  else if(code === "P2025"){
    return 404;
  }
  else{
    return 500;
}
}