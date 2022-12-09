import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/ynov-pwa")
  .then(() => console.log('Connected'))
  .catch((e) => console.log(`Error ${e}`))
