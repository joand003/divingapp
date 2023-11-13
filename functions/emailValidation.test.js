import validateEmail from "./emailValidation";
import { expect, test } from "@jest/globals";

describe("Email validation", () => {
    test("valid email", () => {
        expect(validateEmail("example@example.com")).toBe(true);
    });

    test("invalid email no .com", () => {
        expect(validateEmail("example@example")).toBe(false);
    });

    test("invalid email no @", () => {
        expect(validateEmail("exampleexample.com")).toBe(false);
    });

    test("invalid email no .com or @", () => {
        expect(validateEmail("exampleexample")).toBe(false);
    });
});
