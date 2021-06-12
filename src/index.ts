import { produce } from "./producer";
import { consume } from "./consumer";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb://localhost:27017/${process.env.MONGO_INITDB_DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to mongo");
  }
);
// call the `produce` function and log an error if it occurs
produce().catch((err) => {
  console.error("error in producer: ", err);
});

// start the consumer, and log any errors
consume().catch((err) => {
  console.error("error in consumer: ", err);
});
