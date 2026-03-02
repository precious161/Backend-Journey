import fastify from 'fastify';
import pingRoutes  from '../routes/ping.js';
import healthRoutes from '../routes/health.js';
import echoRoutes from '../routes/echo.js';


const server=fastify({logger: true});
const port=3478;
const host='0.0.0.0';

server.register(pingRoutes);
server.register(healthRoutes);
server.register(echoRoutes);

try{

  await server.listen({port,host});

    console.log(`Server listening to port ${port} at ${host}`);
}
catch(err){
   console.error(err);
}
