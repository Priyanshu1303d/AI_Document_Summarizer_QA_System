'use client'

import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'
import StreamingText from './StreamingText'

export default function ChatBubble({ message, isUser }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                </div>
            )}
            <div
                className={`max-w-[70%] rounded-lg px-4 py-3 ${isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                    }`}
            >
                {isUser ? (
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                ) : (
                    <div className="text-sm">
                        <StreamingText text={message.content || message.answer} speed={20} />
                    </div>
                )}
                {!isUser && message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-xs font-semibold mb-2">Sources:</p>
                        <div className="space-y-1">
                            {message.sources.map((source, idx) => (
                                <p key={idx} className="text-xs text-muted-foreground">
                                    {source}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-foreground" />
                </div>
            )}
        </motion.div>
    )
}
