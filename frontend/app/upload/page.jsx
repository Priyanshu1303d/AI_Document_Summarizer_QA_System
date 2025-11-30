'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Link from 'next/link'
import { MessageSquare, FileSearch, ArrowRight } from 'lucide-react'
import FileDropzone from '@/components/FileDropzone'
import { uploadPDF } from '@/utils/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function UploadPage() {
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [uploadResult, setUploadResult] = useState(null)

    const handleUpload = async (file) => {
        try {
            const result = await uploadPDF(file)
            setUploadResult(result)
            setUploadSuccess(true)
            toast.success('Upload successful!', {
                description: `${result.valid_documents} documents processed, ${result.chunks_created} chunks created`,
            })
            return result
        } catch (error) {
            toast.error('Upload failed', {
                description: error.message,
            })
            throw error
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-4xl mx-auto border-primary/20 bg-card/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="text-3xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Upload Documents
                        </CardTitle>
                        <CardDescription className="text-base">
                            Upload PDF documents to process them for Q&A and summarization
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FileDropzone onUpload={handleUpload} />
                    </CardContent>
                </Card>
            </motion.div>

            {/* Success Actions - Compact Buttons */}
            {uploadSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="max-w-4xl mx-auto mt-6"
                >
                    <Card className="border-primary/30 bg-card/50 backdrop-blur">
                        <CardContent className="pt-6 pb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-semibold text-primary">
                                    ✨ Ready to explore your documents?
                                </h3>
                            </div>
                            <div className="flex gap-3">
                                <Link href="/chat" className="flex-1">
                                    <Button
                                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 group"
                                        size="default"
                                    >
                                        <MessageSquare className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                        Chat
                                        <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                </Link>

                                <Link href="/summaries" className="flex-1">
                                    <Button
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 group"
                                        size="default"
                                    >
                                        <FileSearch className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                        Summarize
                                        <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-4xl mx-auto mt-8"
            >
                <Card className="border-primary/20 bg-card/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="text-lg text-primary">How it works</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                            <li>Drag and drop PDF files or click to browse</li>
                            <li>Files are automatically uploaded and processed</li>
                            <li>Documents are chunked and indexed for efficient retrieval</li>
                            <li>Use the Chat page to ask questions about your documents</li>
                            <li>Use the Summaries page to generate document summaries</li>
                        </ol>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
