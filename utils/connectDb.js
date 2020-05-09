import mongoose from "mongoose";
const connection = {};
require("dotenv").config();

const uri = process.env.MONGO_SRV;

async function connectDb() {
  if (connection.isConnected) {
    // Use existing database connection
    console.log("Using existing connection");
    return;
  }
  // Use new database connection
  const db = await mongoose.connect(uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("DB Connected");
  connection.isConnected = db.connections[0].readyState;
}

export default connectDb;
