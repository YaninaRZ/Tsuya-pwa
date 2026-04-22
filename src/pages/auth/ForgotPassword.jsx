import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetPassword } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async () => {
        if (!email) return
        setLoading(true)
        setError(null)
        const { error } = await resetPassword(email)
        if (error) { setError(error.message); setLoading(false); return }
        setSent(true)
        setLoading(false)
    }

    return (
        <div className="flex w-full overflow-hidden relative" style={{ height: '100vh', background: '#0A0A0A' }}>
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '150px', opacity: 0.3 }}
            />

            <div className="relative z-10 w-full flex items-center justify-center px-8">
                <div className="w-full max-w-sm flex flex-col gap-6">

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate('/auth')}
                        className="self-start rounded-xl"
                    >
                        ←
                    </Button>

                    {!sent ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                    MOT DE PASSE OUBLIÉ
                                </h2>
                                <p className="text-xs text-white/30 tracking-wider">
                                    ENTRE TON EMAIL POUR RECEVOIR UN LIEN
                                </p>
                            </div>

                            {error && (
                                <div className="px-4 py-3 rounded-xl text-xs tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                                    {error.toUpperCase()}
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    placeholder="ton@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={!email || loading}
                                size="lg"
                                className="w-full tracking-[3px]"
                            >
                                {loading
                                    ? <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                                    : 'ENVOYER LE LIEN'
                                }
                            </Button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-6 py-8">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl bg-white/05 border border-white/10">
                                📧
                            </div>
                            <div className="text-center flex flex-col gap-2">
                                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                    EMAIL ENVOYÉ
                                </h2>
                                <p className="text-xs text-white/30 tracking-wider">
                                    VÉRIFIE <span className="text-[#C0C0C0]">{email}</span>
                                </p>
                            </div>
                            <Button onClick={() => navigate('/auth')} size="lg" className="w-full tracking-[3px]">
                                RETOUR À LA CONNEXION
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
