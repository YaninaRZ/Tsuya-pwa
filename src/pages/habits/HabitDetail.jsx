import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { getGoogleAuthUrl } from '@/lib/googleCalendar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HabitDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [habit, setHabit] = useState(null)
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        const success = localStorage.getItem('calendar_success')
        if (success) {
            setToast(success)
            localStorage.removeItem('calendar_success')
            setTimeout(() => setToast(null), 4000)
        }

        const load = async () => {
            const { data: habit } = await supabase.from('habits').select('*').eq('id', id).single()

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
            <div className="w-6 h-6 rounded-full border-2 animate-spin border-[#C0C0C0] border-t-transparent" />
        </div>
    )

    if (!habit) return null

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ background: '#0A0A0A' }}>

            {/* Toast */}
            {toast && (
                <div
                    className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/95 shadow-2xl"
                    style={{ transform: 'translateX(-50%)', animation: 'slideDown 0.3s ease', maxWidth: '90vw', whiteSpace: 'nowrap' }}
                >
                    <span style={{ fontSize: 20 }}>📅</span>
                    <div>
                        <p className="text-xs font-bold text-[#0A0A0A] tracking-wider">AJOUTÉ AU CALENDRIER</p>
                        <p className="text-xs mt-0.5 text-[#666]">{toast} a été ajouté à Google Calendar</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setToast(null)} className="ml-2 text-[#aaa] hover:text-[#666] w-5 h-5">✕</Button>
                </div>
            )}

            {/* Image */}
            <div className="relative h-72">
                {habit.image_url && (
                    <img src={habit.image_url} alt={habit.label} className="w-full h-full object-cover" style={{ opacity: 0.7, filter: 'contrast(1.1) saturate(0.8)' }} />
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.95) 100%)' }} />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="absolute top-12 left-6 rounded-xl bg-black/50 border border-white/15 text-white"
                >
                    ←
                </Button>
            </div>

            {/* Contenu */}
            <div className="px-6 py-6 flex flex-col gap-5">

                <Badge variant="silver" style={{ color: habit.color || '#C0C0C0', borderColor: `${habit.color || '#C0C0C0'}40` }}>
                    {(habit.category || 'HABIT').toUpperCase()}
                </Badge>

                <h1 className="text-3xl font-bold text-white leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                    {habit.label}
                </h1>

                <div className="flex items-center gap-2">
                    <span style={{ color: habit.color || '#C0C0C0', fontSize: 14 }}>◆</span>
                    <span className="text-sm text-white/60 tracking-wider">
                        {habit.frequency === 'daily' ? 'Quotidien' : 'Hebdomadaire'}
                    </span>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1 tracking-wider"
                        onClick={() => window.location.href = getGoogleAuthUrl(id)}
                    >
                        + CALENDRIER
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 tracking-wider"
                        onClick={() => navigate(`/habits/${id}/edit`)}
                    >
                        ✎ ÉDITER
                    </Button>
                </div>

                {habit.description && (
                    <Card>
                        <CardContent className="p-4">
                            <p className="text-sm leading-relaxed text-white/50">{habit.description}</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
