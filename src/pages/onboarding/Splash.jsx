import { useNavigate } from 'react-router-dom'

export default function Splash() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden" style={{ background: '#0A0A0A' }}>

            {/* Image plein écran */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://i.pinimg.com/736x/8b/be/e9/8bbee9ced0bd13ba4188b6c77389858c.jpg"
                    alt="background"
                    className="w-full h-full object-cover"
                    style={{
                        opacity: 0.65,
                        filter: 'contrast(1.2) saturate(0.5) grayscale(0.3)',
                        objectPosition: 'top center',
                    }}
                />
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.98) 65%)'
                    }}
                />
                {/* Tint Y2K violet/rose subtil */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(180,100,200,0.07) 0%, rgba(100,130,255,0.07) 100%)' }}
                />
                {/* Grain effect */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '150px',
                        opacity: 0.4,
                    }}
                />
            </div>

            {/* Logo top */}
            <div className="relative z-10 flex justify-between items-center px-8 pt-12">
                <span
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: 'Georgia, serif', letterSpacing: '8px' }}
                >
                    TSUYA
                </span>

            </div>

            {/* Contenu bas */}
            <div className="relative z-10 flex-1 flex flex-col justify-end px-8 pb-12 gap-6">

                {/* Tag éditorial */}
                <div className="flex items-center gap-3">
                    <div className="h-px w-8" style={{ background: '#B4A8E8' }} />
                    <span className="text-xs" style={{ color: '##C0C0C0', letterSpacing: '3px' }}>
                        HABIT TRACKER
                    </span>
                </div>

                <div className="flex flex-col gap-4">
                    <h1
                        className="text-4xl lg:text-6xl font-bold text-white leading-none"
                        style={{ fontFamily: 'Georgia, serif' }}
                    >
                        BUILD.<br />TRACK.<br />WIN.
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, letterSpacing: '0.5px' }}>
                        Transforme tes habitudes en victoires quotidiennes.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/onboarding/slides')}
                        className="w-full py-4 text-sm font-semibold rounded-2xl"
                        style={{
                            background: '#fff',
                            color: '#0A0A0A',
                            letterSpacing: '3px',
                        }}
                    >
                        COMMENCER
                    </button>
                    <button
                        onClick={() => navigate('/auth')}
                        className="w-full py-4 text-sm font-medium rounded-2xl"
                        style={{
                            background: 'transparent',
                            color: 'rgba(255,255,255,0.5)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            letterSpacing: '3px',
                        }}
                    >
                        J'AI DÉJÀ UN COMPTE
                    </button>
                </div>


            </div>
        </div>
    )
}