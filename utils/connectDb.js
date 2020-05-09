import mongoose from "mongoose";
const connection = {};
import p from '../next.config';
async function connectDb() {
  if (connection.isConnected) {
    // Use existing database connection
    console.log("Using existing connection");
    return;
  }
  try {
    // Use new database connection
    // console.log(p.env.MONGO_SRV);
    const db = await mongoose.connect(p.env.MONGO_SRV, {
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
