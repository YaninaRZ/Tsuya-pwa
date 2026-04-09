import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, signOut } from '@/lib/auth'

export default function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            const u = await getUser()
            if (!u) {
                navigate('/auth')
                return
            }
            setUser(u)
            setLoading(false)
        }
        checkUser()
    }, [])

    const handleSignOut = async () => {
        await signOut()
        navigate('/onboarding')
    }

    if (loading) {
        return (
            <div
                className="flex items-center justify-center min-h-screen"
                style={{ background: 'linear-gradient(160deg, #1A4B8C 0%, #3A81C2 100%)' }}
            >
                <div className="w-8 h-8 rounded-full border-4 border-white border-t-transparent animate-spin" />
            </div>
        )
    }

    return (
        <div
            className="flex min-h-screen w-full"
            style={{ background: 'linear-gradient(160deg, #1A4B8C 0%, #3A81C2 100%)' }}
        >
            <div className="w-full flex items-center justify-center p-6 lg:p-16">
                <div
                    className="w-full max-w-md rounded-3xl p-8 flex flex-col gap-6"
                    style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                >

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#E8F4F8' }}>
                                <img src="/pwa-192x192.png" alt="Tsuya" className="w-8 h-8 object-contain" />
                            </div>
                            <span className="text-lg font-bold" style={{ color: '#1A4B8C' }}>Tsuya</span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 rounded-xl text-sm font-medium"
                            style={{ background: '#F5F5F5', color: '#888' }}
                        >
                            Déconnexion
                        </button>
                    </div>

                    {/* Statut connexion */}
                    <div
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                        style={{ background: '#EDF5E8' }}
                    >
                        <div className="w-2 h-2 rounded-full" style={{ background: '#2E7D4F' }} />
                        <span className="text-sm font-medium" style={{ color: '#2E7D4F' }}>
                            Connexion réussie ✓
                        </span>
                    </div>

                    {/* Welcome */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold" style={{ color: '#1A1A2E' }}>
                            Bienvenue 👋
                        </h1>
                        <p className="text-base" style={{ color: '#888' }}>
                            {user?.user_metadata?.name
                                ? `Content de te revoir, ${user.user_metadata.name} !`
                                : `Content de te revoir !`
                            }
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#bbb' }}>
                            {user?.email}
                        </p>
                    </div>

                    {/* Infos user */}
                    <div className="flex flex-col gap-3">
                        <div
                            className="flex items-center justify-between px-4 py-3 rounded-2xl"
                            style={{ background: '#F5F5F5' }}
                        >
                            <span className="text-sm" style={{ color: '#888' }}>Email</span>
                            <span className="text-sm font-medium" style={{ color: '#1A1A2E' }}>{user?.email}</span>
                        </div>
                        <div
                            className="flex items-center justify-between px-4 py-3 rounded-2xl"
                            style={{ background: '#F5F5F5' }}
                        >
                            <span className="text-sm" style={{ color: '#888' }}>Membre depuis</span>
                            <span className="text-sm font-medium" style={{ color: '#1A1A2E' }}>
                                {new Date(user?.created_at).toLocaleDateString('fr-FR')}
                            </span>
                        </div>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={() => navigate('/setup/habits')}
                        className="w-full py-4 rounded-2xl text-base font-semibold text-white"
                        style={{ background: 'linear-gradient(135deg, #1A4B8C, #3A81C2)' }}
                    >
                        Voir mes habitudes 🎯
                    </button>

                </div>
            </div>
        </div>
    )
}