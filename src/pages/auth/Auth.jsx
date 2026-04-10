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
        <div className="flex flex-col gap-2">
            <label className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>
                {label.toUpperCase()}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full py-3 text-sm outline-none bg-transparent"
                style={{
                    color: '#fff',
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                    transition: 'border 0.2s',
                }}
                onFocus={e => e.target.style.borderBottomColor = '#C0C0C0'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)'}
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
            const { error } = await signIn({ email: form.email, password: form.password })
            if (error) { setError(error.message); setLoading(false); return }
            navigate('/home')
        } else {
            const { error } = await signUp({ name: form.name, email: form.email, password: form.password })
            if (error) { setError(error.message); setLoading(false); return }
            navigate('/setup/gender')
        }
        setLoading(false)
    }

    return (
        <div
            className="flex w-full overflow-hidden relative"
            style={{ background: '#0A0A0A', height: '100vh' }}
        >
            {/* Grain */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '150px',
                    opacity: 0.3,
                }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row w-full h-full">

                {/* Colonne gauche — image desktop */}
                <div className="hidden lg:block lg:w-1/2 h-full relative overflow-hidden">
                    <img
                        src="https://i.pinimg.com/736x/8b/be/e9/8bbee9ced0bd13ba4188b6c77389858c.jpg"
                        alt="background"
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.65, filter: 'contrast(1.2) saturate(0.5) grayscale(0.3)' }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.1) 40%, #0A0A0A 100%), linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, transparent 30%)' }}
                    />
                    <div className="absolute bottom-16 left-12 flex flex-col gap-4">
                        <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif', letterSpacing: '6px' }}>
                            TSUYA
                        </span>
                        <div className="flex gap-2">
                            {['🔥 Streaks', '⭐ XP', '🏆 Niveaux'].map((item) => (
                                <span
                                    key={item}
                                    className="px-3 py-1 rounded-lg text-xs"
                                    style={{ color: '#C0C0C0', border: '1px solid rgba(192,192,192,0.3)', letterSpacing: '1px' }}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Colonne droite — formulaire */}
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 lg:px-16">

                    {/* Logo mobile */}
                    <div className="flex lg:hidden justify-between items-center mb-12">
                        <span className="text-lg font-bold text-white" style={{ fontFamily: 'Georgia, serif', letterSpacing: '6px' }}>
                            TSUYA
                        </span>
                        <span
                            className="text-xs px-2 py-1 rounded-lg"
                            style={{ color: '#C0C0C0', border: '1px solid rgba(192,192,192,0.3)', letterSpacing: '2px' }}
                        >
                            VOL. 01
                        </span>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-8 mb-10">
                        {['login', 'register'].map((t) => (
                            <button
                                key={t}
                                onClick={() => { setTab(t); setError(null) }}
                                className="text-sm font-medium pb-2 transition-all"
                                style={{
                                    color: tab === t ? '#fff' : 'rgba(255,255,255,0.3)',
                                    borderBottom: tab === t ? '1px solid #C0C0C0' : '1px solid transparent',
                                    letterSpacing: '2px',
                                }}
                            >
                                {t === 'login' ? 'CONNEXION' : 'INSCRIPTION'}
                            </button>
                        ))}
                    </div>

                    {/* Titre */}
                    <div className="flex flex-col gap-2 mb-8">
                        <h2 className="text-xl lg:text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                            {tab === 'login' ? 'BON RETOUR.' : 'CRÉER UN COMPTE.'}
                        </h2>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
                            {tab === 'login' ? 'CONNECTE-TOI POUR CONTINUER' : 'REJOINS TSUYA'}
                        </p>
                    </div>

                    {/* Erreur */}
                    {error && (
                        <div
                            className="px-4 py-3 mb-4 rounded-xl text-xs"
                            style={{ background: 'rgba(220,38,38,0.1)', color: '#f87171', border: '1px solid rgba(220,38,38,0.2)', letterSpacing: '1px' }}
                        >
                            {error.toUpperCase()}
                        </div>
                    )}

                    {/* Champs */}
                    <div className="flex flex-col gap-6 mb-8">
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
                            <button
                                onClick={() => navigate('/forgot-password')}
                                className="text-xs self-end"
                                style={{ color: '#C0C0C0', letterSpacing: '1px' }}
                            >
                                MOT DE PASSE OUBLIÉ ?
                            </button>
                        )}
                    </div>

                    {/* Bouton principal */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 mb-6"
                        style={{
                            background: loading ? 'rgba(255,255,255,0.5)' : '#fff',
                            color: '#0A0A0A',
                            letterSpacing: '3px',
                        }}
                    >
                        {loading ? (
                            <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        ) : (
                            tab === 'login' ? 'SE CONNECTER' : "S'INSCRIRE"
                        )}
                    </button>

                    {/* Séparateur */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '2px' }}>OU</span>
                        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                    </div>

                    {/* Boutons sociaux */}
                    <div className="flex gap-3 mb-8">
                        {[
                            { label: 'APPLE', Icon: AppleIcon },
                            { label: 'GOOGLE', Icon: GoogleIcon },
                            { label: 'FACEBOOK', Icon: FacebookIcon },
                        ].map(({ label, Icon }) => (
                            <button
                                key={label}
                                className="flex-1 py-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2"
                                style={{
                                    background: 'transparent',
                                    color: 'rgba(255,255,255,0.4)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    letterSpacing: '1px',
                                }}
                            >
                                <Icon />
                                <span className="hidden sm:inline">{label}</span>
                            </button>
                        ))}
                    </div>

                    <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.15)', letterSpacing: '1px' }}>
                        EN CONTINUANT VOUS ACCEPTEZ LES{' '}
                        <span onClick={() => navigate('/cgu')} style={{ color: '#C0C0C0', cursor: 'pointer' }}>CGU</span>
                        {' '}&{' '}
                        <span onClick={() => navigate('/privacy')} style={{ color: '#C0C0C0', cursor: 'pointer' }}>CONFIDENTIALITÉ</span>
                    </p>

                </div>
            </div>
        </div>
    )
}