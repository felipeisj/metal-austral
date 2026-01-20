'use client';

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

export const Logo = ({ className = '', isScrolled = false }: LogoProps) => {
  const colorPrimary = isScrolled ? "#0f172a" : "#ffffff";
  const colorBlue = "#3b82f6";
  const colorCyan = "#22d3ee";

  return (
    <div className={`flex items-center gap-3 md:gap-4 transition-all duration-500 ${className}`}>
      {/* Logo Container con tamaño fijo para evitar saltos */}
      <div className="relative w-12 h-10 md:w-14 md:h-12 flex-shrink-0">
        <svg
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
        >
          {/* Estructura Izquierda (Color Primario: Negro/Blanco) */}
          <path
            d="M10 85V45L60 15"
            stroke={colorPrimary}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-500"
          />
          {/* Cerchas Izquierda */}
          <path d="M10 45H25V85" stroke={colorPrimary} strokeWidth="4" className="transition-colors duration-500" />
          <path d="M10 55L25 65M10 65L25 55M10 75L25 85" stroke={colorPrimary} strokeWidth="2" opacity="0.6" className="transition-colors duration-500" />

          {/* Estructura Derecha (Azul) */}
          <path
            d="M110 85V45L60 15"
            stroke={colorBlue}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cerchas Derecha */}
          <path d="M110 45H95V85" stroke={colorBlue} strokeWidth="4" />
          <path d="M110 55L95 65M110 65L95 55M110 75L95 85" stroke={colorBlue} strokeWidth="2" opacity="0.6" />

          {/* Letra A Central (Azul) */}
          <path
            d="M35 85L60 25L85 85"
            stroke={colorBlue}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48 68H72"
            stroke={colorBlue}
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Texto Tipográfico (GALPÓN AUSTRAL) - Oculto en móviles para limpieza visual */}
      <div className="hidden sm:flex flex-col leading-none">
        <span className={`text-base md:text-xl font-black tracking-tight transition-colors duration-500 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
          GALPÓN
        </span>
        <span className="text-[10px] md:text-base font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Austral
        </span>
      </div>
    </div>
  );
};