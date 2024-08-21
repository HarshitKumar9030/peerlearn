// @ts-nocheck

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  username: z.string().optional(),
  github: z.string().optional(),
  description: z.string().optional(),
});

const adjectives = ["swift", "silent", "dizzy", "happy", "brave"];
const nouns = ["tiger", "falcon", "bee", "river", "mountain"];
const verbs = ["dance", "run", "fly", "jump", "code"];

function generateRandomUsername() {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
  const randomNumber = Math.floor(100 + Math.random() * 900); 
  const wordChoices = [randomAdjective, randomNoun, randomVerb];
  const randomWord = wordChoices[Math.floor(Math.random() * wordChoices.length)];
  return `${randomWord}${randomNumber}`; // dance324, swift567 etc
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const result = userSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors.map((err) => err.message).join(", ") },
        { status: 400 }
      );
    }

    let { name, email, password, phone, username, github, description } =
      result.data;

    // Generate a random username if none is provided
    if (!username) {
      username = generateRandomUsername();
    }

    // Check if email or username already exists
    let userFound = await User.findOne({ $or: [{ email }, { username }] });

    // Keep generating a new username if the generated one already exists
    while (userFound && userFound.username === username) {
      username = generateRandomUsername();
      userFound = await User.findOne({ username });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      phone,
      username,
      github,
      description,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return NextResponse.json(
      {
        name: savedUser.name,
        email: savedUser.email,
        username: savedUser.username,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      console.error("Error during signup:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
