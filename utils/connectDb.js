import mongoose from "mongoose";
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    // Use existing database connection
    console.log("Using existing connection");
    return;
  }
  try {
    // Use new database connection
    const db = await mongoose.connect("mongodb+srv://archan:1234@cluster0-imrbu.mongodb.net/test?retryWrites=true&w=majority", {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB Connected");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error(error);
  }
  
}

export default connectDb;
