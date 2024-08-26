import mongoose, { Types } from "mongoose";


export interface IStudySession {
  topic: string;
  duration: number; 
  completedAt: Date;
}

export interface UserDocument extends mongoose.Document {
  _id: string;
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
  supabaseId: string;
}

export interface IChat {
  id: string;
  senderId: string;
  recieverId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGroup {
  id: string;
  name: string;
  isPrivate: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  id: string;
  content: string;
  userId: string;
  chatId: string;
  createdAt: Date;
  updatedAt?: Date;
  reactions?: string; // Emoji as keys, list of users who reacted
  imageUrl?: string;
}

export interface IGroupMessage {
  id: string;
  content: string;
  userId: string;
  groupId: string;
  createdAt: Date;
  updatedAt?: Date;
  reactions?: { [emoji: string]: string[] }; // Emoji as keys, list of users who reacted
  imageUrl?: string;
}

export interface User {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGroupMembership {
  id: string;
  userId: string;
  groupId: string;
  joinedAt: Date;
  role: "member" | "admin";
}
