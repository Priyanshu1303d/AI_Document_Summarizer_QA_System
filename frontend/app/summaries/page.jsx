'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Loader from '@/components/Loader'
import StreamingText from '@/components/StreamingText'
import { summarizeContent } from '@/utils/api'

export default function SummariesPage() {
    const [mode, setMode] = useState('medium')
    const [summary, setSummary] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSummarize = async () => {
        setIsLoading(true)
        setSummary('')

        try {
            const response = await summarizeContent(mode)
            const summaryText = response.summary || response.result || JSON.stringify(response)
            setSummary(summaryText)
            toast.success('Summary generated!')
        } catch (error) {
            toast.error('Failed to generate summary', {
                description: error.message,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto"
            >
                <Card className="border-primary/20 bg-card/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="text-3xl flex items-center gap-2">
                            <Sparkles className="h-8 w-8 text-primary" />
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Document Summarization
                            </span>
                        </CardTitle>
                        <CardDescription className="text-base">
                            Generate AI-powered summaries of your uploaded documents in your preferred detail level
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Info Section */}
                        <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                            <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-foreground">
                                    This will summarize all your uploaded PDF documents. Make sure you've uploaded documents first!
                                </p>
                            </div>
                        </div>

                        {/* Mode Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Summary Mode</label>
                            <select
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isLoading}
                            >
                                <option value="short">Short</option>
                                <option value="medium">Medium</option>
                                <option value="detailed">Detailed</option>
                            </select>
                            <p className="text-xs text-muted-foreground">
                                {mode === 'short' && '📝 Quick overview with key points (4-6 sentences)'}
                                {mode === 'medium' && '📄 Balanced summary with main ideas (1-2 paragraphs)'}
                                {mode === 'detailed' && '📚 Comprehensive summary with details (multiple paragraphs)'}
                            </p>
                        </div>

                        {/* Generate Button */}
                        <Button
                            onClick={handleSummarize}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                            size="lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader size="sm" className="mr-2" />
                                    Generating Summary...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Generate Summary
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Summary Output */}
                <AnimatePresence>
                    {summary && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="mt-6"
                        >
                            <Card className="border-primary/50 shadow-lg shadow-primary/20 bg-card/50 backdrop-blur">
                                <CardHeader>
                                    <CardTitle className="text-xl text-primary">Summary</CardTitle>
                                    <CardDescription>
                                        Generated in {mode} mode
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose prose-sm max-w-none">
                                        <StreamingText text={summary} speed={15} />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
