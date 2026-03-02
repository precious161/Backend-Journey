const url= process.argv[2];
const jsonBody=process.argv[3];

if(!url || !jsonBody){

  console.log("Missing URL or JSON body");
  process.exit(1);
}

try{

  const response= await fetch(url,{method: "POST", headers: {"content-type": "application/json"},body: jsonBody});
  const data= await response.json();

  console.log(`The status code: ${response.status}`);
  console.log(data);

}
catch(err){
  console.error(err);
}