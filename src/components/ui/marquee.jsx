import { cn } from "../../lib/utils";

export const Marquee = ({
    className,
    reverse,
    pauseOnHover = false,
    children,
    ...props
}) => {
    return (
        <div
            {...props}
            style={{
                "--gap": "1rem",
                "--duration": "30s",
            }}
            className={cn(
                "group flex overflow-hidden p-2 [gap:var(--gap)]",
                className
            )}
        >
            <div
                className={cn(
                    "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee",
                    reverse ? "[animation-direction:reverse]" : "",
                    pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
                )}
            >
                {children}
                {children}
            </div>
        </div>
    );
};