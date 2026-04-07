export default function StepIndicator({ total, current, onChange }) {
    return (
        <div className="flex gap-2">
            {Array.from({ length: total }).map((_, i) => (
                <div
                    key={i}
                    onClick={() => onChange?.(i)}
                    style={{
                        height: 6,
                        width: i === current ? 20 : 6,
                        borderRadius: 99,
                        background: i === current ? '#fff' : 'rgba(255,255,255,0.3)',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                    }}
                />
            ))}
        </div>
    )
}