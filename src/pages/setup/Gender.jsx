import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import GenderCard from '@/components/setup/GenderCard'

const genders = [
    { id: 'homme', label: 'Homme', emoji: '👨' },
    { id: 'femme', label: 'Femme', emoji: '👩' },
    { id: 'non-binaire', label: 'Non-binaire', emoji: '🧑' },
]

export default function Gender() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(null)

    return (
        <div
            className="flex w-full overflow-hidden"
            style={{ height: '100vh', background: 'linear-gradient(160deg, #1A4B8C 0%, #3A81C2 100%)' }}
        >
            <div className="w-full flex items-center justify-center lg:p-16">
                <div
                    className="w-full lg:max-w-md lg:rounded-3xl p-8 flex flex-col gap-8 h-full lg:h-auto justify-center"
                    style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-1 mb-2">
                            <div className="h-1.5 w-8 rounded-full" style={{ background: '#3A81C2' }} />
                            <div className="h-1.5 w-8 rounded-full" style={{ background: '#e5e7eb' }} />
                        </div>
                        <h2 className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>
                            Tu t'identifies comment ? 👋
                        </h2>
                        <p className="text-sm" style={{ color: '#888' }}>
                            Ça nous aide à personnaliser ton expérience.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {genders.map((g) => (
                            <GenderCard
                                key={g.id}
                                emoji={g.emoji}
                                label={g.label}
                                selected={selected === g.id}
                                onSelect={() => setSelected(g.id)}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => selected && navigate('/setup/habits')}
                        className="w-full py-4 rounded-2xl text-base font-semibold"
                        style={{
                            background: selected ? 'linear-gradient(135deg, #1A4B8C, #3A81C2)' : '#e5e7eb',
                            color: selected ? '#fff' : '#aaa',
                            cursor: selected ? 'pointer' : 'not-allowed',
                        }}
                    >
                        Continuer →
                    </button>

                    <button
                        onClick={() => navigate('/setup/habits')}
                        className="text-sm text-center"
                        style={{ color: '#aaa' }}
                    >
                        Passer cette étape
                    </button>
                </div>
            </div>
        </div>
    )
}