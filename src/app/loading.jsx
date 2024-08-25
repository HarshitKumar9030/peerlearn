import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader(){
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500" />
    </div>
  );
};
