import { useNavigate } from 'react-router-dom'
import HabitItem from './HabitItem'
export default function HabitList({ habits, done = [], onToggle }) {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-3 px-5">
            <div className="flex items-center justify-between">
                <p className="text-base font-bold" style={{ color: '#1A1A2E' }}>Habits</p>
                <button
                    onClick={() => navigate('/habits')}
                    className="text-xs font-semibold"
                    style={{ color: '#3A81C2' }}
                >
                    VIEW ALL
                </button>
            </div>

            {habits.length === 0 ? (
                <div
                    className="text-center py-8 rounded-2xl"
                    style={{ background: '#fff', color: '#aaa' }}
                >
                    <p className="text-3xl mb-2">🎯</p>
                    <p className="text-sm">Aucune habitude pour l'instant</p>
                </div>
            ) : (
                habits.map(h => (
                    <HabitItem
                        key={h.id}
                        emoji={h.emoji || '⭐'}
                        label={h.label}
                        subtitle="0/1 TIMES"
                        done={done.includes(h.id)}
                        onToggle={() => onToggle(h.id)}
                    />
                ))
            )}
        </div>
    )
}