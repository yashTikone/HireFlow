export default function HireFlowLogo({ className = '', showWordmark = true }) {
  return (
    <span className={`hireflow-logo ${className}`.trim()}>
      <svg
        className="hireflow-symbol"
        viewBox="0 0 48 48"
        role="img"
        aria-label="HireFlow logo"
      >
        <defs>
          <linearGradient id="hireflow-gradient" x1="4" y1="5" x2="43" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#28c7f7" />
            <stop offset="0.52" stopColor="#3978ff" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path d="M8 8a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v9h8V8a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v32a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5V31h-8v9a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z" fill="url(#hireflow-gradient)" />
        <path d="M10 31c8-11 17-3 28-18M17 35c7-7 13-5 21-15" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="12" r="3.2" fill="white" />
        <path d="m34 14 4-1-1 4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {showWordmark && <span className="hireflow-wordmark">Hire<span>Flow</span></span>}
    </span>
  );
}
