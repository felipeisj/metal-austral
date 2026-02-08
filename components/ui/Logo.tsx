'use client';

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

export const Logo = ({ className = '', isScrolled = false }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 md:gap-3 transition-all duration-500 ${className}`}>
      {/* Triángulo Logo SVG */}
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
        <svg
          viewBox="0 0 230 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M 115 39 L 192 158 L 38 158 L 115 39 M 115 0 L 0 179 L 230 179 Z"
            fill="#11aaa2"
          />
        </svg>
      </div>

      {/* Texto METAL AUSTRAL con colores adaptativos */}
      <div className="flex flex-col leading-none">
        <span className={`text-lg md:text-2xl font-black tracking-tight transition-colors duration-500 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
          METAL
        </span>
        <span className={`text-xs md:text-base font-bold tracking-[0.15em] uppercase transition-colors duration-500 ${isScrolled ? 'text-slate-700' : 'text-slate-300'}`}>
          AUSTRAL
        </span>
      </div>
    </div>
  );
};