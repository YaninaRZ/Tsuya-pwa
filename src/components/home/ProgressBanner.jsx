export default function ProgressBanner({ completed, total }) {
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0

    return (
        <div
            className="mx-5 px-5 py-4 rounded-2xl"
            style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>
                    CHECK-IN GOAL
                </p>
                <p className="text-xs" style={{ color: '#C0C0C0', letterSpacing: '1px' }}>
                    {completed} / {total}
                </p>
            </div>

            <div className="flex gap-1">
                {Array.from({ length: total || 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 h-1 rounded-full"
                        style={{ background: i < completed ? '#C0C0C0' : 'rgba(255,255,255,0.1)' }}
                    />
                ))}
            </div>

            <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
                {pct < 100 ? `${pct}% COMPLÉTÉ AUJOURD'HUI` : 'OBJECTIF ATTEINT 🎯'}
            </p>
        </div>
    )
}