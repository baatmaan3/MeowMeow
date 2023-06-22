import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/meowmeow', { useNewUrlParser: true })

export default mongoose
