import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`

export default function ResetPassword() {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async () => {
        if (password.length < 6) { setError('Le mot de passe doit faire au moins 6 caractères'); return }
        setLoading(true)
        const { error } = await supabase.auth.updateUser({ password })
        if (error) { setError(error.message); setLoading(false); return }
        navigate('/home')
    }

    return (
        <div className="flex w-full overflow-hidden relative" style={{ height: '100vh', background: '#0A0A0A' }}>
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '150px', opacity: 0.3 }}
            />

            <div className="relative z-10 w-full flex items-center justify-center px-8">
                <div className="w-full max-w-sm flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                            NOUVEAU MOT DE PASSE
                        </h2>
                        <p className="text-xs text-white/30 tracking-wider">
                            CHOISIS UN MOT DE PASSE SÉCURISÉ
                        </p>
                    </div>

                    {error && (
                        <div className="px-4 py-3 rounded-xl text-xs tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                            {error.toUpperCase()}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <Label>Nouveau mot de passe</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={!password || loading}
                        size="lg"
                        className="w-full tracking-[3px]"
                    >
                        {loading
                            ? <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                            : 'METTRE À JOUR'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}
