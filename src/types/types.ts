import mongoose, { Types } from "mongoose";

export interface IChat {
  message: string;
  sender: Types.ObjectId; 
  timestamp: Date;
}

export interface IGroup {
  name: string;
  members: Types.ObjectId[]; 
  chatHistory?: IChat[];
}

export interface IStudySession {
  topic: string;
  duration: number; 
  completedAt: Date;
}

export interface UserDocument extends mongoose.Document {
  email: string;
  username?: string;
  instagram?: string;
  x?: string;
  github?: string;
  backgroundUrl?: string;
  description?: string;
  password: string;
  name: string;
  phone?: string;
  groups: IGroup[];
  studySessions: IStudySession[];
}
