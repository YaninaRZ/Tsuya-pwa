import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`

const DAYS = [
    { id: 'monday', label: 'LUN' },
    { id: 'tuesday', label: 'MAR' },
    { id: 'wednesday', label: 'MER' },
    { id: 'thursday', label: 'JEU' },
    { id: 'friday', label: 'VEN' },
    { id: 'saturday', label: 'SAM' },
    { id: 'sunday', label: 'DIM' },
]

export default function HabitEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        label: '', emoji: '', frequency: 'daily', target_value: 1,
        target_unit: 'times', reminder_enabled: false, reminder_time: '09:00',
        habit_type: 'build', notes: '',
        reminder_days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase.from('habits').select('*').eq('id', id).single()
            if (data) setForm({
                label: data.label || '',
                emoji: data.emoji || '',
                frequency: data.frequency || 'daily',
                target_value: data.target_value || 1,
                target_unit: data.target_unit || 'times',
                reminder_enabled: data.reminder_enabled || false,
                reminder_time: data.reminder_time || '09:00',
                habit_type: data.habit_type || 'build',
                notes: data.notes || '',
                reminder_days: data.reminder_days || DAYS.map(d => d.id),
            })
            setLoading(false)
        }
        load()
    }, [id])

    const set = (field) => (val) => setForm(f => ({ ...f, [field]: val }))

    const handleSave = async () => {
        if (!form.label.trim()) return
        setSaving(true)
        await supabase.from('habits').update(form).eq('id', id)
        setSaving(false)
        navigate(`/habits/${id}`)
    }

    const handleDelete = async () => {
        if (!confirm('Supprimer cette habitude ?')) return
        await supabase.from('habits').delete().eq('id', id)
        navigate('/home')
    }

    const toggleDay = (dayId) => {
        const days = form.reminder_days.includes(dayId)
            ? form.reminder_days.filter(d => d !== dayId)
            : [...form.reminder_days, dayId]
        setForm(f => ({ ...f, reminder_days: days }))
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen" style={{ background: '#0A0A0A' }}>
            <div className="w-6 h-6 rounded-full border-2 animate-spin border-[#C0C0C0] border-t-transparent" />
        </div>
    )

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0A0A0A' }}>
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '150px', opacity: 0.3 }} />

            <div className="relative z-10 flex-1 overflow-y-auto max-w-lg mx-auto w-full px-6 pb-4">

                {/* Header */}
                <div className="flex items-center gap-4 pt-12 pb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-xl flex-shrink-0">←</Button>
                    <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                        Modifier l'habitude
                    </h1>
                </div>

                {/* NOM */}
                <div className="flex flex-col gap-3 mb-8">
                    <Label>Nom</Label>
                    <Input value={form.label} onChange={e => set('label')(e.target.value)} className="py-3 text-xl font-bold" />
                </div>

                {/* ICÔNE */}
                <div className="flex flex-col gap-3 mb-8">
                    <Label>Icône</Label>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-white/[0.08]">
                                {form.emoji || '⭐'}
                            </div>
                            <Input value={form.emoji} onChange={e => set('emoji')(e.target.value)} placeholder="Colle un emoji..." />
                        </CardContent>
                    </Card>
                </div>

                {/* OBJECTIF */}
                <div className="flex flex-col gap-3 mb-8">
                    <Label>Objectif</Label>
                    <Card>
                        <CardContent className="flex flex-col gap-4 p-4">
                            <div className="flex items-center gap-3">
                                <Button variant="secondary" size="icon" className="rounded-lg" onClick={() => set('target_value')(Math.max(1, form.target_value - 1))}>−</Button>
                                <span className="text-2xl font-bold text-white">{form.target_value}</span>
                                <Button variant="secondary" size="icon" className="rounded-lg" onClick={() => set('target_value')(form.target_value + 1)}>+</Button>
                                <span className="text-sm text-white/40">
                                    {form.target_unit} / {form.frequency === 'daily' ? 'jour' : 'semaine'}
                                </span>
                            </div>
                            <div className="flex gap-3">
                                {['daily', 'weekly'].map((f) => (
                                    <Button key={f} variant={form.frequency === f ? 'default' : 'outline'} className="flex-1 tracking-wider" onClick={() => set('frequency')(f)}>
                                        {f === 'daily' ? 'DAILY' : 'WEEKLY'}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RAPPELS */}
                <div className="flex flex-col gap-3 mb-8">
                    <Label>Rappels</Label>
                    <Card>
                        <CardContent className="flex flex-col gap-4 p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-white/60">Activer les rappels</p>
                                <Switch checked={form.reminder_enabled} onCheckedChange={set('reminder_enabled')} />
                            </div>
                            {form.reminder_enabled && (
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-[#C0C0C0]/20">
                                    <span className="text-white/40 text-sm">🕐</span>
                                    <input type="time" value={form.reminder_time} onChange={e => set('reminder_time')(e.target.value)} className="outline-none bg-transparent text-sm text-white" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* JOURS */}
                {form.reminder_enabled && (
                    <div className="flex flex-col gap-3 mb-8">
                        <Label>Jours</Label>
                        <Card>
                            <CardContent className="flex flex-col gap-3 p-4">
                                <div className="flex gap-2 flex-wrap">
                                    {DAYS.map((day) => (
                                        <Button
                                            key={day.id}
                                            variant={form.reminder_days.includes(day.id) ? 'default' : 'outline'}
                                            size="icon"
                                            className="rounded-xl w-10 h-10 text-xs"
                                            onClick={() => toggleDay(day.id)}
                                        >
                                            {day.label}
                                        </Button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm" onClick={() => setForm(f => ({ ...f, reminder_days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] }))}>SEMAINE</Button>
                                    <Button variant="secondary" size="sm" onClick={() => setForm(f => ({ ...f, reminder_days: ['saturday', 'sunday'] }))}>WEEK-END</Button>
                                    <Button variant="secondary" size="sm" onClick={() => setForm(f => ({ ...f, reminder_days: DAYS.map(d => d.id) }))}>TOUS</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* HABIT TYPE */}
                <div className="flex flex-col gap-3 mb-8">
                    <Label>Habit Type</Label>
                    <div className="flex rounded-2xl p-1 bg-white/[0.04] border border-white/[0.08]">
                        {['build', 'quit'].map((t) => (
                            <Button key={t} variant={form.habit_type === t ? 'default' : 'ghost'} className="flex-1 tracking-widest" onClick={() => set('habit_type')(t)}>
                                {t === 'build' ? 'BUILD' : 'QUIT'}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* NOTES */}
                <div className="flex flex-col gap-3 mb-4">
                    <Label>Notes</Label>
                    <Textarea value={form.notes} onChange={e => set('notes')(e.target.value)} rows={3} placeholder="Ajoute une note..." />
                </div>
            </div>

            {/* Sticky footer */}
            <div className="relative z-10 sticky bottom-0 px-6 py-4 flex flex-col gap-3 max-w-lg mx-auto w-full" style={{ background: 'linear-gradient(to top, #0A0A0A 80%, transparent)' }}>
                <Button onClick={handleSave} disabled={saving || !form.label.trim()} size="lg" className="w-full tracking-[3px]" variant={form.label.trim() ? 'default' : 'secondary'}>
                    {saving ? <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" /> : 'SAUVEGARDER'}
                </Button>
                <Button onClick={handleDelete} variant="destructive" size="lg" className="w-full tracking-[3px] bg-transparent border border-red-500/20 text-red-400/70 hover:bg-red-500/10">
                    SUPPRIMER
                </Button>
            </div>
        </div>
    )
}
