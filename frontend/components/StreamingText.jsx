'use client'

import { useState, useEffect } from 'react'

export default function StreamingText({ text, speed = 20 }) {
    const [displayedText, setDisplayedText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, speed)

            return () => clearTimeout(timeout)
        }
    }, [currentIndex, text, speed])

    // Reset when text changes
    useEffect(() => {
        setDisplayedText('')
        setCurrentIndex(0)
    }, [text])

    return (
        <span className="whitespace-pre-wrap text-foreground leading-relaxed">
            {displayedText}
            {currentIndex < text.length && (
                <span className="inline-block w-1 h-4 bg-primary ml-1 animate-pulse" />
            )}
        </span>
    )
}
