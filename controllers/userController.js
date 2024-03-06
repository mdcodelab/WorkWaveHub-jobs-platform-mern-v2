import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";


//create user
export const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({user});
    } catch (error) {
      res.status(500).json({error: "Internal server error"})      
    }
}

export const login = async (req, res) => {
    res.send('login')
}

