import { useState, useRef, useEffect } from 'react'

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export default function CalendarStrip() {
    const today = new Date()
    const [selected, setSelected] = useState(today.getDate())
    const scrollRef = useRef(null)

    const getDaysInMonth = () => {
        const days = []
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(today.getFullYear(), today.getMonth(), i)
            days.push({ num: i, day: DAYS[date.getDay()] })
        }
        return days
    }

    const days = getDaysInMonth()

    useEffect(() => {
        if (scrollRef.current) {
            const todayEl = scrollRef.current.querySelector(`[data-day="${today.getDate()}"]`)
            todayEl?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
        }
    }, [])

    return (
        <div
            ref={scrollRef}
            className="flex gap-2 px-5 overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
        >
            {days.map(({ num, day }) => {
                const isSelected = selected === num
                const isToday = num === today.getDate()
                return (
                    <button
                        key={num}
                        data-day={num}
                        onClick={() => setSelected(num)}
                        className="flex flex-col items-center gap-1 py-3 px-3 flex-shrink-0 min-w-12 transition-all"
                        style={{
                            background: isSelected ? '#C0C0C0' : 'rgba(255,255,255,0.05)',
                            border: isToday && !isSelected ? '1px solid rgba(192,192,192,0.3)' : '1px solid transparent',
                            borderRadius: 14,
                        }}
                    >
                        <span
                            className="text-sm font-bold"
                            style={{ color: isSelected ? '#0A0A0A' : '#fff' }}
                        >
                            {num}
                        </span>
                        <span
                            className="text-xs"
                            style={{
                                color: isSelected ? 'rgba(10,10,10,0.6)' : 'rgba(255,255,255,0.3)',
                                letterSpacing: '1px',
                                fontSize: 9,
                            }}
                        >
                            {day}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}