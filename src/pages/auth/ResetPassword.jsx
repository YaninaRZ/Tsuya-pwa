import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function ResetPassword() {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async () => {
        if (password.length < 6) {
            setError('Le mot de passe doit faire au moins 6 caractères')
            return
        }
        setLoading(true)
        const { error } = await supabase.auth.updateUser({ password })
        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }
        navigate('/home')
    }

    return (
        <div
            className="flex w-full overflow-hidden"
            style={{ height: '100vh', background: 'linear-gradient(160deg, #1A4B8C 0%, #3A81C2 100%)' }}
        >
            <div className="w-full flex items-center justify-center lg:p-16">
                <div
                    className="w-full lg:max-w-md lg:rounded-3xl p-8 flex flex-col gap-6 h-full lg:h-auto justify-center"
                    style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                >
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>
                            Nouveau mot de passe 🔒
                        </h2>
                        <p className="text-sm" style={{ color: '#888' }}>
                            Choisis un nouveau mot de passe sécurisé.
                        </p>
                    </div>

                    {error && (
                        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium" style={{ color: '#444' }}>Nouveau mot de passe</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{
                                background: '#F5F5F5',
                                border: '1px solid transparent',
                                color: '#1A1A2E',
                            }}
                            onFocus={e => e.target.style.borderColor = '#3A81C2'}
                            onBlur={e => e.target.style.borderColor = 'transparent'}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!password || loading}
                        className="w-full py-4 rounded-2xl text-base font-semibold text-white flex items-center justify-center gap-2"
                        style={{
                            background: password ? 'linear-gradient(135deg, #1A4B8C, #3A81C2)' : '#e5e7eb',
                            color: password ? '#fff' : '#aaa',
                        }}
                    >
                        {loading ? (
                            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        ) : 'Mettre à jour'}
                    </button>
                </div>
            </div>
        </div>
    )
}