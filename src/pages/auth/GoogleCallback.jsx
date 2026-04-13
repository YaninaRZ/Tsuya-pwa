import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addHabitToCalendar } from '@/lib/googleCalendar'
import { supabase } from '@/lib/supabase'

export default function GoogleCallback() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const called = useRef(false)

    useEffect(() => {
        if (called.current) return
        called.current = true

        const handleCallback = async () => {
            const code = searchParams.get('code')
            const habitId = searchParams.get('state')

            if (!code) { navigate('/home'); return }

            const tokenRes = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-calendar`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                    },
                    body: JSON.stringify({
                        code,
                        redirectUri: `${window.location.origin}/auth/google/callback`,
                    }),
                }
            )

            const { access_token, error } = await tokenRes.json()
            console.log('access_token:', access_token)
            console.log('error:', error)

            if (error) {
                console.error('Google OAuth error:', error)
                window.history.replaceState({}, '', '/home')
                navigate('/home')
                return
            }

            if (access_token && habitId) {
                const { data: habit } = await supabase
                    .from('habits')
                    .select('*')
                    .eq('id', habitId)
                    .single()

                if (habit) {
                    const result = await addHabitToCalendar(access_token, habit)
                    console.log('Calendar result:', result)
                    if (result.id) {
                        localStorage.setItem('calendar_success', habit.label)
                    }
                }
            }

            window.history.replaceState({}, '', '/home')
            navigate('/home')
        }

        handleCallback()
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ background: '#0A0A0A' }}>
            <div className="flex flex-col items-center gap-4">
                <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: '#C0C0C0', borderTopColor: 'transparent' }} />
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>
                    CONNEXION GOOGLE CALENDAR...
                </p>
            </div>
        </div>
    )
}