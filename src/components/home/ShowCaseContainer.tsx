"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function ShowcaseContainer({ title, content }: any) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.3, // Animation triggers when 30% of the section is in view
    triggerOnce: true, 
  });
  const [hasAnimated, setHasAnimated] = useState(false); // Track if the animation has occurred

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true); // Mark that the animation has occurred
    }
  }, [controls, inView, hasAnimated]);

  const fadeInFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-16 rounded-t-sm bg-neutral-200 mt-20 rounded-b-[100px] dark:bg-neutral-800 overflow-hidden relative"
      variants={fadeInFromBottom}
      initial="hidden"
      animate={controls}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold mb-8 text-neutral-800 dark:text-neutral-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {title}
        </motion.h2>

        <div className="flex justify-center  text-neutral-700 dark:text-neutral-300 overflow-hidden">
          <motion.div
            className="flex space-x-8 justify-center items-center md:space-x-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {content}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
