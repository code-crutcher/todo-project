import jwt from 'jsonwebtoken'

const authenticationVerify = (req, res, next) =>{
  const auth = req.headers['authorization'];

  if(!auth){
    return res.status(403).json({message: "Unauthorized, JWT token is required"});
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded //fetching the user details without using database calls
    next();
  } catch (error) {
    return res.status(401).json({message: "Unauthorized, JWT token wrong or expired"});
  }
}

export default authenticationVerify;