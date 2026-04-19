import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  variant?: "default" | "onDark";
};

export function Logo({
  className,
  showWordmark = true,
  variant = "default",
}: LogoProps) {
  const onDark = variant === "onDark";

  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
        className,
      )}
      aria-label="POLAREBIKES home"
    >
      <svg
        viewBox="0 0 48 48"
        className={cn(
          "h-9 w-9 shrink-0 transition-colors",
          onDark
            ? "text-cyan-300 group-hover:text-cyan-200"
            : "text-sky-500 group-hover:text-cyan-400",
        )}
        aria-hidden
      >
        <title>POLAREBIKES mark</title>
        <defs>
          <linearGradient id="pb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle
          cx="24"
          cy="24"
          r="22"
          fill={onDark ? "#020617" : "#0f172a"}
          stroke="url(#pb-grad)"
          strokeWidth="2"
        />
        <path
          fill="url(#pb-grad)"
          d="M14 30c2-8 6-14 12-16 2-.5 4-.5 6 0-1.5 2-2 4.5-1 7 1.2 3 4 4.5 7 4 1.5-.3 3-1 4-2-1 4-4.5 7-9 7.5-5 .6-10.5-1.5-14-6.5-1.2-1.8-2-2.8-2.5-4zm8-12c1.5-3 4-5 7-5.5 3-.8 6.5 0 9 2.5-2 .5-4 2-5 4-2.2 4.2.5 9 5 10 2 .5 4 0 5.5-1.5C36 35 30 38 23 36c-4-1-7.5-4-8.5-9-.5-2.5 0-5 1.5-7z"
        />
        <circle cx="19" cy="21" r="1.6" fill={onDark ? "#0f172a" : "#0f172a"} />
        <circle cx="27" cy="20" r="1.4" fill={onDark ? "#0f172a" : "#0f172a"} />
        <path
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1.2"
          strokeLinecap="round"
          d="M22 26c1.2 1.8 3.5 2.2 5.5 1.2"
        />
      </svg>
      {showWordmark && (
        <span
          className={cn(
            "font-display text-xl tracking-[0.12em] sm:text-2xl",
            onDark
              ? "text-white"
              : "text-navy",
          )}
        >
          POLARE
          <span className={onDark ? "text-cyan-300" : "text-primary"}>
            BIKES
          </span>
        </span>
      )}
    </Link>
  );
}
