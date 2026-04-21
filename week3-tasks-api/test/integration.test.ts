import { describe, it , expect, beforeAll, afterAll} from "vitest";
import { buildApp} from "../src/app.js";

describe("API integration tests",()=>{
  let app: any;
  let authToken: string;

  beforeAll(async ()=>{
    app= await buildApp();
    await app.ready();
  });

  afterAll(async ()=>{
    await app.close();
  });

  // Schema Validation Error Test
  it("should return 400 if signup payload is missing password", async ()=>{
    const res = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload:{
        email: "toTestSignup@test.com",
        name: "test"
        // Password Missing
      }
    });
    expect(res.statusCode).toBe(400);
  });

  // Unauthorized Access Test
  it("should return 401 if accessing protected tasks without a token", async ()=>{
    const res= await app.inject({
      method: "GET",
      url: "/tasks/getAll"
    });
    expect(res.statusCode).toBe(401);
  });

  // Happy path with DB interaction
  it("should successfully signup, login and create a task", async ()=>{

  const testingEmail = `tester-${Date.now()}@example.com`;
  const testingPassword = "passwordIntegration1234";

    // Signup
    const signupRes = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload:{
        name: "Integration Tester",
        email: testingEmail,
        passwordHash: testingPassword
      }
    });
    expect(signupRes.statusCode).toBe(201);

    const loginRes= await app.inject({
      method: "POST",
      url: "/auth/login",
      payload:{
        email: testingEmail,
        password: testingPassword
      }
    });

    const loginBody= JSON.parse(loginRes.payload);
    const authToken= loginBody.token;

    console.log("LOGIN TOKEN CAPTURED:", authToken);
    expect(loginRes.statusCode).toBe(200);

    // Create a Task using the new token
    const taskRes= await app.inject({
      method: "POST",
      url: "/tasks/add",
      headers:{
        authorization: `Bearer ${authToken}`
      },
      payload:{
        title:"Verify Integration",
        description:"Testing the full flow from route to DB"
      }
    });

    const taskBody= JSON.parse(taskRes.payload);
    expect(taskRes.statusCode).toBe(201);
    expect(taskBody).toHaveProperty("id");
    expect(taskBody.title).toBe("Verify Integration");
  });

});