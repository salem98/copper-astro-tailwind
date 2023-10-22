import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify } from "@/lib/utils/textConverter";
import { AnimatePresence, motion } from "framer-motion";
import { marked } from "marked";
import React, { useState } from "react";

const Accordion = ({
  title,
  children,
  hasIcon = true,
}: {
  title: string;
  children: React.ReactNode;
  hasIcon?: boolean;
}) => {
  const [isActive, setActive] = useState(false);
  return (
    <div>
      <div
        role="button"
        onClick={() => setActive(!isActive)}
        className={`flex items-center space-x-3 border-b border-b-border/50 py-6 ${
          isActive ? "text-primary" : ""
        }`}
      >
        {hasIcon && (
          <DynamicIcon
            className={`w-4 h-4 mr-1 transition ${
              isActive && "rotate-90"
            } text-dark/50`}
            icon="FaAngleRight"
          />
        )}
        <div
          dangerouslySetInnerHTML={{ __html: markdownify(marked.parse(title)) }}
        />
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            layout
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              type: "tween",
            }}
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
