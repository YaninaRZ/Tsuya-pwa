import { useNavigate } from 'react-router-dom'

export default function CGU() {
    const navigate = useNavigate()

    return (
        <div
            className="flex min-h-screen w-full"
            style={{ background: 'linear-gradient(160deg, #1A4B8C 0%, #3A81C2 100%)' }}
        >
            <div className="w-full flex items-center justify-center lg:p-16">
                <div
                    className="w-full lg:max-w-2xl lg:rounded-3xl flex flex-col h-full lg:h-auto"
                    style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                >
                    {/* Header */}
                    <div className="flex items-center gap-4 p-6 border-b" style={{ borderColor: '#e5e7eb' }}>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: '#F5F5F5', border: '1px solid #e5e7eb' }}
                        >
                            ←
                        </button>
                        <h1 className="text-xl font-bold" style={{ color: '#1A1A2E' }}>
                            Conditions Générales d'Utilisation
                        </h1>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 overflow-y-auto flex flex-col gap-6" style={{ maxHeight: '80vh' }}>

                        <p className="text-xs" style={{ color: '#aaa' }}>
                            Dernière mise à jour : avril 2026
                        </p>

                        {[
                            {
                                title: '1. Acceptation des conditions',
                                content: `En accédant et en utilisant l'application Tsuya, vous acceptez d'être lié par ces Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.`
                            },
                            {
                                title: '2. Description du service',
                                content: `Tsuya est une application de suivi d'habitudes gamifiée qui permet aux utilisateurs de créer, suivre et gamifier leurs habitudes quotidiennes. L'application propose un système de points d'expérience (XP), de niveaux et de récompenses pour motiver les utilisateurs.`
                            },
                            {
                                title: '3. Création de compte',
                                content: `Pour utiliser Tsuya, vous devez créer un compte en fournissant une adresse email valide et un mot de passe sécurisé. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte.`
                            },
                            {
                                title: '4. Utilisation acceptable',
                                content: `Vous vous engagez à utiliser Tsuya uniquement à des fins légales et conformément à ces conditions. Il est interdit d'utiliser l'application pour des activités frauduleuses, nuisibles ou illégales.`
                            },
                            {
                                title: '5. Propriété intellectuelle',
                                content: `Tout le contenu de Tsuya (textes, graphiques, logos, icônes) est la propriété de Tsuya et est protégé par les lois sur la propriété intellectuelle. Toute reproduction sans autorisation est interdite.`
                            },
                            {
                                title: '6. Limitation de responsabilité',
                                content: `Tsuya est fourni "tel quel" sans garantie d'aucune sorte. Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser l'application.`
                            },
                            {
                                title: '7. Modification des conditions',
                                content: `Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication. Il vous appartient de consulter régulièrement ces conditions.`
                            },
                            {
                                title: '8. Contact',
                                content: `Pour toute question concernant ces conditions, contactez-nous à : support@tsuya.app`
                            },
                        ].map((section) => (
                            <div key={section.title} className="flex flex-col gap-2">
                                <h2 className="text-base font-bold" style={{ color: '#1A1A2E' }}>
                                    {section.title}
                                </h2>
                                <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t" style={{ borderColor: '#e5e7eb' }}>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full py-4 rounded-2xl text-base font-semibold text-white"
                            style={{ background: 'linear-gradient(135deg, #1A4B8C, #3A81C2)' }}
                        >
                            J'ai compris
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}