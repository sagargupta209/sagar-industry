'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

interface ClientMotionWrapperProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  as?: 'div' | 'img' | 'section';
  className?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

const ClientMotionWrapper = ({ 
  children, 
  as = 'div', 
  className,
  viewport = { once: true },
  ...props 
}: ClientMotionWrapperProps) => {
  if (as === 'img') {
    return (
      <motion.img 
        className={className}
        viewport={viewport}
        {...(props as any)}
      />
    );
  }

  if (as === 'section') {
     return (
        <motion.section 
          className={className}
          viewport={viewport}
          {...(props as any)}
        >
            {children}
        </motion.section>
     )
  }

  return (
    <motion.div 
      className={className} 
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ClientMotionWrapper;
