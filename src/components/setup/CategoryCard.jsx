import { useState } from 'react'
import HabitCard from './HabitCard'

export default function CategoryCard({ category, selectedHabits, onToggle }) {
    const [open, setOpen] = useState(false)
    const selectedCount = category.habits.filter(h => selectedHabits.includes(h)).length

    return (
        <div
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{ border: selectedCount > 0 ? `2px solid ${category.accent}` : '2px solid #e5e7eb' }}
        >
            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 p-4 w-full"
                style={{ background: open ? category.color : '#fff' }}
            >
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: category.color }}
                >
                    {category.emoji}
                </div>
                <div className="flex flex-col items-start">
                    <span className="font-medium text-sm" style={{ color: '#1A1A2E' }}>{category.label}</span>
                    {selectedCount > 0 && (
                        <span className="text-xs" style={{ color: category.accent }}>
                            {selectedCount} sélectionnée{selectedCount > 1 ? 's' : ''}
                        </span>
                    )}
                </div>
                <span className="ml-auto text-xs" style={{ color: '#aaa' }}>
                    {open ? '▲' : '▼'}
                </span>
            </button>

            {/* Habits en cards */}
            <div style={{
                maxHeight: open ? 400 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
            }}>
                <div
                    className="flex flex-wrap gap-3 p-4"
                    style={{ background: '#fafafa' }}
                >
                    {category.habits.map((habit) => (
                        <HabitCard
                            key={habit}
                            label={habit}
                            selected={selectedHabits.includes(habit)}
                            onSelect={() => onToggle(habit)}
                            accent={category.accent}
                            bg={category.color}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}