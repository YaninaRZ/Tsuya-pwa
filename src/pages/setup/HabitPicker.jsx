import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import HabitCard from '@/components/setup/HabitCard'
import { saveHabits } from '@/lib/auth'

const habits = [
    { id: 'water', emoji: '💧', label: 'Drink water' },
    { id: 'run', emoji: '🏃‍♀️', label: 'Run' },
    { id: 'read', emoji: '📖', label: 'Read books' },
    { id: 'meditate', emoji: '🧘‍♀️', label: 'Meditate' },
    { id: 'study', emoji: '👨‍💻', label: 'Study' },
    { id: 'journal', emoji: '📕', label: 'Journal' },
    { id: 'eat', emoji: '🌿', label: 'Eat healthy' },
    { id: 'sleep', emoji: '😴', label: 'Sleep early' },
    { id: 'gym', emoji: '🏋️', label: 'Gym' },
    { id: 'walk', emoji: '🚶', label: 'Walk 10k' },
]

export default function HabitPicker() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)

    const toggle = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
        )
    }

    const handleSubmit = async () => {
        if (selected.length < 1) return
        setLoading(true)

        const selectedHabits = habits.filter(h => selected.includes(h.id))
        const { error } = await saveHabits(selectedHabits)
        if (error) console.error(error)

        setLoading(false)
        navigate('/home')
    }

    return (
        <div
            className="flex w-full"
            style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #1A4B8C 0%, #3A81C2 100%)' }}
        >
            <div className="w-full flex items-center justify-center lg:p-16">
                <div
                    className="w-full lg:max-w-4xl lg:rounded-3xl flex flex-col h-full lg:h-auto"
                    style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                >
                    <div className="px-6 pt-6 pb-4">
                        <div className="flex gap-1 mb-3">
                            <div className="h-1.5 w-8 rounded-full" style={{ background: '#e5e7eb' }} />
                            <div className="h-1.5 w-8 rounded-full" style={{ background: '#3A81C2' }} />
                        </div>
                        <h2 className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>
                            Choisis tes habitudes 🎯
                        </h2>
                        <p className="text-sm mt-1" style={{ color: '#888' }}>
                            Tu pourras en ajouter d'autres plus tard.
                        </p>
                    </div>

                    {selected.length > 0 && (
                        <div className="mx-6 mb-2 flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#E8F4F8' }}>
                            <span style={{ color: '#3A81C2', fontSize: 14 }}>✓</span>
                            <span className="text-sm font-medium" style={{ color: '#1A4B8C' }}>
                                {selected.length} habitude{selected.length > 1 ? 's' : ''} sélectionnée{selected.length > 1 ? 's' : ''}
                            </span>
                        </div>
                    )}

                    <div className="px-6 overflow-y-auto" style={{ flex: 1 }}>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-4">
                            {habits.map((h) => (
                                <HabitCard
                                    key={h.id}
                                    emoji={h.emoji}
                                    label={h.label}
                                    selected={selected.includes(h.id)}
                                    onSelect={() => toggle(h.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="p-6 pt-3">
                        <button
                            onClick={handleSubmit}
                            disabled={selected.length < 1 || loading}
                            className="w-full py-4 rounded-2xl text-base font-semibold flex items-center justify-center gap-2"
                            style={{
                                background: selected.length >= 1
                                    ? 'linear-gradient(135deg, #1A4B8C, #3A81C2)'
                                    : '#e5e7eb',
                                color: selected.length >= 1 ? '#fff' : '#aaa',
                                cursor: selected.length >= 1 && !loading ? 'pointer' : 'not-allowed',
                            }}
                        >
                            {loading ? (
                                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            ) : selected.length >= 1 ? `C'est parti 🚀` : 'Sélectionne au moins 1 habitude'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}