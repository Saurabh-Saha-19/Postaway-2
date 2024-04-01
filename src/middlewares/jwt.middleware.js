import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  //1. Read the token from authorization header
  const token = req.headers["authorization"];
  console.log(token);

  //2. check for the token
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  //3. check if token is valid.
  try {
    const payload = jwt.verify(token, "SaurabhSaha");
    req.userId = payload.userId;
  } catch (err) {
    //4. return error, if any
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
  //5. call the next middleware
  next();
};

export default jwtAuth;
