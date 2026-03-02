
const url= process.argv[2];

if(!url){

  console.log("Missing URL");
  process.exit(1);
}

try{

   const response= await fetch(url);
   const type= response.headers.get('content-type');
   const date= response.headers.get('date');
   const body= await response.text();

   console.log(`The status code: ${response.status}`);
   console.log(`The content type: ${type} `);
   console.log(`The Date is: ${date}`);
   console.log(`The first 200 characters of the body: ${body.slice(0,200)}`);



}
catch(err){

        console.error(err);

}