export default function HabitRow({ icon, name, progress, done }) {
    return (
        <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
        >
            <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base"
                style={{ background: '#F5F5F5', border: '2px solid #8CC5E8' }}
            >
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-xs font-semibold" style={{ color: '#1A4B8C' }}>{name}</p>
                <p className="text-xs" style={{ color: '#888' }}>{progress}</p>
            </div>
            <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                    border: done ? 'none' : '1.5px solid #e5e7eb',
                    background: done ? '#3A81C2' : 'transparent',
                }}
            >
                {done
                    ? <span style={{ color: '#fff', fontSize: 12 }}>✓</span>
                    : <span style={{ color: '#888', fontSize: 14 }}>+</span>
                }
            </div>
        </div>
    )
}