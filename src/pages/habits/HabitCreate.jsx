import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'

export default function HabitCreate() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        label: '',
        emoji: '⭐',
        frequency: 'daily',
        target_value: 1,
        target_unit: 'times',
        reminder_enabled: false,
        reminder_time: '09:00',
        habit_type: 'build',
        notes: '',
        reminder_days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    })
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        if (!form.label.trim()) return
        setSaving(true)
        const user = await getUser()
        await supabase.from('habits').insert({
            ...form,
            user_id: user.id,
        })
        setSaving(false)
        navigate('/home')
    }

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0A0A0A' }}>

            {/* Grain */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '150px',
                    opacity: 0.3,
                }}
            />

            {/* Contenu scrollable */}
            <div className="relative z-10 flex-1 overflow-y-auto max-w-lg mx-auto w-full px-6 pb-4">

                {/* Header */}
                <div className="flex items-center gap-4 pt-12 pb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    >
                        ←
                    </button>
                    <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                        Créer une habitude
                    </h1>
                </div>

                {/* NAME */}
                <div className="flex flex-col gap-3 mb-8">
                    <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>NOM</p>
                    <input
                        value={form.label}
                        onChange={e => setForm({ ...form, label: e.target.value })}
                        className="w-full py-3 text-xl font-bold outline-none bg-transparent"
                        placeholder="Nom de l'habitude..."
                        style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.15)' }}
                        onFocus={e => e.target.style.borderBottomColor = '#C0C0C0'}
                        onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)'}
                    />
                </div>

                {/* ICON */}
                <div className="flex flex-col gap-3 mb-8">
                    <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>ICÔNE</p>
                    <div
                        className="flex items-center gap-4 p-4 rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.08)' }}
                        >
                            {form.emoji}
                        </div>
                        <input
                            value={form.emoji}
                            onChange={e => setForm({ ...form, emoji: e.target.value })}
                            className="flex-1 py-2 text-sm outline-none bg-transparent"
                            style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                            placeholder="Colle un emoji..."
                            onFocus={e => e.target.style.borderBottomColor = '#C0C0C0'}
                            onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>
                </div>

                {/* GOAL */}
                <div className="flex flex-col gap-3 mb-8">
                    <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>OBJECTIF</p>
                    <div
                        className="p-4 rounded-2xl flex flex-col gap-4"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setForm({ ...form, target_value: Math.max(1, form.target_value - 1) })}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                                style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}
                            >−</button>
                            <span className="text-2xl font-bold text-white">{form.target_value}</span>
                            <button
                                onClick={() => setForm({ ...form, target_value: form.target_value + 1 })}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                                style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}
                            >+</button>
                            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                {form.target_unit} / {form.frequency === 'daily' ? 'jour' : 'semaine'}
                            </span>
                        </div>

                        <div className="flex gap-3">
                            {['daily', 'weekly'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setForm({ ...form, frequency: f })}
                                    className="flex-1 py-2.5 rounded-xl text-xs font-medium"
                                    style={{
                                        background: form.frequency === f ? '#fff' : 'transparent',
                                        color: form.frequency === f ? '#0A0A0A' : 'rgba(255,255,255,0.4)',
                                        border: form.frequency === f ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                        letterSpacing: '1px',
                                    }}
                                >
                                    {f === 'daily' ? 'DAILY' : 'WEEKLY'}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>UNITÉ</label>
                            <input
                                value={form.target_unit}
                                onChange={e => setForm({ ...form, target_unit: e.target.value })}
                                className="w-full py-2 text-sm outline-none bg-transparent"
                                style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                                placeholder="times, ml, steps..."
                                onFocus={e => e.target.style.borderBottomColor = '#C0C0C0'}
                                onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>
                    </div>
                </div>

                {/* REMINDERS */}
                <div className="flex flex-col gap-3 mb-8">
                    <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>RAPPELS</p>
                    <div
                        className="p-4 rounded-2xl flex flex-col gap-4"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Activer les rappels</p>
                            <button
                                onClick={() => setForm({ ...form, reminder_enabled: !form.reminder_enabled })}
                                className="w-12 h-6 rounded-full transition-all relative"
                                style={{ background: form.reminder_enabled ? '#C0C0C0' : 'rgba(255,255,255,0.1)' }}
                            >
                                <div
                                    className="absolute top-0.5 w-5 h-5 rounded-full transition-all"
                                    style={{ background: '#fff', left: form.reminder_enabled ? '26px' : '2px' }}
                                />
                            </button>
                        </div>

                        {form.reminder_enabled && (
                            <div
                                className="flex items-center gap-3 p-3 rounded-xl"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(192,192,192,0.2)' }}
                            >
                                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>🕐</span>
                                <input
                                    type="time"
                                    value={form.reminder_time}
                                    onChange={e => setForm({ ...form, reminder_time: e.target.value })}
                                    className="outline-none bg-transparent text-sm"
                                    style={{ color: '#fff' }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* JOURS */}
                {form.reminder_enabled && (
                    <div className="flex flex-col gap-3 mb-8">
                        <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>JOURS</p>
                        <div
                            className="p-4 rounded-2xl flex flex-col gap-3"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { id: 'monday', label: 'LUN' },
                                    { id: 'tuesday', label: 'MAR' },
                                    { id: 'wednesday', label: 'MER' },
                                    { id: 'thursday', label: 'JEU' },
                                    { id: 'friday', label: 'VEN' },
                                    { id: 'saturday', label: 'SAM' },
                                    { id: 'sunday', label: 'DIM' },
                                ].map((day) => {
                                    const isActive = form.reminder_days.includes(day.id)
                                    return (
                                        <button
                                            key={day.id}
                                            onClick={() => {
                                                const days = isActive
                                                    ? form.reminder_days.filter(d => d !== day.id)
                                                    : [...form.reminder_days, day.id]
                                                setForm({ ...form, reminder_days: days })
                                            }}
                                            className="w-10 h-10 rounded-xl text-xs font-medium flex items-center justify-center"
                                            style={{
                                                background: isActive ? '#fff' : 'rgba(255,255,255,0.06)',
                                                color: isActive ? '#0A0A0A' : 'rgba(255,255,255,0.4)',
                                                border: isActive ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                            }}
                                        >
                                            {day.label}
                                        </button>
                                    )
                                })}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setForm({ ...form, reminder_days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] })}
                                    className="px-3 py-1.5 rounded-lg text-xs"
                                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >SEMAINE</button>
                                <button
                                    onClick={() => setForm({ ...form, reminder_days: ['saturday', 'sunday'] })}
                                    className="px-3 py-1.5 rounded-lg text-xs"
                                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >WEEK-END</button>
                                <button
                                    onClick={() => setForm({ ...form, reminder_days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] })}
                                    className="px-3 py-1.5 rounded-lg text-xs"
                                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >TOUS</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* HABIT TYPE */}
                <div className="flex flex-col gap-3 mb-8">
                    <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>HABIT TYPE</p>
                    <div
                        className="flex rounded-2xl p-1"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        {['build', 'quit'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setForm({ ...form, habit_type: t })}
                                className="flex-1 py-3 rounded-xl text-xs font-medium transition-all"
                                style={{
                                    background: form.habit_type === t ? '#fff' : 'transparent',
                                    color: form.habit_type === t ? '#0A0A0A' : 'rgba(255,255,255,0.4)',
                                    letterSpacing: '2px',
                                }}
                            >
                                {t === 'build' ? 'BUILD' : 'QUIT'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* NOTES */}
                <div className="flex flex-col gap-3 mb-4">
                    <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>NOTES</p>
                    <textarea
                        value={form.notes}
                        onChange={e => setForm({ ...form, notes: e.target.value })}
                        rows={3}
                        className="w-full p-4 rounded-2xl text-sm outline-none bg-transparent resize-none"
                        style={{
                            color: '#fff',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                        placeholder="Ajoute une note..."
                        onFocus={e => e.target.style.borderColor = '#C0C0C0'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                </div>

            </div>

            {/* Sticky footer */}
            <div
                className="relative z-10 sticky bottom-0 px-6 py-4 max-w-lg mx-auto w-full"
                style={{ background: 'linear-gradient(to top, #0A0A0A 80%, transparent)' }}
            >
                <button
                    onClick={handleSave}
                    disabled={saving || !form.label.trim()}
                    className="w-full py-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2"
                    style={{
                        background: form.label.trim() ? '#fff' : 'rgba(255,255,255,0.1)',
                        color: form.label.trim() ? '#0A0A0A' : 'rgba(255,255,255,0.2)',
                        letterSpacing: '3px',
                        cursor: form.label.trim() && !saving ? 'pointer' : 'not-allowed',
                    }}
                >
                    {saving
                        ? <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        : 'CRÉER L\'HABITUDE'
                    }
                </button>
            </div>

        </div>
    )
}