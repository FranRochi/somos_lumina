"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

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
  const isMobileOrTablet = width < 1024;

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

  // MOBILE / TABLET VARIANTS
  const mobileVariants = {
    top: {
      initial: {
        top: width < 768 ? "22%" : "30%",
        left: "40%",
        opacity: 1,
        scale: 1,
      },
      moveTogether: {
        top: "50%",
        left: "50%",
        transition: { duration: 1.5, ease: "easeInOut" },
      },
      merge: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.7, ease: "easeOut" },
      },
    },
    bottom: {
      initial: {
        top: width < 768 ? "78%" : "70%",
        left: "60%",
        opacity: 1,
        scale: 1,
      },
      moveTogether: {
        top: "50%",
        left: "50%",
        transition: { duration: 1.5, ease: "easeInOut" },
      },
      merge: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.7, ease: "easeOut" },
      },
    },
    center: {
      initial: { opacity: 0, scale: 0.5 },
      moveTogether: { opacity: 0, scale: 0.5 },
      merge: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    },
  };

  // DESKTOP VARIANTS
  const desktopVariants = {
    left: {
      initial: { left: "25%", top: "50%", opacity: 1, scale: 1 },
      moveTogether: { left: "50%", transition: { duration: 1.5 } },
      merge: { opacity: 0, scale: 0.8, transition: { duration: 0.7 } },
    },
    right: {
      initial: { left: "75%", top: "50%", opacity: 1, scale: 1 },
      moveTogether: { left: "50%", transition: { duration: 1.5 } },
      merge: { opacity: 0, scale: 0.8, transition: { duration: 0.7 } },
    },
    center: {
      initial: { opacity: 0, scale: 0.5 },
      moveTogether: { opacity: 0, scale: 0.5 },
      merge: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    },
  };

  if (isMobileOrTablet) {
    return (
      <div className="relative w-full h-[22rem] sm:h-[24rem]">
        <motion.div
          className="
            absolute
            w-32 h-32
            md:w-36 md:h-36
            rounded-full border-2 border-primary
            text-primary text-sm md:text-base font-medium
            left-[35%] top-[22%]
            -translate-x-1/2 -translate-y-1/2
            flex items-center justify-center
            text-center px-2 leading-tight
          "
          variants={mobileVariants.top}
          initial="initial"
          animate={controls}
        >
          desarrollo web
        </motion.div>

        <motion.div
          className="
            absolute
            w-32 h-32
            md:w-36 md:h-36
            rounded-full border-2 border-primary
            text-primary text-sm md:text-base font-medium
            left-[65%] top-[78%]
            -translate-x-1/2 -translate-y-1/2
            flex items-center justify-center
            text-center px-2 leading-tight
          "
          variants={mobileVariants.bottom}
          initial="initial"
          animate={controls}
        >
          comunicación estratégica
        </motion.div>

        <motion.div
          className="
            absolute
            w-36 h-36
            md:w-40 md:h-40
            rounded-full bg-primary
            text-white text-base md:text-lg font-semibold
            left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            flex items-center justify-center
            text-center px-2 shadow
          "
          variants={mobileVariants.center}
          initial="initial"
          animate={controls}
        >
          Impacto digital
        </motion.div>
      </div>
    );
  }

  // DESKTOP
  return (
    <div className="relative w-full h-96">
      <motion.div
        className="
          absolute
          w-44 h-44
          md:w-60 md:h-60
          lg:w-64 lg:h-64
          rounded-full border-2 border-primary
          text-primary text-3xl font-medium
          top-1/2 left-[25%]
          -translate-x-1/2 -translate-y-1/2
          flex items-center justify-center
          text-center px-2
        "
        variants={desktopVariants.left}
        initial="initial"
        animate={controls}
      >
        desarrollo web
      </motion.div>

      <motion.div
        className="
          absolute
          w-44 h-44
          md:w-60 md:h-60
          lg:w-64 lg:h-64
          rounded-full border-2 border-primary
          text-primary text-3xl font-medium
          top-1/2 left-[75%]
          -translate-x-1/2 -translate-y-1/2
          flex items-center justify-center
          text-center px-2
        "
        variants={desktopVariants.right}
        initial="initial"
        animate={controls}
      >
        comunicación estratégica
      </motion.div>

      <motion.div
        className="
          absolute
          w-48 h-48
          md:w-64 md:h-64
          lg:w-72 lg:h-72
          rounded-full bg-primary
          text-white text-3xl font-semibold
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          flex items-center justify-center
          text-center px-2 shadow
        "
        variants={desktopVariants.center}
        initial="initial"
        animate={controls}
      >
        Impacto digital
      </motion.div>
    </div>
  );
}
