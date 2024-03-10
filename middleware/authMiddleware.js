import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../utils/jwtToken.js";

export const authenticateUser = async (req, res, next) => {
console.log(req.cookies);
const {token}=req.cookies;
if(!token) {
    res.status(401).json({msg: "Authentication invalid."})
}
try {
  const {userId, role} = verifyJWT(token);
  req.user={userId, role}
  console.log(req.user)
  next();
} catch (error) {
  res.status(401).json({msg: "authentication invalid"});
}
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    //console.log(roles); //["admin"]
    if (!roles.includes(req.user.role)) {
      const error= new Error('Unauthorized to access this route');
      error.status=401;
      throw error
    }
    next();
  };
};
