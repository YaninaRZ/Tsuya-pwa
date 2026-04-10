export default function ChallengeSection() {
    return (
        <div className="flex flex-col gap-3 px-5">
            <div className="flex items-center justify-between">
                <p className="text-base font-bold" style={{ color: '#1A1A2E' }}>Challenges</p>
                <button className="text-xs font-semibold" style={{ color: '#3A81C2' }}>VIEW ALL</button>
            </div>

            <div
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: '#fff' }}
            >
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#E8F4F8' }}
                >
                    <span>🏃</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: '#1A1A2E' }}>Best Runners! 🏃</p>
                    <p className="text-xs" style={{ color: '#aaa' }}>5 days 13 hours left</p>
                    <div className="mt-1.5 h-1 rounded-full w-full" style={{ background: '#e5e7eb' }}>
                        <div className="h-1 rounded-full w-1/3" style={{ background: '#3A81C2' }} />
                    </div>
                </div>
                <p className="text-xs flex-shrink-0" style={{ color: '#aaa' }}>2 friends</p>
            </div>
        </div>
    )
}