import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/jwtToken.js";


//create user

export const register = async (req, res) => {
  const { name, email, password, lastName, location } = req.body;
  console.log(name, email, password, lastName, location);

  // Criptarea parolei
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Determinăm dacă acesta este primul utilizator înregistrat
  const isFirstUser = (await User.countDocuments()) === 0;

  // Crearea utilizatorului cu parola criptată
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    lastName,
    location,
    // Setăm rolul în funcție de condiția primului utilizator
    role: isFirstUser ? "admin" : "user",
  });

  res.status(StatusCodes.CREATED).json({ user });
};


export const login = async (req, res) => {
  
    const { email, password } = req.body;

    // Găsim utilizatorul cu adresa de email specificată
    const user = await User.findOne({ email });

    // Verificăm dacă utilizatorul a fost găsit
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // Comparam parola trimisă cu parola hash stocată în baza de date
    if (password !== user.password) {
      return res.status(401).json({ msg: "Wrong password" });
    }

    const token=createJWT({userId: user._id, role: user.role});

    const oneDay = 1000*60*60*24; //one day in milliseconds

    res.cookie("token", token, {httpOnly: true,
      expires: new Date(Date.now()+oneDay), secure: process.env.NODE_ENV === "production"})

    // Răspunsul dacă autentificarea este reușită
    res.status(StatusCodes.OK).json({ msg: "User logged in" });
  
};


export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};


