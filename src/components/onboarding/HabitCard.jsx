export default function HabitCard({ style }) {
    return (
        <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
            style={{
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                minWidth: 160,
                ...style,
            }}
        >
            <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#3A81C2' }}
            >
                <span style={{ color: '#fff', fontSize: 10 }}>✓</span>
            </div>
            <div className="flex flex-col gap-1 flex-1">
                <div className="h-1.5 w-16 rounded-full" style={{ background: '#e5e7eb' }} />
                <div className="h-1.5 w-10 rounded-full" style={{ background: '#e5e7eb' }} />
            </div>
            <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: 'rgba(0,0,0,0.1)' }} />
        </div>
    )
}