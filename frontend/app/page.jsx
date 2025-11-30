'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Upload, MessageSquare, FileSearch, Sparkles, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
    const features = [
        {
            icon: Upload,
            title: 'Smart Upload',
            description: 'Drag and drop PDF documents with intelligent processing and chunking',
            href: '/upload',
            color: 'from-cyan-500 to-blue-500',
        },
        {
            icon: MessageSquare,
            title: 'AI Chat',
            description: 'Ask questions and get instant answers from your documents using RAG',
            href: '/chat',
            color: 'from-blue-500 to-purple-500',
        },
        {
            icon: FileSearch,
            title: 'Summarization',
            description: 'Generate concise summaries in short, medium, or detailed formats',
            href: '/summaries',
            color: 'from-purple-500 to-pink-500',
        },
    ]

    const stats = [
        { icon: Zap, label: 'Lightning Fast', value: 'Instant Responses' },
        { icon: Shield, label: 'Secure', value: 'Your Data Protected' },
        { icon: Sparkles, label: 'AI Powered', value: 'Advanced RAG' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-3xl opacity-20 rounded-full" />
                            <Sparkles className="h-20 w-20 text-primary relative" />
                        </div>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        AI Document Summarizer & QA System
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                        Transform your documents into intelligent conversations. Upload, analyze, and extract insights with cutting-edge AI technology.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/upload">
                            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                                <Upload className="mr-2 h-5 w-5" />
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/chat">
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10">
                                <MessageSquare className="mr-2 h-5 w-5" />
                                Try Chat
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                        >
                            <Card className="text-center border-primary/20 bg-card/50 backdrop-blur">
                                <CardContent className="pt-6">
                                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="text-lg font-semibold text-primary">{stat.value}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Powerful Features
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Everything you need to work smarter with your documents
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                        >
                            <Link href={feature.href}>
                                <Card className="h-full border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 bg-card/50 backdrop-blur group cursor-pointer">
                                    <CardHeader>
                                        <div className="relative mb-4">
                                            <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} blur-xl opacity-20 group-hover:opacity-30 transition-opacity rounded-full`} />
                                            <feature.icon className="h-12 w-12 text-primary relative" />
                                        </div>
                                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                                            Explore →
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        How It Works
                    </h2>

                    <div className="space-y-8">
                        {[
                            { step: '01', title: 'Upload Documents', desc: 'Drag and drop your PDF files for instant processing' },
                            { step: '02', title: 'AI Processing', desc: 'Advanced algorithms chunk and index your content' },
                            { step: '03', title: 'Ask & Analyze', desc: 'Chat with your documents or generate summaries' },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + idx * 0.1, duration: 0.5 }}
                                className="flex gap-6 items-start"
                            >
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl font-bold">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-semibold mb-2 text-primary">{item.title}</h3>
                                    <p className="text-muted-foreground text-lg">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <Card className="max-w-3xl mx-auto border-primary/30 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur">
                        <CardContent className="text-center py-12">
                            <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                            <p className="text-muted-foreground text-lg mb-8">
                                Upload your first document and experience the power of AI-driven document intelligence
                            </p>
                            <Link href="/upload">
                                <Button size="lg" className="text-lg px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                                    <Upload className="mr-2 h-5 w-5" />
                                    Start Now
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>
        </div>
    )
}
