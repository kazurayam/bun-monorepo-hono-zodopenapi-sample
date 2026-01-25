// packages/frontend/testing-library.ts
import { afterEach, expect, it } from "bun:test";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
    cleanup();
});

console.log("Testing Library setup completed");

