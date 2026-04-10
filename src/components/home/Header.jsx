import { useNavigate } from 'react-router-dom'

export default function Header({ user }) {
    const navigate = useNavigate()
    const name = user?.user_metadata?.name || 'Toi'

    return (
        <div className="flex flex-col px-5 pt-8 gap-4">
            {/* Top row */}
            <div className="flex items-center justify-between">
                <span
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: 'Georgia, serif', letterSpacing: '4px' }}
                >
                    TSUYA
                </span>
                <div className="flex items-center gap-3">
                    <button
                        className="w-9 h-9 rounded-xl flex items-center justify-center relative"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        <span style={{ fontSize: 16 }}>🔔</span>
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#C0C0C0' }} />
                    </button>
                    <button
                        onClick={() => navigate('/profile')}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
                        style={{
                            background: 'rgba(192,192,192,0.15)',
                            border: '1px solid rgba(192,192,192,0.3)',
                            color: '#C0C0C0',
                            letterSpacing: '1px',
                        }}
                    >
                        {name.charAt(0).toUpperCase()}
                    </button>
                </div>
            </div>

            {/* Greeting */}
            <div>
                <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>
                    BONJOUR,
                </p>
                <h1
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    {name.toUpperCase()}.
                </h1>
                <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>
                    WHAT WILL YOU ACCOMPLISH TODAY?
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                {['TODAY', 'CLUBS'].map((t, i) => (
                    <button
                        key={t}
                        className="pb-3 text-xs font-medium"
                        style={{
                            color: i === 0 ? '#fff' : 'rgba(255,255,255,0.3)',
                            borderBottom: i === 0 ? '1px solid #C0C0C0' : '1px solid transparent',
                            letterSpacing: '2px',
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
    )
}