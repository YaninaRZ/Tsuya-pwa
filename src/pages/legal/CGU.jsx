import { useNavigate } from 'react-router-dom'

export default function CGU() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen w-full relative overflow-hidden" style={{ background: '#0A0A0A' }}>

            {/* Image fond */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://i.pinimg.com/736x/21/6c/28/216c28b9ec628712cda1738220b77dab.jpg"
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
                            CONDITIONS D'UTILISATION
                        </h1>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 overflow-y-auto flex flex-col gap-6" style={{ maxHeight: '70vh' }}>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
                            DERNIÈRE MISE À JOUR : AVRIL 2026
                        </p>

                        {[
                            { title: '1. Acceptation des conditions', content: `En accédant et en utilisant l'application Tsuya, vous acceptez d'être lié par ces Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.` },
                            { title: '2. Description du service', content: `Tsuya est une application de suivi d'habitudes gamifiée qui permet aux utilisateurs de créer, suivre et gamifier leurs habitudes quotidiennes. L'application propose un système de points d'expérience (XP), de niveaux et de récompenses pour motiver les utilisateurs.` },
                            { title: '3. Création de compte', content: `Pour utiliser Tsuya, vous devez créer un compte en fournissant une adresse email valide et un mot de passe sécurisé. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte.` },
                            { title: '4. Utilisation acceptable', content: `Vous vous engagez à utiliser Tsuya uniquement à des fins légales et conformément à ces conditions. Il est interdit d'utiliser l'application pour des activités frauduleuses, nuisibles ou illégales.` },
                            { title: '5. Propriété intellectuelle', content: `Tout le contenu de Tsuya (textes, graphiques, logos, icônes) est la propriété de Tsuya et est protégé par les lois sur la propriété intellectuelle. Toute reproduction sans autorisation est interdite.` },
                            { title: '6. Limitation de responsabilité', content: `Tsuya est fourni "tel quel" sans garantie d'aucune sorte. Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser l'application.` },
                            { title: '7. Modification des conditions', content: `Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication. Il vous appartient de consulter régulièrement ces conditions.` },
                            { title: '8. Contact', content: `Pour toute question concernant ces conditions, contactez-nous à : support@tsuya.app` },
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