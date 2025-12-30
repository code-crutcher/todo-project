import mongoose from 'mongoose'

export const connectDb = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDb connected successfully')
  }catch(error){
    console.error("Error connecting to MONGODB", error)
    process.exit(1) //exit with failure
    // process.exit(0) //exit with success
  }
}