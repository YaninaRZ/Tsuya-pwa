import { useNavigate } from 'react-router-dom'

export default function Header({ user }) {
    const navigate = useNavigate()
    const name = user?.user_metadata?.name || 'Toi'

    return (
        <div className="flex flex-col px-5 pt-6 gap-3">
            {/* Top row */}
            <div className="flex items-center justify-between">
                <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: '#fff', border: '1px solid #e5e7eb' }}
                >
                    <span style={{ fontSize: 18 }}>📅</span>
                </div>
                <button
                    className="w-10 h-10 rounded-2xl flex items-center justify-center relative"
                    style={{ background: '#fff', border: '1px solid #e5e7eb' }}
                >
                    <span style={{ fontSize: 18 }}>🔔</span>
                    <div
                        className="absolute top-2 right-2 w-2 h-2 rounded-full"
                        style={{ background: '#EF4444' }}
                    />
                </button>
            </div>

            {/* Greeting */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>
                        Hi, {name} 👋
                    </h1>
                    <p className="text-sm" style={{ color: '#888' }}>
                        Let's make habits together!
                    </p>
                </div>
                <button
                    onClick={() => navigate('/profile')}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold"
                    style={{ background: 'linear-gradient(135deg, #1A4B8C, #3A81C2)', color: '#fff' }}
                >
                    {name.charAt(0).toUpperCase()}
                </button>
            </div>

            {/* Tabs Today / Clubs */}
            <div
                className="flex rounded-2xl p-1"
                style={{ background: '#e5e7eb' }}
            >
                <button
                    className="flex-1 py-2 rounded-xl text-sm font-semibold"
                    style={{ background: '#fff', color: '#3A81C2' }}
                >
                    Today
                </button>
                <button
                    className="flex-1 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                    style={{ background: 'transparent', color: '#888' }}
                >
                    Clubs
                    <span
                        className="px-1.5 py-0.5 rounded-full text-xs"
                        style={{ background: '#ddd', color: '#666' }}
                    >
                        2
                    </span>
                </button>
            </div>
        </div>
    )
}