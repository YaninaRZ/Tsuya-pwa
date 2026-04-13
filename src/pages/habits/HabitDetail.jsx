import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { getGoogleAuthUrl } from '@/lib/googleCalendar'

export default function HabitDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [habit, setHabit] = useState(null)
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        // Vérifie si on revient du callback Google
        const success = localStorage.getItem('calendar_success')
        if (success) {
            setToast(success)
            localStorage.removeItem('calendar_success')
            setTimeout(() => setToast(null), 4000)
        }

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

            {/* Toast */}
            {toast && (
                <div
                    className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl"
                    style={{
                        transform: 'translateX(-50%)',
                        background: 'rgba(255,255,255,0.95)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        animation: 'slideDown 0.3s ease',
                        maxWidth: '90vw',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <span style={{ fontSize: 20 }}>📅</span>
                    <div>
                        <p className="text-xs font-bold" style={{ color: '#0A0A0A', letterSpacing: '1px' }}>
                            AJOUTÉ AU CALENDRIER
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: '#666' }}>
                            {toast} a été ajouté à Google Calendar
                        </p>
                    </div>
                    <button onClick={() => setToast(null)} className="ml-2 text-xs" style={{ color: '#aaa' }}>
                        ✕
                    </button>
                </div>
            )}

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
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-12 left-6 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                >
                    ←
                </button>
            </div>

            {/* Contenu */}
            <div className="px-6 py-6 flex flex-col gap-5">

                <span className="text-xs font-medium" style={{ color: habit.color || '#C0C0C0', letterSpacing: '3px' }}>
                    {(habit.category || 'HABIT').toUpperCase()}
                </span>

                <h1 className="text-3xl font-bold text-white leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                    {habit.label}
                </h1>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span style={{ color: habit.color || '#C0C0C0', fontSize: 14 }}>◆</span>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}>
                            {habit.frequency === 'daily' ? 'Quotidien' : 'Hebdomadaire'}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => window.location.href = getGoogleAuthUrl(id)}
                        className="flex-1 py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                        style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '1px' }}
                    >
                        + CALENDRIER
                    </button>
                    <button
                        onClick={() => navigate(`/habits/${id}/edit`)}
                        className="flex-1 py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                        style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '1px' }}
                    >
                        ✎ ÉDITER
                    </button>
                </div>

                {habit.description && (
                    <div
                        className="p-4 rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            {habit.description}
                        </p>
                    </div>
                )}

            </div>

            <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
        </div>
    )
}