import type { User } from "./schema";
import { UserSchema } from "./schema";
import { describe, it, expect } from "bun:test";

describe("User type", () => {
    it("should validate a valid user", () => {
        const validUser: User = {
            id: "user1",
            name: "Taro Yamada",
            email: "taro.yamada@example.com",
            createdAt: "2025-01-01T00:00:00Z"
        };
        expect(UserSchema.parse(validUser)).toEqual(validUser);
    });
});
