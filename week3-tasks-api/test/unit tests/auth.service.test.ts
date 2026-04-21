import { AuthService } from "../../src/services/auth.service.js";
import { describe,it,expect,vi} from "vitest";

describe('AuthService',()=>{
  it("should hash the password during registration", async ()=>{

    const testRepo={
      findByEmail: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockImplementation((data)=>data)
    };

    const service= new AuthService(testRepo as any);

    const passwordRaw= "random-secret-password";
    await service.register({
      email: "testing@example.com",
      name: "tester",
      passwordHash: passwordRaw
    } as any);

    const savedData= testRepo.create.mock.calls[0]![0];

    expect(savedData.passwordHash).not.toBe(passwordRaw);
    expect(savedData.passwordHash.length).toBeGreaterThan(20);
  });

  it("should throw an error if the user already exists", async () => {

  const testRepo = {
    findByEmail: vi.fn().mockResolvedValue({ id: 1, email: "testing@example.com" }),
    create: vi.fn()
  };

  const service = new AuthService(testRepo as any);


  await expect(service.register({
    email: "testing@example.com",
    name: "tester",
    passwordHash: "123456"
  } as any)).rejects.toThrow("User already registered.");


  expect(testRepo.create).not.toHaveBeenCalled();
});
});