'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'

export default function FileDropzone({ onUpload }) {
    const [isDragging, setIsDragging] = useState(false)
    const [files, setFiles] = useState([])

    const handleDrag = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleDragIn = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true)
        }
    }, [])

    const handleDragOut = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            (file) => file.type === 'application/pdf'
        )

        if (droppedFiles.length > 0) {
            const newFiles = droppedFiles.map((file) => ({
                file,
                id: Math.random().toString(36).substr(2, 9),
                status: 'pending', // pending, uploading, success, error
                progress: 0,
                message: '',
            }))
            setFiles((prev) => [...prev, ...newFiles])

            // Upload each file
            newFiles.forEach((fileObj) => uploadFile(fileObj))
        }
    }, [])

    const handleFileInput = useCallback((e) => {
        const selectedFiles = Array.from(e.target.files).filter(
            (file) => file.type === 'application/pdf'
        )

        if (selectedFiles.length > 0) {
            const newFiles = selectedFiles.map((file) => ({
                file,
                id: Math.random().toString(36).substr(2, 9),
                status: 'pending',
                progress: 0,
                message: '',
            }))
            setFiles((prev) => [...prev, ...newFiles])

            // Upload each file
            newFiles.forEach((fileObj) => uploadFile(fileObj))
        }
    }, [])

    const uploadFile = async (fileObj) => {
        // Update status to uploading
        setFiles((prev) =>
            prev.map((f) =>
                f.id === fileObj.id ? { ...f, status: 'uploading', progress: 50 } : f
            )
        )

        try {
            const result = await onUpload(fileObj.file)

            // Update status to success
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id
                        ? {
                            ...f,
                            status: 'success',
                            progress: 100,
                            message: `${result.valid_documents} documents, ${result.chunks_created} chunks`,
                        }
                        : f
                )
            )
        } catch (error) {
            // Update status to error
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === fileObj.id
                        ? {
                            ...f,
                            status: 'error',
                            progress: 0,
                            message: error.message || 'Upload failed',
                        }
                        : f
                )
            )
        }
    }

    const removeFile = (id) => {
        setFiles((prev) => prev.filter((f) => f.id !== id))
    }

    return (
        <div className="w-full space-y-4">
            <div
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative rounded-lg border-2 border-dashed transition-all ${isDragging
                        ? 'border-primary bg-primary/5 scale-[1.02]'
                        : 'border-muted-foreground/25 hover:border-primary/50'
                    }`}
            >
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    <motion.div
                        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">
                        Drop PDF files here
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        or click to browse
                    </p>
                    <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button variant="outline" className="pointer-events-none">
                        Select Files
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-2"
                    >
                        {files.map((fileObj) => (
                            <motion.div
                                key={fileObj.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center gap-3 p-4 rounded-lg border bg-card"
                            >
                                <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {fileObj.file.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    {fileObj.message && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {fileObj.message}
                                        </p>
                                    )}
                                    {fileObj.status === 'uploading' && (
                                        <div className="mt-2 w-full bg-secondary rounded-full h-1.5">
                                            <motion.div
                                                className="bg-primary h-1.5 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${fileObj.progress}%` }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    )}
                                </div>
                                {fileObj.status === 'success' && (
                                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                )}
                                {fileObj.status === 'error' && (
                                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFile(fileObj.id)}
                                    className="flex-shrink-0"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
