import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    default: '',
  },
  used_duration: {
    type: Number,
    default: -1,
  },
  used_duration_scale: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
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
  sold_to: {
    type: String,
    default: '',
  },
  sold: {
    type: Boolean,
    default: false,
  },
  message: [
    {
      username: {
        type: String,
        required: true,
        default: '',
      },
      thread: [
        {
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
          date: {
            type: Date,
            required: true,
            default: '',
          },
        },
      ],
    },
  ],
})

export default mongoose.model('product', productSchema)
