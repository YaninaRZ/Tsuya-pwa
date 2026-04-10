import { useNavigate } from 'react-router-dom'

export default function PrivacyPolicy() {
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
                            Politique de Confidentialité
                        </h1>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 overflow-y-auto flex flex-col gap-6" style={{ maxHeight: '80vh' }}>

                        <p className="text-xs" style={{ color: '#aaa' }}>
                            Dernière mise à jour : avril 2026
                        </p>

                        {[
                            {
                                title: '1. Données collectées',
                                content: `Nous collectons les données suivantes : nom, adresse email, genre, habitudes sélectionnées, progression et statistiques d'utilisation. Ces données sont nécessaires au fonctionnement de l'application.`
                            },
                            {
                                title: '2. Utilisation des données',
                                content: `Vos données sont utilisées pour : personnaliser votre expérience, calculer votre progression et vos points XP, améliorer nos services et vous envoyer des notifications relatives à votre compte.`
                            },
                            {
                                title: '3. Stockage et sécurité',
                                content: `Vos données sont stockées de manière sécurisée via Supabase, hébergé sur des serveurs conformes au RGPD. Nous utilisons le chiffrement SSL pour toutes les transmissions de données.`
                            },
                            {
                                title: '4. Partage des données',
                                content: `Nous ne vendons, n'échangeons ni ne transférons vos données personnelles à des tiers sans votre consentement, sauf obligation légale. Nos prestataires techniques (Supabase) accèdent aux données uniquement pour fournir leurs services.`
                            },
                            {
                                title: '5. Cookies et tracking',
                                content: `Tsuya utilise le stockage local (localStorage) pour maintenir votre session. Nous n'utilisons pas de cookies publicitaires ou de tracking tiers.`
                            },
                            {
                                title: '6. Vos droits (RGPD)',
                                content: `Conformément au RGPD, vous disposez des droits suivants : accès à vos données, rectification, suppression, portabilité et opposition au traitement. Pour exercer ces droits, contactez-nous à privacy@tsuya.app`
                            },
                            {
                                title: '7. Suppression du compte',
                                content: `Vous pouvez supprimer votre compte à tout moment depuis les paramètres de l'application. La suppression entraîne l'effacement définitif de toutes vos données personnelles.`
                            },
                            {
                                title: '8. Contact',
                                content: `Pour toute question relative à la protection de vos données : privacy@tsuya.app`
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