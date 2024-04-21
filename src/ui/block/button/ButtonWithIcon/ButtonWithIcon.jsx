import React from "react";
import { motion } from "framer-motion";

export default function ButtonWithIcon({ icon, onClick }) {
    return (
        <motion.button
            className="px-8 bg-input-bg border border-input-border rounded-main h-40 z-50"
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            {icon}
        </motion.button>
    );
}
