import mongoose from "mongoose"

const { Schema } = mongoose

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('List', listSchema)

