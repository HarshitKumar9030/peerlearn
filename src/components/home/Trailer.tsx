"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function TrailerComponent() {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger the animation when 20% of the component is in view
    triggerOnce: true, // Ensures the animation runs only once
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeInFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div ref={ref} className="relative flex justify-center flex-col h-[50rem] items-center my-5">
      {/* Background Gradient Blends */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[300px] h-[300px] bg-gradient-to-tl from-blue-400 via-purple-500 to-indigo-500 rounded-full opacity-50 blur-3xl top-20 left-20 mix-blend-multiply"></div>
        <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-teal-400 via-green-500 to-cyan-500 rounded-full opacity-50 blur-3xl bottom-20 right-20 mix-blend-multiply"></div>
      </div>

      {/* Trailer Heading */}
      <motion.div
        className="text-4xl font-poppins font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 mb-4 md:text-6xl"
        variants={fadeInFromBottom}
        initial="hidden"
        animate={controls}
      >
        Trailer - Peerlearn
      </motion.div>

      {/* iPad Container */}
      <motion.div
        className="relative rounded-[2rem] w-[90%] md:w-[700px] h-[500px] shadow-2xl overflow-hidden bg-neutral-600 dark:bg-neutral-700 border-8 border-neutral-600 dark:border-neutral-700"
        variants={fadeInFromBottom}
        initial="hidden"
        animate={controls}
      >
        {/* iPad Camera */}
        <div className="flex justify-center items-center">
          <div className="absolute top-[4px] left-1/2 flex items-center justify-center transform -translate-x-1/2 w-8 h-8 bg-neutral-500 dark:bg-neutral-400 rounded-full shadow-inner">
            <div className="h-2 w-2 rounded-full bg-gray-900"></div>
          </div>
          <div className="absolute top-[15px] left-[calc(50%+40px)] transform -translate-x-1/2 w-2 h-2 bg-neutral-500 dark:bg-neutral-400 rounded-full"></div>
        </div>

        {/* Screen/Video */}
        <div className="absolute top-12 rounded-lg left-0 right-0 bottom-0 bg-neutral-100 dark:bg-neutral-900 flex justify-center items-center rounded-b-[2rem]">
          <iframe
            className="w-[95%] h-[85%] rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* iPad Bottom Section (Home Button Area) */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-neutral-600 dark:bg-neutral-700 flex justify-center items-center rounded-b-xl"></div>
      </motion.div>
    </div>
  );
}
