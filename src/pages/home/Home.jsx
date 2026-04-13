import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import Header from '@/components/home/Header'
import CalendarStrip from '@/components/home/CalendarStrip'
import HabitList from '@/components/home/HabitList'
import BottomNav from '@/components/home/BottomNav'
import ProgressBanner from '@/components/home/ProgressBanner'
import ChallengeSection from '@/components/home/ChallengeSection'

export default function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [habits, setHabits] = useState([])
    const [loading, setLoading] = useState(true)
    const [done, setDone] = useState([])
    const [toast, setToast] = useState(null)

    const toggleDone = (id) =>
        setDone(prev => prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id])

    useEffect(() => {
        const success = localStorage.getItem('calendar_success')
        if (success) {
            setToast(success)
            localStorage.removeItem('calendar_success')
            setTimeout(() => setToast(null), 4000)
        }
    }, [])

    useEffect(() => {
        const init = async () => {
            const u = await getUser()
            if (!u) { navigate('/auth'); return }
            setUser(u)
            const { data } = await supabase.from('habits').select('*').eq('user_id', u.id)
            setHabits(data || [])
            setLoading(false)
        }
        init()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen" style={{ background: '#111111' }}>
                <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: '#C0C0C0', borderTopColor: 'transparent' }} />
            </div>
        )
    }

    return (
        <div className="min-h-screen relative" style={{ background: '#111111' }}>
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
            <BottomNav />
            <div className="lg:ml-64">
                <div className="flex flex-col gap-6 pb-28 lg:pb-10 lg:max-w-3xl lg:mx-auto lg:px-8 lg:pt-8">
                    <Header user={user} />
                    <CalendarStrip />
                    <ProgressBanner completed={done.length} total={habits.length} />
                    <ChallengeSection />
                    <HabitList habits={habits} done={done} onToggle={toggleDone} />
                </div>
            </div>
        </div>
    )
}