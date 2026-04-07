export default function ChallengeCard() {
    return (
        <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
        >
            <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: '#8CC5E8' }} />
            <div className="flex-1">
                <p className="text-xs font-semibold" style={{ color: '#1A4B8C' }}>Best Runners! 🏃</p>
                <p className="text-xs" style={{ color: '#888' }}>5 days 13 hours left</p>
                <div className="mt-1.5 h-1 rounded-full w-full" style={{ background: '#e5e7eb' }}>
                    <div className="h-1 rounded-full w-1/3" style={{ background: '#3A81C2' }} />
                </div>
            </div>
            <p className="text-xs" style={{ color: '#888' }}>2 friends joined</p>
        </div>
    )
}