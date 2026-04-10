import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { saveGender } from '@/lib/auth'

const genders = [
    { id: 'homme', label: 'HOMME', emoji: '👨' },
    { id: 'femme', label: 'FEMME', emoji: '👩' },
    { id: 'non-binaire', label: 'NON-BINAIRE', emoji: '🧑' },
]

export default function Gender() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleContinue = async () => {
        if (!selected) return
        setLoading(true)
        await saveGender(selected)
        setLoading(false)
        navigate('/setup/habits')
    }

    return (
        <div
            className="flex w-full overflow-hidden relative"
            style={{ height: '100vh', background: '#0A0A0A' }}
        >
            {/* Grain */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '150px',
                    opacity: 0.3,
                }}
            />

            <div className="relative z-10 w-full flex items-center justify-center lg:p-16">
                <div
                    className="w-full lg:max-w-md lg:rounded-3xl p-8 flex flex-col gap-8 h-full lg:h-auto justify-center"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    {/* Header */}
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-1.5 mb-2">
                            <div className="h-0.5 w-8 rounded-full" style={{ background: '#C0C0C0' }} />
                            <div className="h-0.5 w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                        </div>
                        <span
                            className="text-xs"
                            style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '3px' }}
                        >
                            ÉTAPE 1 / 2
                        </span>
                        <h2
                            className="text-xl lg:text-2xl font-bold text-white"
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            TU T'IDENTIFIES COMMENT ?
                        </h2>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>
                            ÇA NOUS AIDE À PERSONNALISER TON EXPÉRIENCE.
                        </p>
                    </div>

                    {/* Choix */}
                    <div className="flex flex-col gap-3">
                        {genders.map((g) => (
                            <button
                                key={g.id}
                                onClick={() => setSelected(g.id)}
                                className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-left"
                                style={{
                                    background: selected === g.id ? 'rgba(192,192,192,0.1)' : 'rgba(255,255,255,0.03)',
                                    border: selected === g.id ? '1px solid rgba(192,192,192,0.4)' : '1px solid rgba(255,255,255,0.07)',
                                }}
                            >
                                <span className="text-2xl">{g.emoji}</span>
                                <span
                                    className="text-sm font-medium flex-1"
                                    style={{ color: selected === g.id ? '#fff' : 'rgba(255,255,255,0.5)', letterSpacing: '2px' }}
                                >
                                    {g.label}
                                </span>
                                <div
                                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: selected === g.id ? '#C0C0C0' : 'transparent',
                                        border: selected === g.id ? 'none' : '1px solid rgba(255,255,255,0.15)',
                                    }}
                                >
                                    {selected === g.id && <span style={{ color: '#0A0A0A', fontSize: 11 }}>✓</span>}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Bouton */}
                    <button
                        onClick={handleContinue}
                        disabled={!selected || loading}
                        className="w-full py-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2"
                        style={{
                            background: selected ? '#fff' : 'rgba(255,255,255,0.08)',
                            color: selected ? '#0A0A0A' : 'rgba(255,255,255,0.2)',
                            letterSpacing: '3px',
                            cursor: selected && !loading ? 'pointer' : 'not-allowed',
                        }}
                    >
                        {loading
                            ? <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                            : 'CONTINUER'
                        }
                    </button>

                    <button
                        onClick={() => navigate('/setup/habits')}
                        className="text-xs text-center"
                        style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '2px' }}
                    >
                        PASSER CETTE ÉTAPE
                    </button>
                </div>
            </div>
        </div>
    )
}