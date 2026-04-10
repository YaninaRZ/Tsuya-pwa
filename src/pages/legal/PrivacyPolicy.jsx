import { useNavigate } from 'react-router-dom'

export default function PrivacyPolicy() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen w-full relative overflow-hidden" style={{ background: '#0A0A0A' }}>

            {/* Image fond */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://i.pinimg.com/1200x/52/16/0b/52160b9fe06a62eff491d28690627bdd.jpg"
                    alt="background"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.25, filter: 'contrast(1.1) saturate(0.7) grayscale(0.15)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.95) 60%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(180,100,200,0.04) 0%, rgba(100,130,255,0.04) 100%)' }} />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '150px',
                        opacity: 0.3,
                    }}
                />
            </div>

            <div className="relative z-10 w-full flex items-center justify-center lg:p-16">
                <div
                    className="w-full lg:max-w-2xl lg:rounded-3xl flex flex-col h-full lg:h-auto"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center gap-4 p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                        >
                            ←
                        </button>
                        <h1
                            className="text-lg font-bold text-white"
                            style={{ fontFamily: 'Georgia, serif', letterSpacing: '2px' }}
                        >
                            POLITIQUE DE CONFIDENTIALITÉ
                        </h1>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 overflow-y-auto flex flex-col gap-6" style={{ maxHeight: '70vh' }}>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
                            DERNIÈRE MISE À JOUR : AVRIL 2026
                        </p>

                        {[
                            { title: '1. Données collectées', content: `Nous collectons les données suivantes : nom, adresse email, genre, habitudes sélectionnées, progression et statistiques d'utilisation. Ces données sont nécessaires au fonctionnement de l'application.` },
                            { title: '2. Utilisation des données', content: `Vos données sont utilisées pour : personnaliser votre expérience, calculer votre progression et vos points XP, améliorer nos services et vous envoyer des notifications relatives à votre compte.` },
                            { title: '3. Stockage et sécurité', content: `Vos données sont stockées de manière sécurisée via Supabase, hébergé sur des serveurs conformes au RGPD. Nous utilisons le chiffrement SSL pour toutes les transmissions de données.` },
                            { title: '4. Partage des données', content: `Nous ne vendons, n'échangeons ni ne transférons vos données personnelles à des tiers sans votre consentement, sauf obligation légale. Nos prestataires techniques (Supabase) accèdent aux données uniquement pour fournir leurs services.` },
                            { title: '5. Cookies et tracking', content: `Tsuya utilise le stockage local (localStorage) pour maintenir votre session. Nous n'utilisons pas de cookies publicitaires ou de tracking tiers.` },
                            { title: '6. Vos droits (RGPD)', content: `Conformément au RGPD, vous disposez des droits suivants : accès à vos données, rectification, suppression, portabilité et opposition au traitement. Pour exercer ces droits, contactez-nous à privacy@tsuya.app` },
                            { title: '7. Suppression du compte', content: `Vous pouvez supprimer votre compte à tout moment depuis les paramètres de l'application. La suppression entraîne l'effacement définitif de toutes vos données personnelles.` },
                            { title: '8. Contact', content: `Pour toute question relative à la protection de vos données : privacy@tsuya.app` },
                        ].map((section) => (
                            <div key={section.title} className="flex flex-col gap-2">
                                <h2 className="text-sm font-bold text-white" style={{ letterSpacing: '1px' }}>
                                    {section.title.toUpperCase()}
                                </h2>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full py-4 rounded-2xl text-xs font-semibold text-black"
                            style={{ background: '#fff', letterSpacing: '3px' }}
                        >
                            J'AI COMPRIS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}