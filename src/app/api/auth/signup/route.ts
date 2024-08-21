// @ts-nocheck

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { z } from "zod";

// Defining Zod schema for validation
const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(), 
  username: z.string().optional(),
  github: z.string().optional(),
  description: z.string().optional(),
});

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

    const { name, email, password, phone, username, github, description } = result.data;

    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
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
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const updateSchema = z.object({
      userId: z.string().nonempty("User ID is required"),
      name: z.string().optional(),
      email: z.string().email("Invalid email address").optional(),
      password: z.string().min(6, "Password must be at least 6 characters").optional(),
      phone: z.string().optional(),
      username: z.string().optional(),
      github: z.string().optional(),
      description: z.string().optional(),
    });

    const result = updateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors.map((err) => err.message).join(", ") },
        { status: 400 }
      );
    }

    const { userId, name, email, password, phone, username, github, description } = result.data;

    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (name) userToUpdate.name = name;
    if (email) userToUpdate.email = email;
    if (password) userToUpdate.password = await bcrypt.hash(password, 12);
    if (phone) userToUpdate.phone = phone;
    if (username) userToUpdate.username = username;
    if (github) userToUpdate.github = github;
    if (description) userToUpdate.description = description;

    await userToUpdate.save();

    return NextResponse.json(
      {
        message: "User updated successfully",
        updatedUser: {
          id: userToUpdate._id,
          name: userToUpdate.name,
          email: userToUpdate.email,
          username: userToUpdate.username,
          createdAt: userToUpdate.createdAt,
          updatedAt: userToUpdate.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      console.error("Error during user update:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await user.remove();

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during user deletion:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
