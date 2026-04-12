'use client'
import { cn } from '@/lib/utils'

interface MenuToggleIconProps {
  open: boolean
  className?: string
  duration?: number
}

export function MenuToggleIcon({ open, className, duration = 300 }: MenuToggleIconProps) {
  return (
    <div className={cn('flex flex-col justify-center gap-[5px]', className)}>
      <span
        style={{ transitionDuration: `${duration}ms` }}
        className={cn(
          'block h-px w-full bg-current transition-all origin-center',
          open ? 'translate-y-[6.5px] rotate-45' : '',
        )}
      />
      <span
        style={{ transitionDuration: `${duration}ms` }}
        className={cn(
          'block h-px w-full bg-current transition-all',
          open ? 'opacity-0 scale-x-0' : '',
        )}
      />
      <span
        style={{ transitionDuration: `${duration}ms` }}
        className={cn(
          'block h-px w-full bg-current transition-all origin-center',
          open ? '-translate-y-[6.5px] -rotate-45' : '',
        )}
      />
    </div>
  )
}
