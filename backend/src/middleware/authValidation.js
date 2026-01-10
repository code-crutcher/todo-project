import Joi from 'joi';

export function signupValidation(req,res,next){
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(50).required(),
      lastName: Joi.string().optional().allow(""),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(100).required()
    })

    const {error} = schema.validate(req.body)
  if(error) {
    return res.status(400).json({message: "Bad request", error})
  }
  next();
}

export function loginValidation(req,res,next){
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(100).required()
    })

    const {error} = schema.validate(req.body)
  if(error) {
    return res.status(400).json({message: "Bad request", error})
  }
  next();
}