import type { FastifyInstance } from "fastify";
import type { EchoQuery } from "../controllers/echo.js";
import getEcho from "../controllers/echo.js";

export default async function echoRoutes(fastify:FastifyInstance){

 fastify.get<{Querystring: EchoQuery}>('/echo',getEcho);

}

