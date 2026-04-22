import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HabitItem({ emoji, label, done, onToggle, id }) {
    const navigate = useNavigate()

    return (
        <Card
            className={cn(
                'flex items-center gap-4 px-4 py-4 cursor-pointer transition-all',
                done
                    ? 'bg-white/[0.08] border-white/20'
                    : 'bg-white/[0.05] border-white/[0.07]'
            )}
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            onClick={() => navigate(`/habits/${id}`)}
        >
            <div className="w-11 h-11 flex items-center justify-center text-xl flex-shrink-0 rounded-xl bg-white/[0.07]">
                {emoji}
            </div>
            <div className="flex-1">
                <p
                    className={cn(
                        'text-sm font-medium text-white tracking-wider',
                        done && 'opacity-40 line-through'
                    )}
                >
                    {label.toUpperCase()}
                </p>
                <p className="text-xs mt-0.5 text-white/25 tracking-widest">
                    {done ? 'COMPLÉTÉ' : 'À FAIRE'}
                </p>
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={(e) => { e.stopPropagation(); onToggle() }}
                className={cn(
                    'w-7 h-7 rounded-lg flex-shrink-0 transition-all',
                    done
                        ? 'bg-[#C0C0C0] hover:bg-[#C0C0C0]/90 border-none'
                        : 'bg-transparent border border-white/15 hover:bg-white/05'
                )}
            >
                {done && <span style={{ color: '#0A0A0A', fontSize: 11 }}>✓</span>}
            </Button>
        </Card>
    )
}
