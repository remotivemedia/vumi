import React from "react";
import { motion } from "framer-motion";

interface PullQuoteProps {
  quote: string;
  author?: string;
  source?: string;
  delay?: number;
}

export const PullQuote: React.FC<PullQuoteProps> = ({
  quote,
  author,
  source,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="border-l-4 border-vumi-sky pl-6 py-2 my-8 text-left"
    >
      <blockquote className="font-sans font-light italic text-xl md:text-2xl text-vumi-slate leading-relaxed">
        "{quote}"
      </blockquote>
      {(author || source) && (
        <cite className="block mt-3 not-italic font-heading text-xs tracking-wider text-gray-400 uppercase">
          {author && <span className="font-semibold text-gray-500">{author}</span>}
          {author && source && <span className="mx-1.5">•</span>}
          {source && <span>{source}</span>}
        </cite>
      )}
    </motion.div>
  );
};
