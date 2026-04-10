export default function ChallengeSection() {
    return (
        <div className="flex flex-col gap-3 px-5">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>
                    CHALLENGES
                </p>
                <button className="text-xs" style={{ color: '#C0C0C0', letterSpacing: '1px' }}>VIEW ALL</button>
            </div>

            <div
                className="flex items-center gap-4 p-4 rounded-2xl relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
                <div className="flex-1">
                    <p className="text-sm font-bold text-white mb-1" style={{ letterSpacing: '1px' }}>
                        BEST RUNNERS 🏃
                    </p>
                    <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
                        5 DAYS 13 HOURS LEFT
                    </p>
                    <div className="h-1 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-1 w-1/3 rounded-full" style={{ background: '#C0C0C0' }} />
                    </div>
                </div>
                <p className="text-xs flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
                    2 FRIENDS
                </p>
            </div>
        </div>
    )
}