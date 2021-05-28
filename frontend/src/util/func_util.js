import { body } from "express-validator";

export const limitChars = (body, charLimit) => (
  body.length > charLimit ? (
    body.slice(0,charLimit-3).concat("...")
  ) : body
);
