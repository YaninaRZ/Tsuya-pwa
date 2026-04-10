import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function HabitDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [habit, setHabit] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const { data: habit } = await supabase
                .from('habits')
                .select('*')
                .eq('id', id)
                .single()

            if (habit && !habit.image_url) {
                const { data: template } = await supabase
                    .from('habit_templates')
                    .select('image_url, description, color, category')
                    .eq('label', habit.label)
                    .single()

                if (template) {
                    habit.image_url = template.image_url
                    habit.description = template.description
                    habit.color = template.color
                    habit.category = template.category
                }
            }

            setHabit(habit)
            setLoading(false)
        }
        load()
    }, [id])

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen" style={{ background: '#0A0A0A' }}>
            <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: '#C0C0C0', borderTopColor: 'transparent' }} />
        </div>
    )

    if (!habit) return null

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ background: '#0A0A0A' }}>

            {/* Image plein écran haut */}
            <div className="relative h-72">
                {habit.image_url && (
                    <img
                        src={habit.image_url}
                        alt={habit.label}
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.7, filter: 'contrast(1.1) saturate(0.8)' }}
                    />
                )}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.95) 100%)' }}
                />

                {/* Bouton retour */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-12 left-6 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                >
                    ←
                </button>

                {/* Durée/objectif en haut à droite */}
                <div
                    className="absolute top-12 right-6 px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                    <span className="text-xs text-white" style={{ letterSpacing: '1px' }}>
                        {habit.target_value} {habit.target_unit?.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Contenu */}
            <div className="px-6 py-6 flex flex-col gap-5">

                {/* Tag catégorie */}
                <span
                    className="text-xs font-medium"
                    style={{ color: habit.color || '#C0C0C0', letterSpacing: '3px' }}
                >
                    {(habit.category || 'HABIT').toUpperCase()}
                </span>

                {/* Titre */}
                <div className="flex flex-col gap-2">
                    <h1
                        className="text-3xl font-bold text-white leading-tight"
                        style={{ fontFamily: 'Georgia, serif' }}
                    >
                        {habit.label}
                    </h1>
                </div>

                {/* Infos */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span style={{ color: habit.color || '#C0C0C0', fontSize: 14 }}>◆</span>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}>
                            {habit.frequency === 'daily' ? 'Quotidien' : 'Hebdomadaire'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span style={{ color: habit.color || '#C0C0C0', fontSize: 14 }}>◆</span>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}>
                            Objectif : {habit.target_value} {habit.target_unit}
                        </span>
                    </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3">
                    <button
                        className="flex-1 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                        style={{ background: '#fff', color: '#0A0A0A', letterSpacing: '1px' }}
                    >
                        ▶ COMMENCER
                    </button>
                    <button
                        className="flex-1 py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                        style={{
                            background: 'transparent',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            letterSpacing: '1px',
                        }}
                    >
                        + CALENDRIER
                    </button>
                </div>

                {/* Description */}
                {habit.description && (
                    <div
                        className="p-4 rounded-2xl"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.07)',
                        }}
                    >
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            {habit.description}
                        </p>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'FRÉQUENCE', value: habit.frequency === 'daily' ? 'DAILY' : 'WEEKLY' },
                        { label: 'OBJECTIF', value: `${habit.target_value || 1}` },
                        { label: 'UNITÉ', value: (habit.target_unit || 'FOIS').toUpperCase() },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="flex flex-col gap-1 p-4 rounded-2xl"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
                                {s.label}
                            </span>
                            <span className="text-lg font-bold text-white" style={{ letterSpacing: '1px' }}>
                                {s.value}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}