import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetPassword } from '@/lib/auth'

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
        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }
        setSent(true)
        setLoading(false)
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

                    {/* Bouton retour */}
                    <button
                        onClick={() => navigate('/auth')}
                        className="w-9 h-9 rounded-xl flex items-center justify-center self-start"
                        style={{ background: '#F5F5F5', border: '1px solid #e5e7eb' }}
                    >
                        ←
                    </button>

                    {!sent ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>
                                    Mot de passe oublié 🔑
                                </h2>
                                <p className="text-sm" style={{ color: '#888' }}>
                                    Entre ton email et on t'envoie un lien de réinitialisation.
                                </p>
                            </div>

                            {error && (
                                <div className="px-4 py-3 rounded-xl text-sm" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium" style={{ color: '#444' }}>Email</label>
                                <input
                                    type="email"
                                    placeholder="ton@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                    style={{
                                        background: '#F5F5F5',
                                        border: '1px solid transparent',
                                        color: '#1A1A2E',
                                        transition: 'border 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#3A81C2'}
                                    onBlur={e => e.target.style.borderColor = 'transparent'}
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!email || loading}
                                className="w-full py-4 rounded-2xl text-base font-semibold text-white flex items-center justify-center gap-2"
                                style={{
                                    background: email ? 'linear-gradient(135deg, #1A4B8C, #3A81C2)' : '#e5e7eb',
                                    color: email ? '#fff' : '#aaa',
                                    cursor: email && !loading ? 'pointer' : 'not-allowed',
                                }}
                            >
                                {loading ? (
                                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                ) : 'Envoyer le lien'}
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Succès */}
                            <div className="flex flex-col items-center gap-6 py-8">
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                                    style={{ background: '#EDF5E8' }}
                                >
                                    📧
                                </div>
                                <div className="text-center flex flex-col gap-2">
                                    <h2 className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>
                                        Email envoyé !
                                    </h2>
                                    <p className="text-sm" style={{ color: '#888' }}>
                                        Vérifie ta boîte mail à <span style={{ color: '#3A81C2' }}>{email}</span> et clique sur le lien pour réinitialiser ton mot de passe.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/auth')}
                                    className="w-full py-4 rounded-2xl text-base font-semibold text-white"
                                    style={{ background: 'linear-gradient(135deg, #1A4B8C, #3A81C2)' }}
                                >
                                    Retour à la connexion
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}