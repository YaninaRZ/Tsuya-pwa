export default function GenderCard({ emoji, label, selected, onSelect }) {
    return (
        <button
            onClick={onSelect}
            className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all"
            style={{
                border: selected ? '2px solid #3A81C2' : '2px solid #e5e7eb',
                background: selected ? '#E8F4F8' : '#fff',
            }}
        >
            <span className="text-3xl">{emoji}</span>
            <span className="text-base font-medium" style={{ color: selected ? '#1A4B8C' : '#333' }}>
                {label}
            </span>
            <div
                className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                    border: selected ? 'none' : '2px solid #ddd',
                    background: selected ? '#3A81C2' : 'transparent',
                }}
            >
                {selected && <span style={{ color: '#fff', fontSize: 11 }}>✓</span>}
            </div>
        </button>
    )
}