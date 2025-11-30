'use client'

import Link from 'next/link'
import { Github, Heart } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="border-t border-primary/20 bg-background/95 backdrop-blur mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Made with</span>
                        <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
                        <span>by</span>
                        <Link
                            href="https://github.com/Priyanshu1303d"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-300 transition-all"
                        >
                            Priyanshu Kumar Singh
                        </Link>
                    </div>

                    <Link
                        href="https://github.com/Priyanshu1303d/AI_Document_Summarizer_QA_System"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">View on GitHub</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
