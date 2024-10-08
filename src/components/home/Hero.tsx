'use client';

import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export function Hero() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      title: "Personalized Study Sessions",
      description: "Tailored sessions designed to help you manage your time effectively.",
    },
    {
      title: "Join Stress-Relief Groups",
      description: "Connect with like-minded individuals to de-stress and stay motivated through peer support.",
    },
    {
      title: "Track Your Progress",
      description: "Monitor your learning journey and see your improvements over time with our easy-to-use tracking tools.",
    },
    {
      title: "Group Study Sessions",
      description: "Collaborate and study with others in structured group sessions, designed to boost focus and productivity.",
    },
    {
      title: "Mental Health Management",
      description: "Access resources and anonymous stress-relief groups to maintain your well-being and manage your mental health.",
    },
    {
      title: "Real-time Chatting",
      description: "Communicate with others instantly through our secure and private chat feature for seamless collaboration.",
    },
  ];

  const [text] = useTypewriter({
    words: features.map((feature) => feature.title),
    loop: true,
    delaySpeed: 3000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleNextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const handlePrevFeature = () => {
    setCurrentFeature((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-auto dark:bg-grid-white/5 bg-grid-black/5 min-h-[55rem] w-full dark:bg-neutral-900 bg-neutral-100 flex items-center justify-center font-poppins overflow-hidden px-6 md:px-10 lg:px-20 py-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 opacity-40 blur-2xl mix-blend-multiply transition-transform hover:scale-110 duration-1000" />
        <div className="absolute bottom-24 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-500 opacity-40 blur-2xl mix-blend-multiply transition-transform hover:scale-110 duration-1000" />
      </div>

      <Spotlight className="absolute -top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="relative z-20 text-center max-w-4xl px-4 md:px-8 space-y-10">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Learn Better<br /> <span className="text-5xl md:text-7xl">Stress Less</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl lg:text-3xl font-medium text-neutral-700 dark:text-neutral-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
        >
          <span>{text}</span>
          <Cursor cursorStyle="_" />
        </motion.p>

        <div className="relative mt-8 flex flex-col items-center justify-center">
          {/* Cards Display */}
          <motion.div
            className="flex gap-6 justify-center w-full rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {features.slice(currentFeature, currentFeature + 2).map((feature, index) => (
              <motion.div
                key={index}
                className="relative p-6 w-full max-w-xs lg:max-w-lg bg-neutral-100 dark:bg-neutral-800 rounded-2xl shadow-lg border bg-opacity-60 border-transparent bg-clip-padding dark:border-transparent dark:bg-clip-padding dark:bg-opacity-60 border-gradient-to-r from-purple-400 to-indigo-600 text-left space-y-4 transform transition-transform duration-700"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {feature.title}
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 flex items-center justify-center md:justify-start w-full gap-4">
            <button
              onClick={handlePrevFeature}
              className="leftArrow h-16 w-16 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-800 duration-300 dark:text-white text-neutral-900 ease-in-out cursor-pointer flex justify-center items-center rounded-full"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={handleNextFeature}
              className="rightArrow h-16 w-16 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-800 duration-300 dark:text-white text-neutral-900 ease-in-out cursor-pointer flex justify-center items-center rounded-full"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-900 text-white no-underline group cursor-pointer relative shadow-sm shadow-neutral-900 dark:shadow-neutral-600 rounded-full p-px text-sm font-semibold leading-6 inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-neutral-950 dark:bg-neutral-100 py-2.5 px-6 ring-1 ring-white/10 dark:ring-black/10">
              <span>Get Started</span>
              <svg
                fill="none"
                height="16"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
