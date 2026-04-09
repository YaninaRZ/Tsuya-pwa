import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '@/lib/auth'

const AppleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
)

const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
)

const FacebookIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
)

function Input({ label, type = 'text', placeholder, value, onChange }) {

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: '#444' }}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
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
    )
}

export default function Auth() {
    const navigate = useNavigate()
    const [tab, setTab] = useState('login')
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

    const handleSubmit = async () => {
        setError(null)
        setLoading(true)

        if (tab === 'login') {
            const { error } = await signIn({
                email: form.email,
                password: form.password,
            })
            if (error) {
                setError(error.message)
                setLoading(false)
                return
            }
            navigate('/home')

        } else {
            const { error } = await signUp({
                name: form.name,
                email: form.email,
                password: form.password,
            })
            if (error) {
                setError(error.message)
                setLoading(false)
                return
            }
            navigate('/setup/gender')
        }

        setLoading(false)
    }

    return (
        <div
            className="flex w-full overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #1A4B8C 0%, #3A81C2 100%)', height: '100vh' }}
        >
            <div className="flex flex-col lg:flex-row w-full h-full">

                {/* Colonne gauche — branding desktop */}
                <div className="hidden lg:flex lg:w-1/2 h-full flex-col items-center justify-center gap-8 p-16">
                    <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center">
                        <img src="/pwa-192x192.png" alt="Tsuya" className="w-12 h-12 object-contain" />
                    </div>
                    <div className="text-center flex flex-col gap-3">
                        <h1 className="text-4xl font-bold text-white">Tsuya</h1>
                        <p className="text-base" style={{ color: '#8CC5E8' }}>
                            Construis des habitudes.<br />Gagne des récompenses.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {['🔥 Streaks', '⭐ XP', '🏆 Niveaux'].map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1.5 rounded-full text-xs font-medium"
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    color: '#fff',
                                    border: '1px solid rgba(255,255,255,0.25)',
                                    backdropFilter: 'blur(12px)',
                                }}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Colonne droite — formulaire */}
                <div className="w-full lg:w-1/2 h-full flex items-center justify-center lg:p-16">
                    <div
                        className="w-full lg:max-w-md lg:rounded-3xl p-8 flex flex-col gap-5 h-full lg:h-auto justify-center"
                        style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                    >

                        {/* Logo mobile */}
                        <div className="flex lg:hidden items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: '#E8F4F8' }}>
                                <img src="/pwa-192x192.png" alt="Tsuya" className="w-6 h-6 object-contain" />
                            </div>
                            <span className="text-lg font-bold" style={{ color: '#1A4B8C' }}>Tsuya</span>
                        </div>

                        {/* Tabs */}
                        <div className="flex rounded-2xl p-1" style={{ background: '#F5F5F5' }}>
                            {['login', 'register'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => { setTab(t); setError(null) }}
                                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                                    style={{
                                        background: tab === t ? '#fff' : 'transparent',
                                        color: tab === t ? '#1A4B8C' : '#888',
                                        boxShadow: tab === t ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                                    }}
                                >
                                    {t === 'login' ? 'Connexion' : 'Inscription'}
                                </button>
                            ))}
                        </div>

                        {/* Titre */}
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>
                                {tab === 'login' ? 'Bon retour 👋' : 'Créer un compte 🚀'}
                            </h2>
                            <p className="text-sm" style={{ color: '#888' }}>
                                {tab === 'login'
                                    ? 'Connecte-toi pour continuer ta progression'
                                    : 'Rejoins Tsuya et commence ton aventure'}
                            </p>
                        </div>

                        {/* Erreur */}
                        {error && (
                            <div
                                className="px-4 py-3 rounded-xl text-sm"
                                style={{ background: '#FEE2E2', color: '#DC2626' }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Champs */}
                        <div className="flex flex-col gap-4">
                            <div style={{
                                overflow: 'hidden',
                                maxHeight: tab === 'register' ? 80 : 0,
                                opacity: tab === 'register' ? 1 : 0,
                                transition: 'max-height 0.3s ease, opacity 0.3s ease',
                            }}>
                                <Input label="Nom" placeholder="Ton prénom" value={form.name} onChange={update('name')} />
                            </div>
                            <Input label="Email" type="email" placeholder="ton@email.com" value={form.email} onChange={update('email')} />
                            <Input label="Mot de passe" type="password" placeholder="••••••••" value={form.password} onChange={update('password')} />
                            {tab === 'login' && (
                                <button className="text-xs self-end" style={{ color: '#3A81C2' }}>
                                    Mot de passe oublié ?
                                </button>
                            )}
                        </div>

                        {/* Bouton principal */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-4 rounded-2xl text-base font-semibold text-white flex items-center justify-center gap-2"
                            style={{
                                background: loading ? '#93b5d8' : 'linear-gradient(135deg, #1A4B8C, #3A81C2)',
                                cursor: loading ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {loading ? (
                                <>
                                    <div
                                        className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"
                                    />
                                    Chargement...
                                </>
                            ) : (
                                tab === 'login' ? 'Se connecter' : "S'inscrire"
                            )}
                        </button>

                        {/* Séparateur */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px" style={{ background: '#e5e7eb' }} />
                            <span className="text-xs" style={{ color: '#aaa' }}>ou continuer avec</span>
                            <div className="flex-1 h-px" style={{ background: '#e5e7eb' }} />
                        </div>

                        {/* Boutons sociaux */}
                        <div className="flex gap-3">
                            {[
                                { label: 'Apple', Icon: AppleIcon },
                                { label: 'Google', Icon: GoogleIcon },
                                { label: 'Facebook', Icon: FacebookIcon },
                            ].map(({ label, Icon }) => (
                                <button
                                    key={label}
                                    className="flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 border"
                                    style={{ background: '#fff', color: '#333', borderColor: '#e5e7eb' }}
                                >
                                    <Icon /> <span>{label}</span>
                                </button>
                            ))}
                        </div>

                        <p className="text-center text-xs" style={{ color: '#bbb' }}>
                            En continuant vous acceptez les{' '}
                            <span style={{ color: '#3A81C2', cursor: 'pointer' }}>CGU</span>
                            {' '}&{' '}
                            <span style={{ color: '#3A81C2', cursor: 'pointer' }}>Politique de confidentialité</span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}