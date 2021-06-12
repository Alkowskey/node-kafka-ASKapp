import mongoose from "mongoose";

interface ITemp {
  temp: Number;
  timestamp: Date;
}

interface tempModelInterface extends mongoose.Model<TempDoc> {
  build(attr: ITemp): TempDoc;
}

interface TempDoc extends mongoose.Document {
  temp: Number;
  timestamp: Date;
}

const tempSchema = new mongoose.Schema({
  temp: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

tempSchema.statics.build = (attr: ITemp) => {
  return new Temp(attr);
};

const Temp = mongoose.model<TempDoc, tempModelInterface>("Temp", tempSchema);

Temp.build({
  temp: 26.2,
  timestamp: new Date(),
});

export { Temp };
