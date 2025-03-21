import mongoosh from "mongoose";

const connectDb = async () => {
  try {
    await mongoosh.connect(process.env.MONGO_DB_URI || `mongodb://localhost:27017/webDotsDB`);
    console.log("connectDb Success");
  } catch (error) {
    console.log("connectDb Failed");
  }
};

export default connectDb;
