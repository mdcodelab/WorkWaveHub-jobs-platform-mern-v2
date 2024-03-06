import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";


//create user
// export const register = async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         const isFirstAccount = (await User.countDocuments()) === 1 
//         req.body.role = isFirstAccount ? "admin" : "user";
//     res.status(StatusCodes.CREATED).json({user});
//     } catch (error) {
//       res.status(500).json({error: "Internal server error"})      
//     }
// }

export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const isFirstAccount = (await User.countDocuments()) === 1; // if the first user registered
    user.role = isFirstAccount ? "admin" : "user";
    await user.save(); 

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};



export const login = async (req, res) => {
    res.send('login')
}

