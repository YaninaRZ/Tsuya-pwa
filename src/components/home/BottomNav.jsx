import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const HomeIcon = ({ active }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#fff' : 'rgba(255,255,255,0.3)'}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
)
const HabitsIcon = ({ active }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#fff' : 'rgba(255,255,255,0.3)'}>
        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
    </svg>
)
const AddIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#111111">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
)
const LeaderboardIcon = ({ active }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#fff' : 'rgba(255,255,255,0.3)'}>
        <path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z" />
    </svg>
)
const ProfileIcon = ({ active }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#fff' : 'rgba(255,255,255,0.3)'}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
)

const tabs = [
    { path: '/home', label: 'HOME', Icon: HomeIcon },
    { path: '/habits', label: 'HABITS', Icon: HabitsIcon },
    { path: '/create-habit', label: 'ADD', Icon: AddIcon, isAdd: true },
    { path: '/leaderboard', label: 'ACTIVITY', Icon: LeaderboardIcon },
    { path: '/profile', label: 'PROFILE', Icon: ProfileIcon },
]

export default function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <>
            {/* SIDEBAR desktop */}
            <aside
                className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 py-10 px-4 gap-1 z-50"
                style={{ background: '#0D0D0D', borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
                <span
                    className="text-sm font-bold text-white mb-10 px-4"
                    style={{ fontFamily: 'Georgia, serif', letterSpacing: '5px' }}
                >
                    TSUYA
                </span>

                {tabs.map(({ path, label, Icon, isAdd }) => {
                    const active = location.pathname === path
                    return (
                        <Button
                            key={path}
                            onClick={() => navigate(path)}
                            variant={isAdd ? 'silver' : active ? 'secondary' : 'ghost'}
                            className={cn(
                                'w-full justify-start gap-4 px-4 rounded-2xl',
                                !isAdd && 'tracking-widest',
                            )}
                        >
                            <Icon active={active} />
                            <span className={cn(
                                'text-xs font-medium tracking-widest',
                                isAdd ? 'text-[#111]' : active ? 'text-white' : 'text-white/30'
                            )}>
                                {label}
                            </span>
                            {!isAdd && active && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C0C0C0]" />
                            )}
                        </Button>
                    )
                })}
            </aside>

            {/* BOTTOM NAV mobile */}
            <nav
                className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around px-4 py-3 z-50"
                style={{
                    background: 'rgba(17,17,17,0.95)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                {tabs.map(({ path, label, Icon, isAdd }) => {
                    const active = location.pathname === path
                    return (
                        <button
                            key={path}
                            onClick={() => navigate(path)}
                            className="flex flex-col items-center gap-1 flex-1 cursor-pointer"
                        >
                            {isAdd ? (
                                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#C0C0C0]">
                                    <Icon />
                                </div>
                            ) : (
                                <>
                                    <div className={cn(
                                        'w-8 h-8 flex items-center justify-center rounded-xl transition-all',
                                        active ? 'bg-white/[0.08]' : 'bg-transparent'
                                    )}>
                                        <Icon active={active} />
                                    </div>
                                    <span
                                        className="tracking-wider"
                                        style={{
                                            color: active ? '#fff' : 'rgba(255,255,255,0.3)',
                                            fontSize: 9,
                                        }}
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
