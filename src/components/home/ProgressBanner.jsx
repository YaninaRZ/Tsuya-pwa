export default function ProgressBanner({ completed, total }) {
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0
    const radius = 22
    const circ = 2 * Math.PI * radius
    const offset = circ - (pct / 100) * circ

    return (
        <div
            className="mx-5 px-5 py-4 rounded-2xl flex items-center gap-4"
            style={{ background: 'linear-gradient(135deg, #1A4B8C, #3A81C2)' }}
        >
            {/* Cercle progress */}
            <div className="relative flex-shrink-0">
                <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                    <circle
                        cx="28" cy="28" r={radius}
                        fill="none"
                        stroke="#fff"
                        strokeWidth="4"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform="rotate(-90 28 28)"
                    />
                </svg>
                <span
                    className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                    style={{ color: '#fff' }}
                >
                    {pct}%
                </span>
            </div>

            <div>
                <p className="text-sm font-bold text-white">
                    {pct < 100 ? 'Your daily goals almost done! 🔥' : 'All done for today! 🎉'}
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {completed} of {total} completed
                </p>
            </div>
        </div>
    )
}