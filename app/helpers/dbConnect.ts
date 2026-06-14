import mongoose, { connections } from "mongoose";

type dbConnection = {
  isConnected?: number;
};
let obj: dbConnection = {};

async function dbConnect() {
  if (obj.isConnected) {
    console.log("already connected to db");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});

    obj.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("cannot connect to db");
  }
}
export default dbConnect;
