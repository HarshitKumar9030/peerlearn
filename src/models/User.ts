import { UserDocument } from "@/types/types";
import mongoose, { Schema, model, models, Model } from "mongoose";

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    username: {
      type: String,
      unique: true,
      required: false,
      default: undefined,
      sparse: true, 
    },
    instagram: {
      type: String,
      required: false,
    },
    x: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    backgroundUrl: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: [true, "Fullname is required"],
      minLength: [3, "Fullname must be at least 3 characters"],
      maxLength: [25, "Fullname must be at most 25 characters"],
    },
    password: {
      type: String,
      required: true,
      select: false, 
    },
    phone: {
      type: String,
      default: "",
    },
    groups: [
      {
        name: { type: String, required: true },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      },
    ],
    studySessions: [
      {
        topic: { type: String, required: true },
        duration: { type: Number, required: true }, // in minutes
        completedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = (models.User || model<UserDocument>("User", UserSchema)) as Model<UserDocument>;
export default User;
