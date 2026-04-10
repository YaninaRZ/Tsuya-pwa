export default function HabitCard({ emoji, label, selected, onSelect }) {
    return (
        <button
            onClick={onSelect}
            className="flex flex-col items-center justify-center gap-3 py-6 px-4 rounded-2xl transition-all"
            style={{
                background: selected ? 'rgba(192,192,192,0.1)' : 'rgba(255,255,255,0.04)',
                border: selected ? '1px solid rgba(192,192,192,0.35)' : '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
            }}
        >
            <span style={{ fontSize: 32 }}>{emoji}</span>
            <span
                className="text-xs font-medium text-center"
                style={{
                    color: selected ? '#fff' : 'rgba(255,255,255,0.4)',
                    letterSpacing: '1px',
                }}
            >
                {label}
            </span>
            {selected && (
                <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: '#C0C0C0' }}
                >
                    <span style={{ color: '#0A0A0A', fontSize: 9 }}>✓</span>
                </div>
            )}
        </button>
    )
}