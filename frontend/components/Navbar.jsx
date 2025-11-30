'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { FileText, MessageSquare, FileSearch, Sparkles } from 'lucide-react'

export default function Navbar() {
    const pathname = usePathname()

    const navItems = [
        { href: '/upload', label: 'Upload', icon: FileText },
        { href: '/chat', label: 'Chat', icon: MessageSquare },
        { href: '/summaries', label: 'Summaries', icon: FileSearch },
    ]

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container flex h-16 items-center">
                <Link href="/" className="mr-8 flex items-center space-x-2 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                        <Sparkles className="h-6 w-6 text-primary relative" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        AI Document Assistant
                    </span>
                </Link>
                <div className="flex gap-6">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
                            >
                                <Icon className="h-4 w-4" />
                                <span className={isActive ? 'text-primary' : 'text-muted-foreground'}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
