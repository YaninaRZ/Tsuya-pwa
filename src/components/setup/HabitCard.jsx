export default function HabitCard({ emoji, label, selected, onSelect }) {
    return (
        <button
            onClick={onSelect}
            className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl transition-all aspect-square"
            style={{
                border: selected ? '2px solid #3A81C2' : '2px solid transparent',
                background: selected ? '#EEF4FF' : '#F5F7FF',
            }}
        >
            <span style={{ fontSize: 40 }}>{emoji}</span>
            <span
                className="text-sm font-medium"
                style={{ color: selected ? '#1A4B8C' : '#333' }}
            >
                {label}
            </span>
        </button>
    )
}