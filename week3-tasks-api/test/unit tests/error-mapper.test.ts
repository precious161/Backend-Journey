import { getHttpStatus } from "../../src/utils/error-mapper.js";
import { describe, it, expect } from "vitest";

describe("Error Mapper Utility", ()=>{

  it("should return 409 for Prisma P2002", ()=>{
    const result= getHttpStatus("P2002");
    expect(result).toBe(409);
  });

  it("should return 404 for Prisma P2025",()=>{
    const result= getHttpStatus("P2025");
    expect(result).toBe(404);
  });

  it("should return 5000 for any unknown error code", ()=>{
    const result=getHttpStatus("Random value");
    expect(result).toBe(500);
  })
})