import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import Signup from "@/components/accounts/signup";

const Register = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  } else {
    return <Signup />;
  }
};

export default Register;