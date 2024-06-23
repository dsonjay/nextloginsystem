import mongoose from "mongoose";

export const validateId = (id) => {
  const checkmongoose = mongoose.Types.ObjectId;
  return checkmongoose.isValid(id);
};
