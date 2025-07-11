"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function Circulos() {
  const controls = useAnimation();
  const width = useWindowWidth();
  const isMobile = width < 768;

  useEffect(() => {
    async function loopAnimation() {
      while (true) {
        await controls.start("moveTogether");
        await controls.start("merge");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        controls.set("initial");
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    loopAnimation();
  }, [controls]);

  // VARIANTES MOBILE (vertical)
  const mobileVariants = {
    top: {
      initial: { top: "20%", opacity: 1, scale: 1 },
      moveTogether: { top: "45%", transition: { duration: 1.5, ease: "easeInOut" } },
      merge: { opacity: 0, scale: 0.8, transition: { duration: 0.7, ease: "easeOut" } },
    },
    bottom: {
      initial: { top: "80%", opacity: 1, scale: 1 },
      moveTogether: { top: "55%", transition: { duration: 1.5, ease: "easeInOut" } },
      merge: { opacity: 0, scale: 0.8, transition: { duration: 0.7, ease: "easeOut" } },
    },
    center: {
      initial: { opacity: 0, scale: 0.5 },
      moveTogether: { opacity: 0, scale: 0.5 },
      merge: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    },
  };

  // VARIANTES DESKTOP (horizontal)
  const desktopVariants = {
    left: {
      initial: { left: "25%", top: "50%", opacity: 1, scale: 1 },
      moveTogether: { left: "45%", transition: { duration: 1.5 } },
      merge: { opacity: 0, scale: 0.8, transition: { duration: 0.7 } },
    },
    right: {
      initial: { left: "75%", top: "50%", opacity: 1, scale: 1 },
      moveTogether: { left: "55%", transition: { duration: 1.5 } },
      merge: { opacity: 0, scale: 0.8, transition: { duration: 0.7 } },
    },
    center: {
      initial: { opacity: 0, scale: 0.5 },
      moveTogether: { opacity: 0, scale: 0.5 },
      merge: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    },
  };

  if (isMobile) {
    return (
      <div className="relative h-80 w-full">
        <motion.div
          className="w-32 h-32 rounded-full border-2 border-primary text-primary text-sm font-medium absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center px-2 leading-tight"
          variants={mobileVariants.top}
          initial="initial"
          animate={controls}
        >
          desarrollo web
        </motion.div>

        <motion.div
          className="w-32 h-32 rounded-full border-2 border-primary text-primary text-sm font-medium absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center px-2 leading-tight"
          variants={mobileVariants.bottom}
          initial="initial"
          animate={controls}
        >
          comunicación estratégica
        </motion.div>

        <motion.div
          className="w-36 h-36 rounded-full bg-primary text-white text-base font-semibold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center px-2 shadow"
          variants={mobileVariants.center}
          initial="initial"
          animate={controls}
        >
          Lúmina
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative h-80 w-full">
      <motion.div
        className="w-44 h-44 rounded-full border-2 border-primary text-primary text-base font-medium absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center px-2"
        variants={desktopVariants.left}
        initial="initial"
        animate={controls}
      >
        desarrollo web
      </motion.div>

      <motion.div
        className="w-44 h-44 rounded-full border-2 border-primary text-primary text-base font-medium absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center px-2"
        variants={desktopVariants.right}
        initial="initial"
        animate={controls}
      >
        comunicación estratégica
      </motion.div>

      <motion.div
        className="w-48 h-48 rounded-full bg-primary text-white text-lg font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center px-2 shadow"
        variants={desktopVariants.center}
        initial="initial"
        animate={controls}
      >
        Lúmina
      </motion.div>
    </div>
  );
}
