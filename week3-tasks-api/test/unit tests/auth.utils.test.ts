import { describe,it,expect } from "vitest";
import { isOwner } from "../../src/utils/auth-utils.js";

describe("Authorization Utility",()=>{

  it("should return true when IDs match",()=>{
    expect(isOwner("user12","user12")).toBe(true);
  });

  it("should return false when IDs are different",()=>{
    expect(isOwner("123","user-123")).toBe(false);
  });

  it("should return true when numeric and string IDs match",()=>{
    expect(isOwner("1234",1234)).toBe(true);
  });
})