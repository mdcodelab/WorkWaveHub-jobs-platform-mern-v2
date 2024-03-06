import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";


//create user

export const register = async (req, res) => {
  try {
    const { name, email, password, lastName, location } = req.body;

    // Criptarea parolei
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crearea utilizatorului cu parola criptată
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Salvăm parola criptată
      lastName,
      location,
    });

    // Verificarea dacă acesta este primul cont înregistrat și setarea rolului
    const isFirstAccount = (await User.countDocuments()) === 1;
    user.role = isFirstAccount ? "admin" : "user";

    // Salvarea modificărilor în baza de date
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

