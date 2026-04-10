import { useNavigate } from 'react-router-dom'
import HabitItem from './HabitItem'

export default function HabitList({ habits, done = [], onToggle }) {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-3 px-5">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>
                    HABITS
                </p>
                <button
                    onClick={() => navigate('/habits')}
                    className="text-xs"
                    style={{ color: '#C0C0C0', letterSpacing: '1px' }}
                >
                    VIEW ALL
                </button>
            </div>

            {habits.length === 0 ? (
                <div
                    className="text-center py-12 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <p className="text-2xl mb-3">🎯</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>
                        AUCUNE HABITUDE
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {habits.map(h => (
                        <HabitItem
                            key={h.id}
                            id={h.id}
                            emoji={h.emoji || '⭐'}
                            label={h.label}
                            done={done.includes(h.id)}
                            onToggle={() => onToggle(h.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}