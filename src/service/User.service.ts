import { User } from "../model/User.model";
import { httpStatusCode } from "../utils/Consts";
import CustomError from "../utils/CustomError";
import { checkHash, generateHash } from "../utils/HashPassword";
import { checkToken, generateToken } from "../utils/JWTToken";
enum Types {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
interface UserInterface {
  name: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  userType:Types
}
export const createUserService = async ({
  name,
  username,
  phone,
  email,
  password,
userType
}: UserInterface) => {
  try {
    const hasedpassword = await generateHash(password);
    const data = await User.create({
      name,
      username,
      phone,
      email,
      password: hasedpassword,
      userType:userType?userType:Types.USER
    });
    const _id: any = data._id;
    const token = await generateToken(_id);
    return { token };
  } catch (error: any) {
    throw new CustomError(error.message, httpStatusCode["Bad Request"]);
  }
};

export const loginUserService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError(
      "User does not exists",
      httpStatusCode["Bad Request"]
    );
  }

  const pass = await checkHash(password, user.password);
  if (!pass) {
    throw new CustomError(
      "Email or passowrd is wrong",
      httpStatusCode["Bad Request"]
    );
  }
  const token = await generateToken(user._id);
  return { token };
};

export const meRequestService = async (id: string) => {

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError(
      "User does not exists",
      httpStatusCode["Bad Request"]
    );
  }
  const res={name:user?.name,username:user?.username,phone:user?.phone,email:user?.email,_id:user?._id,userType:user?.userType}
  return res
};

export const updateUserService = async (
  data: Partial<UserInterface>,
  id: string
) => {
  const user = await User.findById(id);

  if (!user) {
    throw new CustomError(
      "User does not exists",
      httpStatusCode["Bad Request"]
    );
  }

  if (data.password) {
    const hasedpassword = await generateHash(data.password);
    data = { ...data, password: hasedpassword };
  }
  const updatedUser = await User.findByIdAndUpdate(id, data,{new:true});

  const res={name:updatedUser?.name,username:updatedUser?.username,phone:updatedUser?.phone,email:updatedUser?.email,_id:updatedUser?._id,userType:updatedUser?.userType}

  return res;
};

export const getUserById=async (id:string)=>{
  const user = await User.findById(id);

  if (!user) {
    throw new CustomError(
      "Unauthorized",
      httpStatusCode["Unauthorized"]
    );
  }

  return user
}
