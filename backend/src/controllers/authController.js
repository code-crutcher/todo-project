import User from "../models/user.js";

export function getLogin(req, res){
  res.status(200).json({message : "You are at login"})
}

export async function postLogin(req, res){
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
      return res.status(409).json({message : "couldn't find user"})
    }

    const checkPassword = user.password;

    if(checkPassword !== password){
      return res.status(409).json({message : "password incorrect"})
    }
  res.status(200).json(user);

  } catch (error) {
    console.log("Error while logging up", error)
      res.status(500).json(error)
  }
}

export async function postLogout(req, res){
  // redirect to the home page
}

export function getSignup(req, res){
  res.status(200).json({message : "You are at signup"})
}

export async function postSignup(req, res){
  try {
    const {firstName, lastName, email, password} = req.body;

    const userExist = await User.findOne({email : email});

    if(userExist){
      return res.status(409).json({message : "User already exists"})
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password
    })

    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
      console.log("Error while signing up", error)
      res.status(500).json(error)
  }
}