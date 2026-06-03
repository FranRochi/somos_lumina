"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const frases = [
  "landing pages",
  "one pages",
  "portfolios",
  "tiendas online",
  "institucionales",
];

export default function FraseCarrusel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % frases.length);
    }, 1500);

    return () => clearInterval(intervalo);
  }, []);

  return (
      <div className="relative h-8 overflow-hidden inline-block align-middle w-[160px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={frases[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute w-full text-left text-white text-2xl"
        >
          {frases[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
