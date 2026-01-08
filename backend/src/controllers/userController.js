import User from "../models/user.js";

export async function getAllUsers (req, res){
  try{
    const users = await User.find().sort({createdAt : 1});// newest first
    res.status(200).json(users)
  }catch(error){
    console.log("Error while fetching all tasks", error)
    res.status(500).json({message: "internal server error"})
  }
}

export async function getUserDetail(req, res){
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({message : "User not found"})
    }
    res.status(200).json(user)
  } catch (error) {
    console.log("Error while fetching user detail", error)
    res.status(500).json({message: "internal server error"})
  }
}

export async function editUserDetail(req, res){
  try {
    const {firstName, lastName,email } = req.body;
    const updatedUserDetail = await User.findByIdAndUpdate(req.params.id,{
      firstName,
      lastName,
      email
    },{
      new: true
    })

    if(!updatedUserDetail){
      return red.status(404).json({message : "user not found"})
    }
    res.status(200).json(updatedUserDetail)
  } catch (error) {
    console.log("Error while updating user", error)
    res.status(500).json({message : "error in updating user"})
  }
}