'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type ModalProps = {
  open: boolean
  onClose: () => void
  label: string
  className?: string
  children: React.ReactNode
}

export function Modal({ open, onClose, label, className, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!open && dialog.open) {
      dialog.close()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
      className={cn(
        'm-auto max-h-[92svh] w-[min(64rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-foreground/75 backdrop:backdrop-blur-sm open:animate-in open:fade-in-0 open:zoom-in-95',
        className,
      )}
    >
      {open ? children : null}
    </dialog>
  )
}
