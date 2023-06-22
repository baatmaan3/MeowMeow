import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
})

export default mongoose.model('user', userSchema)
