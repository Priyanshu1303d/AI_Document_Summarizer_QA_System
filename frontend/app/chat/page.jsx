'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusCircle, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import ChatBubble from '@/components/ChatBubble'
import ChatInput from '@/components/ChatInput'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { askQuestion } from '@/utils/api'

// Utility functions
function generateThreadId() {
    return `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function saveToLocalStorage(key, value) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

function loadFromLocalStorage(key, defaultValue = null) {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : defaultValue
    }
    return defaultValue
}

export default function ChatPage() {
    const [currentThreadId, setCurrentThreadId] = useState(null)
    const [chatThreads, setChatThreads] = useState([])
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    // Initialize on mount
    useEffect(() => {
        const storedThreads = loadFromLocalStorage('chat_threads', [])
        const storedCurrentThread = loadFromLocalStorage('current_thread_id')

        if (storedCurrentThread && storedThreads.includes(storedCurrentThread)) {
            setCurrentThreadId(storedCurrentThread)
            loadConversation(storedCurrentThread)
        } else {
            const newThreadId = generateThreadId()
            setCurrentThreadId(newThreadId)
            setChatThreads([newThreadId, ...storedThreads])
            saveToLocalStorage('chat_threads', [newThreadId, ...storedThreads])
            saveToLocalStorage('current_thread_id', newThreadId)
        }

        setChatThreads(storedThreads)
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const loadConversation = (threadId) => {
        const threadMessages = loadFromLocalStorage(`thread_${threadId}`, [])
        setMessages(threadMessages)
    }

    const saveConversation = (threadId, msgs) => {
        saveToLocalStorage(`thread_${threadId}`, msgs)
    }

    const handleNewChat = () => {
        const newThreadId = generateThreadId()
        setCurrentThreadId(newThreadId)
        setMessages([])

        const updatedThreads = [newThreadId, ...chatThreads]
        setChatThreads(updatedThreads)
        saveToLocalStorage('chat_threads', updatedThreads)
        saveToLocalStorage('current_thread_id', newThreadId)
        saveToLocalStorage(`thread_${newThreadId}`, [])

        toast.success('New chat started!')
    }

    const handleThreadSwitch = (threadId) => {
        setCurrentThreadId(threadId)
        loadConversation(threadId)
        saveToLocalStorage('current_thread_id', threadId)
    }

    const handleDeleteThread = (threadId, e) => {
        e.stopPropagation()

        const updatedThreads = chatThreads.filter(id => id !== threadId)
        setChatThreads(updatedThreads)
        saveToLocalStorage('chat_threads', updatedThreads)
        localStorage.removeItem(`thread_${threadId}`)

        if (threadId === currentThreadId) {
            if (updatedThreads.length > 0) {
                handleThreadSwitch(updatedThreads[0])
            } else {
                handleNewChat()
            }
        }

        toast.success('Chat deleted')
    }

    const getThreadPreview = (threadId) => {
        const threadMessages = loadFromLocalStorage(`thread_${threadId}`, [])
        if (threadMessages.length === 0) return 'New conversation'
        const firstMessage = threadMessages.find(msg => msg.isUser)
        return firstMessage ? firstMessage.content.substring(0, 30) + '...' : 'New conversation'
    }

    const handleSendMessage = async (content) => {
        const userMessage = { content, isUser: true, id: Date.now() }
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)
        saveConversation(currentThreadId, updatedMessages)

        setIsLoading(true)
        setIsTyping(true)

        try {
            const response = await askQuestion(content)

            setTimeout(() => {
                setIsTyping(false)
                const botMessage = {
                    answer: response.answer,
                    sources: response.sources || [],
                    isUser: false,
                    id: Date.now() + 1,
                }
                const finalMessages = [...updatedMessages, botMessage]
                setMessages(finalMessages)
                saveConversation(currentThreadId, finalMessages)
            }, 500)
        } catch (error) {
            setIsTyping(false)
            toast.error('Failed to get response', {
                description: error.message,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="h-[calc(100vh-4rem)] flex">
            {/* Left Pane - Chat Threads */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-80 border-r border-primary/20 bg-muted/30 p-4 flex flex-col"
            >
                <Button
                    onClick={handleNewChat}
                    className="w-full mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    variant="default"
                >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Chat
                </Button>

                <div className="flex-1 overflow-y-auto space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                        Chat History
                    </h3>
                    {chatThreads.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">
                            No chats yet
                        </p>
                    ) : (
                        chatThreads.map((threadId, idx) => (
                            <motion.div
                                key={threadId}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`relative group`}
                            >
                                <button
                                    onClick={() => handleThreadSwitch(threadId)}
                                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors truncate pr-10 ${threadId === currentThreadId
                                            ? 'bg-primary/20 text-primary border border-primary/30'
                                            : 'hover:bg-accent'
                                        }`}
                                >
                                    {getThreadPreview(threadId)}
                                </button>
                                <button
                                    onClick={(e) => handleDeleteThread(threadId, e)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded"
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>

            {/* Right Pane - Chat Interface */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="h-full flex items-center justify-center"
                        >
                            <Card className="p-8 max-w-md text-center border-primary/20 bg-card/50 backdrop-blur">
                                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Ask me anything
                                </h2>
                                <p className="text-muted-foreground">
                                    I can help you find information in your uploaded documents
                                </p>
                            </Card>
                        </motion.div>
                    ) : (
                        <>
                            <AnimatePresence>
                                {messages.map((message) => (
                                    <ChatBubble
                                        key={message.id}
                                        message={message}
                                        isUser={message.isUser}
                                    />
                                ))}
                            </AnimatePresence>

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex gap-3"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <div className="h-5 w-5" />
                                    </div>
                                    <div className="bg-muted rounded-lg px-4 py-3">
                                        <div className="flex gap-1">
                                            <motion.div
                                                className="w-2 h-2 bg-primary rounded-full"
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{
                                                    duration: 1.4,
                                                    repeat: Infinity,
                                                    delay: 0,
                                                }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-primary rounded-full"
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{
                                                    duration: 1.4,
                                                    repeat: Infinity,
                                                    delay: 0.2,
                                                }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-primary rounded-full"
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{
                                                    duration: 1.4,
                                                    repeat: Infinity,
                                                    delay: 0.4,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                <div className="border-t border-primary/20 p-4 bg-background">
                    <div className="max-w-4xl mx-auto">
                        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    )
}
