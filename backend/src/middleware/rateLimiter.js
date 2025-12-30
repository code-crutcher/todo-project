import ratelimit from "../config/upstash.js"

const rateLimiter = async(req, res, next) => {
  try {
    const {success} = await ratelimit.limit("my-limit-key"); //instead of passing the string you can use the userid if authentication is done 
    // const {success} = await ratelimit.limit(userId);

    if(!success){
      return res.status(429).json({
        message: "Too many requests, please try again later"
      })
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error)
  }
}

export default rateLimiter