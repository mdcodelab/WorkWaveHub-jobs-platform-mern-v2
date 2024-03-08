import { StatusCodes } from "http-status-codes";

export const authenticateUser = (req, res, next) => {
//console.log(req.cookies);
const {token}=req.cookies;
if(!token) {
    res.status(401).json({msg: "Authentication invalid."})
}
next();
}