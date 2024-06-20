import React from "react";
import { motion } from "framer-motion";

export default function ButtonWithIcon({ icon, onClick }) {
    return (
        <motion.button
            className="px-8 bg-input-bg dark:bg-dark-input-bg dark:border-dark-input-border border border-input-border rounded-main h-40 w-40 flex items-center justify-center cursor-pointer"
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            {icon}
        </motion.button>
    );
}
