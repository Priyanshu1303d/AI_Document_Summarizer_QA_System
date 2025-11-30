'use client'

import { useState } from 'react'
import { cn } from "@/utils/cn"
import { ChevronDown } from 'lucide-react'

export function Select({ value, onValueChange, children }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
                <SelectValue value={value} />
            </SelectTrigger>
            {isOpen && (
                <SelectContent onClose={() => setIsOpen(false)}>
                    {children}
                </SelectContent>
            )}
        </div>
    )
}

export function SelectTrigger({ className, children, ...props }) {
    return (
        <button
            type="button"
            className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
    )
}

export function SelectValue({ value }) {
    return <span>{value || "Select..."}</span>
}

export function SelectContent({ className, children, onClose }) {
    return (
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />
            <div
                className={cn(
                    "absolute z-50 mt-1 max-h-96 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md",
                    className
                )}
            >
                {children}
            </div>
        </>
    )
}

export function SelectItem({ value, onSelect, children, className }) {
    return (
        <div
            className={cn(
                "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className
            )}
            onClick={() => onSelect(value)}
        >
            {children}
        </div>
    )
}
