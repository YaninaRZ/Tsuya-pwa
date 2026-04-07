import { useNavigate } from 'react-router-dom'

export default function Splash() {
    const navigate = useNavigate()

    return (
        <div
            className="flex flex-col min-h-screen"
            style={{ background: 'linear-gradient(160deg, #1A4B8C 0%, #3A81C2 100%)' }}
        >
            <div className="flex-1 flex items-center justify-center flex-col gap-6 pt-16 px-6">

                <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center">
                    <img src="/pwa-192x192.png" alt="Tsuya" className="w-12 h-12 object-contain" />
                </div>

                <div className="text-center flex flex-col gap-3">
                    <h1 className="text-4xl font-semibold text-white tracking-tight">Tsuya</h1>
                    <p className="text-base leading-relaxed" style={{ color: '#8CC5E8' }}>
                        Construis des habitudes.<br />Gagne des récompenses.
                    </p>
                </div>

                <div className="flex gap-2 mt-4 flex-nowrap">
                    {['🔥 Streaks', '⭐ XP', '🏆 Niveaux'].map((item) => (
                        <span
                            key={item}
                            className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-md mx-auto px-6 pb-12 flex flex-col gap-3">
                <button
                    onClick={() => navigate('/onboarding/slides')}
                    className="w-full py-4 rounded-2xl text-base font-semibold"
                    style={{ background: '#FFFFFF', color: '#1A4B8C' }}
                >
                    Commencer
                </button>
                <button
                    onClick={() => navigate('/auth')}
                    className="w-full py-4 rounded-2xl text-base font-medium border"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', background: 'transparent' }}
                >
                    J'ai déjà un compte
                </button>
            </div>

        </div>
    )
}