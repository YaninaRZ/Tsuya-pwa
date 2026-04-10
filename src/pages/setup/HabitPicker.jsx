import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { saveHabits } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export default function HabitPicker() {
    const navigate = useNavigate()
    const [habits, setHabits] = useState([])
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const loadTemplates = async () => {
            const { data } = await supabase.from('habit_templates').select('*')
            setHabits(data || [])
            setFetching(false)
        }
        loadTemplates()
    }, [])

    const toggle = (id) =>
        setSelected(prev => prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id])

    const handleSubmit = async () => {
        if (selected.length < 1) return
        setLoading(true)
        const selectedHabits = habits.filter(h => selected.includes(h.id))
        const { error } = await saveHabits(selectedHabits)
        if (error) console.error(error)
        setLoading(false)
        navigate('/home')
    }

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-screen" style={{ background: '#0A0A0A' }}>
                <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: '#C0C0C0', borderTopColor: 'transparent' }} />
            </div>
        )
    }

    return (
        <div className="flex w-full relative overflow-hidden" style={{ minHeight: '100vh', background: '#0A0A0A' }}>

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
                    className="w-full lg:max-w-4xl lg:rounded-3xl flex flex-col h-full lg:h-auto"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <div className="px-6 pt-8 pb-4">
                        <div className="flex gap-1.5 mb-4">
                            <div className="h-0.5 w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                            <div className="h-0.5 w-8 rounded-full" style={{ background: '#C0C0C0' }} />
                        </div>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '3px' }}>ÉTAPE 2 / 2</span>
                        <h2 className="text-xl lg:text-2xl font-bold text-white mt-2" style={{ fontFamily: 'Georgia, serif' }}>
                            CHOISIS TES HABITUDES.
                        </h2>
                        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>
                            TU POURRAS EN AJOUTER D'AUTRES PLUS TARD.
                        </p>
                    </div>

                    {selected.length > 0 && (
                        <div
                            className="mx-6 mb-2 flex items-center gap-2 px-4 py-2 rounded-xl"
                            style={{ background: 'rgba(192,192,192,0.08)', border: '1px solid rgba(192,192,192,0.15)' }}
                        >
                            <span style={{ color: '#C0C0C0', fontSize: 12 }}>✓</span>
                            <span className="text-xs font-medium" style={{ color: '#C0C0C0', letterSpacing: '1px' }}>
                                {selected.length} HABITUDE{selected.length > 1 ? 'S' : ''} SÉLECTIONNÉE{selected.length > 1 ? 'S' : ''}
                            </span>
                        </div>
                    )}

                    <div className="px-6 overflow-y-auto" style={{ flex: 1 }}>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-4">
                            {habits.map((h) => {
                                const isSelected = selected.includes(h.id)
                                return (
                                    <button
                                        key={h.id}
                                        onClick={() => toggle(h.id)}
                                        className="flex flex-col items-start justify-end rounded-2xl overflow-hidden transition-all relative"
                                        style={{
                                            height: 160,
                                            border: isSelected ? '1px solid rgba(192,192,192,0.5)' : '1px solid rgba(255,255,255,0.07)',
                                        }}
                                    >
                                        {h.image_url && (
                                            <img
                                                src={h.image_url}
                                                alt={h.label}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ opacity: isSelected ? 0.5 : 0.3, filter: 'grayscale(0.3) contrast(1.1)' }}
                                            />
                                        )}
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: 'linear-gradient(to bottom, transparent 20%, rgba(10,10,10,0.9) 100%)' }}
                                        />
                                        {isSelected && (
                                            <div
                                                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center z-10"
                                                style={{ background: '#C0C0C0' }}
                                            >
                                                <span style={{ color: '#0A0A0A', fontSize: 9 }}>✓</span>
                                            </div>
                                        )}
                                        <div className="relative z-10 p-3 flex flex-col gap-1">
                                            <span style={{ fontSize: 24 }}>{h.emoji}</span>
                                            <span className="text-xs font-medium text-white text-left" style={{ letterSpacing: '1px' }}>
                                                {h.label.toUpperCase()}
                                            </span>
                                            <span className="text-left leading-tight" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10 }}>
                                                {h.target_value} {h.target_unit} / {h.frequency}
                                            </span>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="p-6 pt-3">
                        <button
                            onClick={handleSubmit}
                            disabled={selected.length < 1 || loading}
                            className="w-full py-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2"
                            style={{
                                background: selected.length >= 1 ? '#fff' : 'rgba(255,255,255,0.06)',
                                color: selected.length >= 1 ? '#0A0A0A' : 'rgba(255,255,255,0.2)',
                                letterSpacing: '3px',
                                cursor: selected.length >= 1 && !loading ? 'pointer' : 'not-allowed',
                            }}
                        >
                            {loading ? (
                                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                            ) : selected.length >= 1 ? "C'EST PARTI 🚀" : 'SÉLECTIONNE AU MOINS 1 HABITUDE'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}