export default function HabitItem({ emoji, label, subtitle, done, onToggle }) {
    return (
        <div
            className="flex items-center gap-4 px-4 py-4 rounded-2xl"
            style={{ background: '#fff' }}
        >
            <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                style={{
                    background: done ? '#E8F4F8' : '#F5F7FF',
                    border: `2px solid ${done ? '#8CC5E8' : '#e5e7eb'}`,
                }}
            >
                {emoji}
            </div>
            <div className="flex-1">
                <p
                    className="text-sm font-semibold"
                    style={{
                        color: '#1A1A2E',
                        textDecoration: done ? 'line-through' : 'none',
                        opacity: done ? 0.5 : 1,
                    }}
                >
                    {label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#aaa' }}>{subtitle}</p>
            </div>
            <button
                onClick={onToggle}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                    background: done ? '#3A81C2' : '#fff',
                    border: done ? 'none' : '2px solid #e5e7eb',
                }}
            >
                {done
                    ? <span style={{ color: '#fff', fontSize: 12 }}>✓</span>
                    : <span style={{ color: '#aaa', fontSize: 18 }}>+</span>
                }
            </button>
        </div>
    )
}