export const authenticateUser = (req, res, next) => {
console.log("authenticate middleware");
next();
}