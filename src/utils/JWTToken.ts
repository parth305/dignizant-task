import jwt from "jsonwebtoken";
export async function generateToken(_id: any) {
  const key: string = process.env.privateKey as string;

  const token = jwt.sign({ _id }, key);

  return token;
}

export async function checkToken(token: string) {
  const key: string = process.env.privateKey as string;
  const decoded = jwt.verify(token, key);
  return decoded;
}
