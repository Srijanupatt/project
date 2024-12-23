import { Star } from 'lucide-react'
import { cn } from '../lib/utils'

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
}: RatingStarsProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => (
        <button
          key={index}
          type={interactive ? 'button' : undefined}
          onClick={() => interactive && onChange?.(index + 1)}
          className={cn(
            'focus:outline-none',
            interactive && 'cursor-pointer hover:scale-110 transition-transform'
          )}
          disabled={!interactive}
        >
          <Star
            className={cn(
              sizes[size],
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            )}
            fill="currentColor"
          />
        </button>
      ))}
    </div>
  )
}