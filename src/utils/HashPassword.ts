import bcryptjs from "bcryptjs";

export async function generateHash(val:string) {
  const salt = await bcryptjs.genSalt(8);
  const password = await bcryptjs.hash(val, salt);
  return password;
}

export async function checkHash(password:string, encryptedPassword:string) {
  const result = await bcryptjs.compare(password, encryptedPassword);
  return result;
}
