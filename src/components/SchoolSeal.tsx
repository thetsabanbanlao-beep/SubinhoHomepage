import React from 'react';

interface SchoolSealProps {
  className?: string;
  size?: number;
}

export const SchoolSeal: React.FC<SchoolSealProps> = ({ className = 'w-12 h-12', size }) => {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`${className} shrink-0`}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer Ring Gradients */}
        <linearGradient id="sealOrangeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        <linearGradient id="sealGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <radialGradient id="innerBlueShield" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>

        {/* Text Arcs */}
        <path id="textArcTop" d="M 58 200 A 142 142 0 0 1 342 200" fill="none" />
        <path id="textArcBottom" d="M 342 200 A 142 142 0 0 1 58 200" fill="none" />
      </defs>

      {/* Outer Thick Orange/Red Ring */}
      <circle cx="200" cy="200" r="194" fill="url(#sealOrangeBorder)" stroke="#FBBF24" strokeWidth="4" />

      {/* White Ring for School Name */}
      <circle cx="200" cy="200" r="176" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />

      {/* Inner Blue Shield Base */}
      <circle cx="200" cy="200" r="138" fill="url(#innerBlueShield)" stroke="url(#sealOrangeBorder)" strokeWidth="6" />

      {/* Star Flairs Left & Right */}
      <g fill="#1E3A8A">
        {/* Left 8-point star */}
        <polygon points="38,220 44,212 40,204 48,206 56,192 54,204 64,206 56,212 62,220 52,216 48,228 44,216" />
        {/* Right 8-point star */}
        <polygon points="362,220 356,212 360,204 352,206 344,192 346,204 336,206 344,212 338,220 348,216 352,228 356,216" />
      </g>

      {/* Arched Typography */}
      <text
        fill="#1E3A8A"
        fontSize="28"
        fontWeight="800"
        fontFamily="'Sarabun', 'Prompt', 'Kanit', sans-serif"
        letterSpacing="1px"
      >
        <textPath href="#textArcTop" startOffset="50%" textAnchor="middle">
          โรงเรียนเทศบาล ๓ บ้านเหล่า
        </textPath>
      </text>

      <text
        fill="#1E3A8A"
        fontSize="26"
        fontWeight="800"
        fontFamily="'Sarabun', 'Prompt', 'Kanit', sans-serif"
        letterSpacing="1px"
      >
        <textPath href="#textArcBottom" startOffset="50%" textAnchor="middle">
          เทศบาลนครอุดรธานี
        </textPath>
      </text>

      {/* Center Golden Kanok Ornaments (Left & Right Flames) */}
      {/* Left Kanok */}
      <g>
        <path
          d="M 120 280 C 80 240 70 170 110 130 C 130 110 160 90 170 80 C 150 110 130 140 140 180 C 145 200 135 240 120 280 Z"
          fill="url(#sealGoldGrad)"
          stroke="#9A3412"
          strokeWidth="2"
        />
        <path
          d="M 105 230 C 90 200 95 160 125 140 C 115 165 110 190 125 210 Z"
          fill="#FEF08A"
          opacity="0.8"
        />
        <path
          d="M 135 300 C 100 280 90 230 100 200 C 110 220 120 250 140 270 Z"
          fill="url(#sealGoldGrad)"
          stroke="#9A3412"
          strokeWidth="1.5"
        />
      </g>

      {/* Right Kanok */}
      <g>
        <path
          d="M 280 280 C 320 240 330 170 290 130 C 270 110 240 90 230 80 C 250 110 270 140 260 180 C 255 200 265 240 280 280 Z"
          fill="url(#sealGoldGrad)"
          stroke="#9A3412"
          strokeWidth="2"
        />
        <path
          d="M 295 230 C 310 200 305 160 275 140 C 285 165 290 190 275 210 Z"
          fill="#FEF08A"
          opacity="0.8"
        />
        <path
          d="M 265 300 C 300 280 310 230 300 200 C 290 220 280 250 260 270 Z"
          fill="url(#sealGoldGrad)"
          stroke="#9A3412"
          strokeWidth="1.5"
        />
      </g>

      {/* Golden Tiered Lotus Throne / Pedestal */}
      <g>
        <path
          d="M 140 310 L 260 310 L 245 330 L 155 330 Z"
          fill="url(#sealGoldGrad)"
          stroke="#78350F"
          strokeWidth="2"
        />
        <path
          d="M 150 295 L 250 295 L 255 310 L 145 310 Z"
          fill="#FDE68A"
          stroke="#78350F"
          strokeWidth="1.5"
        />
        {/* Lotus petals under throne */}
        <circle cx="170" cy="320" r="5" fill="#DC2626" />
        <circle cx="200" cy="320" r="5" fill="#DC2626" />
        <circle cx="230" cy="320" r="5" fill="#DC2626" />
      </g>

      {/* Thao Wessuwan (Guardian of Wealth and Righteousness) */}
      {/* Lower Body & Pants (Cyan & Blue Thai Royal Garment) */}
      <path
        d="M 160 220 L 200 235 L 240 220 L 250 295 L 200 295 L 150 295 Z"
        fill="#0284C7"
        stroke="#FCD34D"
        strokeWidth="2"
      />
      {/* Gold pattern stripes on legs */}
      <path d="M 165 240 L 195 245" stroke="#FDE047" strokeWidth="2.5" />
      <path d="M 168 260 L 195 265" stroke="#FDE047" strokeWidth="2.5" />
      <path d="M 170 280 L 195 285" stroke="#FDE047" strokeWidth="2.5" />
      <path d="M 235 240 L 205 245" stroke="#FDE047" strokeWidth="2.5" />
      <path d="M 232 260 L 205 265" stroke="#FDE047" strokeWidth="2.5" />
      <path d="M 230 280 L 205 285" stroke="#FDE047" strokeWidth="2.5" />

      {/* Upper Body (Red Royal Armor / Torso) */}
      <path
        d="M 165 145 L 235 145 L 245 220 L 200 235 L 155 220 Z"
        fill="#DC2626"
        stroke="#FEF08A"
        strokeWidth="2.5"
      />
      {/* Chest Armor Gold Trim */}
      <path
        d="M 180 145 L 200 185 L 220 145"
        stroke="#FDE047"
        strokeWidth="3"
        fill="none"
      />

      {/* Arms Holding Club */}
      <path
        d="M 165 150 L 195 180 L 175 195"
        stroke="#DC2626"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 235 150 L 205 180 L 225 195"
        stroke="#DC2626"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Golden Thai Crown (Chada) */}
      <g>
        <path
          d="M 200 80 L 210 115 L 190 115 Z"
          fill="url(#sealGoldGrad)"
          stroke="#78350F"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="76" r="5" fill="#FEF08A" stroke="#78350F" strokeWidth="1" />
        <path
          d="M 182 115 L 218 115 L 214 135 L 186 135 Z"
          fill="url(#sealGoldGrad)"
          stroke="#78350F"
          strokeWidth="2"
        />
      </g>

      {/* Face (Greenish Gold Complexion) */}
      <circle cx="200" cy="130" r="16" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
      {/* Fangs & Eyes */}
      <ellipse cx="194" cy="128" rx="3" ry="2" fill="#FFFFFF" />
      <ellipse cx="206" cy="128" rx="3" ry="2" fill="#FFFFFF" />
      <circle cx="194" cy="128" r="1.5" fill="#000000" />
      <circle cx="206" cy="128" r="1.5" fill="#000000" />
      <path d="M 188 136 Q 200 142 212 136" stroke="#78350F" strokeWidth="2" fill="none" />
      {/* Fangs */}
      <polygon points="192,136 195,142 196,136" fill="#FFFFFF" />
      <polygon points="208,136 205,142 204,136" fill="#FFFFFF" />

      {/* Divine Scepter / Gada Club */}
      <rect
        x="196"
        y="160"
        width="8"
        height="135"
        fill="#FDE047"
        stroke="#78350F"
        strokeWidth="2"
        rx="3"
      />
      {/* Club Head */}
      <circle cx="200" cy="162" r="8" fill="#DC2626" stroke="#FEF08A" strokeWidth="2" />
      <circle cx="200" cy="162" r="4" fill="#FDE047" />
    </svg>
  );
};
