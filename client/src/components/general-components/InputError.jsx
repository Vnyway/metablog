import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const InputError = ({ message }) => {
  if (message) {
    return (
      <AnimatePresence>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="font-[400] text-[14px] px-[5px] py-[3px] text-category bg-category bg-opacity-10 rounded-[4px] flex justify-center items-center">
          {message}
        </motion.span>
      </AnimatePresence>
    );
  } else {
    return <span className="h-[27px]"></span>;
  }
};

export default InputError;
