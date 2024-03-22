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
  const testUser=userId === "65fbf14a6bc62672d99010c5"; //if they match, testUser=true
  req.user={userId, role, testUser}
  console.log(req.user)
  next();
} catch (error) {
  res.status(401).json({msg: "Authentication invalid"});
}
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    //console.log(roles); //["admin"]
    if (!roles.includes(req.user.role)) {
      const error= new Error('Unauthorized to access to this route');
      error.status=401;
      throw error
    }
    next();
  };
};

// export const checkForTestUser = (req, res, next) => {
// if(req.user.testUser) {
//   const error = new Error("Demo user. Read only.");
//   error.status=400; //bad request
//   throw error;
// }
// next();
// }


export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    return res.status(400).json({ msg: "Demo user. Read only." });
  }
  next();
};
