'use client'

import { cn } from "@/lib/utils";
import { motion } from 'framer-motion'


const TypingDots = ()=> {
    return (
        <div className="flex space-x-1 h-5 items-end">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                    animate={{
                        y: ['20%', '-80%', '20%'],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}



interface LoadingProps {
    text?: string;
    className?: string;
}

export function Loading({ text = "loading...", className }: LoadingProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
            <motion.div
                key="loading"
                initial={{opacity: 0}}
                animate={{opacity: 0.8}}
                exit={{opacity: 0}}
            >
                <TypingDots/>
            </motion.div>
            <p className="text-sm text-muted-foreground ml-3">{text}</p>
        </div>
    );
}
