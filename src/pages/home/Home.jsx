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

    const toggleDone = (id) =>
        setDone(prev => prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id])

    useEffect(() => {
        const init = async () => {
            const u = await getUser()
            if (!u) { navigate('/auth'); return }
            setUser(u)
            const { data } = await supabase
                .from('habits')
                .select('*')
                .eq('user_id', u.id)
            setHabits(data || [])
            setLoading(false)
        }
        init()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen" style={{ background: '#F5F7FF' }}>
                <div
                    className="w-8 h-8 rounded-full border-4 animate-spin"
                    style={{ borderColor: '#3A81C2', borderTopColor: 'transparent' }}
                />
            </div>
        )
    }

    return (
        <div className="min-h-screen" style={{ background: '#F5F7FF' }}>

            <BottomNav />

            {/* Contenu — plein écran mobile, décalé desktop */}
            <div className="lg:ml-64">
                <div className="flex flex-col gap-5 pb-28 lg:pb-10 lg:max-w-3xl lg:mx-auto lg:px-8 lg:pt-8">
                    <Header user={user} />
                    <CalendarStrip />
                    <ProgressBanner completed={done.length} total={habits.length} />
                    <ChallengeSection />
                    <HabitList
                        habits={habits}
                        done={done}
                        onToggle={toggleDone}
                    />
                </div>
            </div>

        </div>
    )
}