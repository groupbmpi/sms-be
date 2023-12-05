import * as jwt from "jsonwebtoken";

const SECRET = "secret";

export function sign(payload: any) {
  return jwt.sign(payload, SECRET);
};

export function verify(token: string) {
  return jwt.verify(token, SECRET);
};