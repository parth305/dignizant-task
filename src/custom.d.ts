// custom.d.ts
enum Types {
  USER = 'USER',
  SELLER = 'SELLER',
}
interface UserInterface {
  name: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  userType:Types;
  _id:string
}
declare namespace Express {
    interface Request {
      user: any; // You can replace 'any' with the actual type of your 'user' property
    }
  }
  