import { useNavigate, useLocation } from 'react-router-dom'

const HomeIcon = ({ active }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#3A81C2' : '#aaa'}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
)
const HabitsIcon = ({ active }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#3A81C2' : '#aaa'}>
        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
    </svg>
)
const AddIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
)
const LeaderboardIcon = ({ active }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#3A81C2' : '#aaa'}>
        <path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z" />
    </svg>
)
const ProfileIcon = ({ active }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#3A81C2' : '#aaa'}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
)

const tabs = [
    { path: '/home', label: 'Accueil', Icon: HomeIcon },
    { path: '/habits', label: 'Habitudes', Icon: HabitsIcon },
    { path: '/create-habit', label: 'Ajouter', Icon: AddIcon, isAdd: true },
    { path: '/leaderboard', label: 'Activité', Icon: LeaderboardIcon },
    { path: '/profile', label: 'Profil', Icon: ProfileIcon },
]

export default function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <>
            {/* SIDEBAR — desktop */}
            <aside
                className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 py-8 px-4 gap-2 z-50"
                style={{ background: '#fff', borderRight: '1px solid #e5e7eb' }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-3 mb-8">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: '#E8F4F8' }}>
                        <img src="/pwa-192x192.png" alt="Tsuya" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="text-lg font-bold" style={{ color: '#1A4B8C' }}>Tsuya</span>
                </div>

                {/* Links */}
                {tabs.map(({ path, label, Icon, isAdd }) => {
                    const active = location.pathname === path
                    return (
                        <button
                            key={path}
                            onClick={() => navigate(path)}
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left"
                            style={{
                                background: isAdd
                                    ? 'linear-gradient(135deg, #1A4B8C, #3A81C2)'
                                    : active ? '#E8F4F8' : 'transparent',
                            }}
                        >
                            {isAdd ? (
                                <>
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <Icon />
                                    </div>
                                    <span className="text-sm font-semibold text-white">{label}</span>
                                </>
                            ) : (
                                <>
                                    <Icon active={active} />
                                    <span
                                        className="text-sm font-medium"
                                        style={{ color: active ? '#3A81C2' : '#666' }}
                                    >
                                        {label}
                                    </span>
                                </>
                            )}
                        </button>
                    )
                })}
            </aside>

            {/* BOTTOM NAV — mobile */}
            <nav
                className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around px-2 py-3 z-50"
                style={{
                    background: '#fff',
                    borderTop: '1px solid #e5e7eb',
                    boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
                }}
            >
                {tabs.map(({ path, label, Icon, isAdd }) => {
                    const active = location.pathname === path
                    return (
                        <button
                            key={path}
                            onClick={() => navigate(path)}
                            className="flex flex-col items-center gap-1 flex-1"
                        >
                            {isAdd ? (
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, #1A4B8C, #3A81C2)' }}
                                >
                                    <Icon />
                                </div>
                            ) : (
                                <>
                                    <Icon active={active} />
                                    <span
                                        className="text-xs"
                                        style={{ color: active ? '#3A81C2' : '#aaa', fontWeight: active ? 600 : 400 }}
                                    >
                                        {label}
                                    </span>
                                </>
                            )}
                        </button>
                    )
                })}
            </nav>
        </>
    )
}