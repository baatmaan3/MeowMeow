import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: -1,
  },
  description: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
  },
  cared_by: {
    type: String,
    default: '',
  },
  archived: {
    type: Boolean,
    default: false,
  },
  request: [
    {
      username: {
        type: String,
        required: true,
        default: '',
      },
      message: {
        type: String,
        required: true,
        default: '',
      },
    },
  ],
  comments: [
    {
      date: {
        type: Date,
        required: true,
        default: '',
      },
      message: {
        type: String,
        required: true,
        default: '',
      },
      created_by: {
        type: String,
        required: true,
        default: '',
      },
    },
  ],
})

export default mongoose.model('post', productSchema)
