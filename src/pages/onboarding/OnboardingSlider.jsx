import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import StepIndicator from '@/components/onboarding/StepIndicator'
import SocialButtons from '@/components/onboarding/SocialButtons'
import HabitCard from '@/components/onboarding/HabitCard'
import ChallengeCard from '@/components/onboarding/ChallengeCard'
import HabitRow from '@/components/onboarding/HabitRow'

const slides = [
    {
        id: 0,
        title: 'Crée de\nbonnes habitudes',
        desc: 'Change ta vie en ajoutant progressivement de nouvelles habitudes saines.',
    },
    {
        id: 1,
        title: 'Suis ta\nprogression',
        desc: 'Chaque jour tu te rapproches un peu plus de ton objectif. Lâche rien !',
    },
    {
        id: 2,
        title: 'Reste fort\nensemble',
        desc: 'Rejoins des challenges avec tes amis et motivez-vous mutuellement.',
    },
]

const habits = [
    { icon: '💧', name: 'Drink the water', progress: '500/2000 ML', done: false },
    { icon: '🚶', name: 'Walk', progress: '0/10000 STEPS', done: false },
    { icon: '🧘', name: 'Meditate', progress: '30/30 MIN', done: true },
]

function Illustration({ index }) {
    if (index === 0) return (
        <div className="relative w-full max-w-sm h-80 lg:h-96 mt-12 lg:mt-0">
            <div className="absolute top-0 right-0"><HabitCard /></div>
            <div className="absolute top-28 left-0"><HabitCard /></div>
            <div className="absolute bottom-0 right-8"><HabitCard /></div>
        </div>
    )
    if (index === 1) return (
        <div className="flex flex-col gap-3 w-full max-w-sm mt-12 lg:mt-0">
            <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>Challenges</p>
            <ChallengeCard />
            <p className="text-xs font-semibold mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Habits</p>
            {habits.map((h) => <HabitRow key={h.name} {...h} />)}
        </div>
    )
    if (index === 2) return (
        <div className="relative w-full max-w-sm h-80 lg:h-96 mt-12 lg:mt-0 flex items-center justify-center">
            <div
                className="w-48 h-48 rounded-full flex items-center justify-center text-6xl"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
                🏆
            </div>
        </div>
    )
}

export default function OnboardingSlider() {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)
    const touchStartX = useRef(null)

    const next = () => {
        if (current < slides.length - 1) setCurrent(current + 1)
        else navigate('/auth')
    }

    const prev = () => {
        if (current > 0) setCurrent(current - 1)
    }

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX
    }

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
            className="flex min-h-screen w-full"
            style={{ background: 'linear-gradient(160deg, #1A4B8C 0%, #3A81C2 100%)' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="flex flex-col lg:flex-row w-full">

                {/* Colonne gauche — illustration */}
                <div className="flex-1 lg:w-1/2 relative min-h-64 lg:min-h-screen flex items-center justify-center p-8">
                    <button
                        onClick={() => navigate('/auth')}
                        className="absolute top-6 right-6 text-sm font-medium lg:hidden z-20"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                        Passer
                    </button>

                    <div
                        key={current}
                        style={{ animation: 'fadeIn 0.3s ease' }}
                        className="w-full flex items-center justify-center"
                    >
                        <Illustration index={current} />
                    </div>
                </div>

                {/* Colonne droite — texte + boutons */}
                <div className="lg:w-1/2 flex flex-col justify-end lg:justify-center px-8 lg:px-16 pb-10 lg:py-16 gap-5">

                    <button
                        onClick={() => navigate('/auth')}
                        className="hidden lg:block text-sm font-medium self-end mb-4"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                        Passer
                    </button>

                    <div
                        key={current}
                        style={{ animation: 'fadeIn 0.3s ease' }}
                        className="flex flex-col gap-3"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                            {slide.title.split('\n').map((line, i) => (
                                <span key={i}>{line}{i === 0 && <br />}</span>
                            ))}
                        </h2>
                        <p className="text-sm lg:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            {slide.desc}
                        </p>
                    </div>

                    <StepIndicator
                        total={slides.length}
                        current={current}
                        onChange={setCurrent}
                    />

                    <button
                        onClick={next}
                        className="w-full py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2"
                        style={{ background: '#fff', color: '#1A4B8C' }}
                    >
                        {current < slides.length - 1 ? <><span>→</span> Continuer</> : <><span>→</span> Commencer</>}
                    </button>

                    <SocialButtons />

                    <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        En continuant vous acceptez les CGU & Politique de confidentialité
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
        </div>
    )
}