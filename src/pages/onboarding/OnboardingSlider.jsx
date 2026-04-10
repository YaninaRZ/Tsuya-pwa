import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'

const slides = [
    {
        id: 0,
        title: 'CRÉE DE\nBONNES\nHABITUDES',
        desc: 'Change ta vie en ajoutant progressivement de nouvelles habitudes saines.',
        image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&q=80',
    },
    {
        id: 1,
        title: 'SUIS TA\nPROGRESSION',
        desc: 'Chaque jour tu te rapproches un peu plus de ton objectif. Lâche rien.',
        image: 'https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=1200&q=80',
    },
    {
        id: 2,
        title: 'RESTE FORT\nENSEMBLE',
        desc: 'Rejoins des challenges avec tes amis et motivez-vous mutuellement.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    },
]

export default function OnboardingSlider() {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)
    const touchStartX = useRef(null)

    const next = () => {
        if (current < slides.length - 1) setCurrent(current + 1)
        else navigate('/auth')
    }

    const prev = () => { if (current > 0) setCurrent(current - 1) }

    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (diff > 50) next()
        if (diff < -50) prev()
        touchStartX.current = null
    }

    const slide = slides[current]

    return (
        <div
            className="flex min-h-screen w-full relative overflow-hidden"
            style={{ background: '#0A0A0A' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Image plein écran */}
            <div className="absolute inset-0 z-0">
                <img
                    key={current}
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    style={{
                        opacity: 0.55,
                        filter: 'contrast(1.1) saturate(0.7) grayscale(0.15)',
                        animation: 'fadeImg 0.6s ease',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.98) 60%)' }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(180,100,200,0.06) 0%, rgba(100,130,255,0.06) 100%)' }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '150px',
                        opacity: 0.35,
                    }}
                />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row w-full">
                <div className="flex-1 lg:hidden" />
                <div className="hidden lg:flex lg:w-1/2 lg:ml-auto" />

                {/* Contenu */}
                <div className="w-full lg:w-1/2 flex flex-col justify-end lg:justify-center px-8 lg:px-16 pb-12 lg:py-16 gap-6">

                    {/* Header */}
                    <span
                        className="text-xs font-bold"
                        style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '5px', fontFamily: 'Georgia, serif' }}
                    >
                        TSUYA
                    </span>

                    {/* Titre animé */}
                    <div key={current} style={{ animation: 'fadeUp 0.4s ease' }}>
                        <h2
                            className="text-4xl lg:text-6xl font-bold text-white leading-none"
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            {slide.title.split('\n').map((line, i) => (
                                <span key={i} className="block">{line}</span>
                            ))}
                        </h2>
                        <p className="text-sm mt-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3px' }}>
                            {slide.desc}
                        </p>
                    </div>

                    {/* Progress lines */}
                    <div className="flex gap-1.5">
                        {slides.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setCurrent(i)}
                                style={{
                                    height: 2,
                                    flex: i === current ? 3 : 1,
                                    background: i === current ? '#C0C0C0' : 'rgba(255,255,255,0.15)',
                                    transition: 'all 0.4s',
                                    cursor: 'pointer',
                                    borderRadius: 99,
                                }}
                            />
                        ))}
                    </div>

                    {/* Bouton continuer */}
                    <button
                        onClick={next}
                        className="w-full py-4 rounded-2xl text-xs font-semibold"
                        style={{
                            background: '#fff',
                            color: '#0A0A0A',
                            letterSpacing: '4px',
                        }}
                    >
                        {current < slides.length - 1 ? 'CONTINUER' : 'COMMENCER'}
                    </button>

                    {/* Boutons sociaux */}
                    <div className="flex gap-2">
                        {[
                            { label: 'APPLE', icon: '🍎' },
                            { label: 'GOOGLE', icon: 'G' },
                            { label: 'FACEBOOK', icon: 'f' },
                        ].map((s) => (
                            <button
                                key={s.label}
                                className="flex-1 py-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5"
                                style={{
                                    background: 'transparent',
                                    color: 'rgba(255,255,255,0.4)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    letterSpacing: '1px',
                                }}
                            >
                                <span>{s.icon}</span>
                                <span className="hidden sm:inline">{s.label}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate('/auth')}
                        className="text-xs text-center"
                        style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '2px' }}
                    >
                        PASSER
                    </button>

                </div>
            </div>

            <style>{`
        @keyframes fadeImg {
          from { opacity: 0; }
          to { opacity: 0.55; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    )
}