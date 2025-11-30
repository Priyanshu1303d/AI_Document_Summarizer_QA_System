'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

export default function ChatInput({ onSend, isLoading }) {
    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.trim() && !isLoading) {
            onSend(input.trim())
            setInput('')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about your documents..."
                className="min-h-[60px] max-h-[200px] resize-none"
                disabled={isLoading}
            />
            <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-[60px] w-[60px] flex-shrink-0"
            >
                <Send className="h-5 w-5" />
            </Button>
        </form>
    )
}
