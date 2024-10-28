import mongoose from "mongoose";

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI as string).then((data) => {
    console.log(`mongodb connected with the serve ${data.connection.host}`);
  });
};
export default connectToDatabase;
