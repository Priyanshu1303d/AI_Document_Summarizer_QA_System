'use client'

import { motion } from 'framer-motion'

export default function Loader({ size = 'default', className = '' }) {
    const sizes = {
        sm: 'h-4 w-4',
        default: 'h-8 w-8',
        lg: 'h-12 w-12',
    }

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.div
                className={`${sizes[size]} rounded-full border-4 border-primary border-t-transparent`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    )
}
