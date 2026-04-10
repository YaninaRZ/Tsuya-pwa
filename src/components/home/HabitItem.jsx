import { useNavigate } from 'react-router-dom'

export default function HabitItem({ emoji, label, done, onToggle, id }) {
    const navigate = useNavigate()

    return (
        <div
            className="flex items-center gap-4 px-4 py-4 rounded-2xl transition-all cursor-pointer"
            style={{
                background: done ? 'rgba(192,192,192,0.08)' : 'rgba(255,255,255,0.05)',
                border: done ? '1px solid rgba(192,192,192,0.2)' : '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
            }}
            onClick={() => navigate(`/habits/${id}`)}
        >
            <div
                className="w-11 h-11 flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12 }}
            >
                {emoji}
            </div>
            <div className="flex-1">
                <p
                    className="text-sm font-medium text-white"
                    style={{
                        letterSpacing: '0.5px',
                        opacity: done ? 0.4 : 1,
                        textDecoration: done ? 'line-through' : 'none',
                    }}
                >
                    {label.toUpperCase()}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
                    {done ? 'COMPLÉTÉ' : 'À FAIRE'}
                </p>
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onToggle() }}
                className="w-7 h-7 flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                    background: done ? '#C0C0C0' : 'transparent',
                    border: done ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 8,
                }}
            >
                {done && <span style={{ color: '#0A0A0A', fontSize: 11 }}>✓</span>}
            </button>
        </div>
    )
}