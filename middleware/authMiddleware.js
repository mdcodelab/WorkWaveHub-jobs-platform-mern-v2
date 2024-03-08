import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../utils/jwtToken.js";

export const authenticateUser = (req, res, next) => {
console.log(req.cookies);
const {token}=req.cookies;
if(!token) {
    res.status(401).json({msg: "Authentication invalid."})
}
try {
  const {userID, role} = verifyJWT(token);
  req.user={userID, role}
  console.log(req.user)
  next();
} catch (error) {
  res.status(401).json({msg: "authentication invalid"});
}
}
