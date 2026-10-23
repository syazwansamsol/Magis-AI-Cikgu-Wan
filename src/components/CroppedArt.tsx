import React from 'react';

export const MASTER_UI_IMAGE =
  '/assets/aistudio/8F379228-3588-4F86-9EC6-403D3998BC11_f286c75c.PNG';

interface CroppedArtProps {
  /** Percentage 0..100 from left of 1672x941 master image */
  x: number;
  /** Percentage 0..100 from top of 1672x941 master image */
  y: number;
  /** Percentage 0..100 width of 1672x941 master image */
  w: number;
  /** Percentage 0..100 height of 1672x941 master image */
  h: number;
  alt: string;
  className?: string;
}

export const CroppedArt: React.FC<CroppedArtProps> = ({
  x,
  y,
  w,
  h,
  alt,
  className = '',
}) => {
  const aspect = (w * 1672) / (h * 941);

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      style={{ aspectRatio: `${aspect}` }}
    >
      <img
        src={MASTER_UI_IMAGE}
        alt={alt}
        referrerPolicy="no-referrer"
        draggable={false}
        className="absolute max-w-none pointer-events-none"
        style={{
          width: `${(100 / w) * 100}%`,
          height: `${(100 / h) * 100}%`,
          left: `${-(x / w) * 100}%`,
          top: `${-(y / h) * 100}%`,
        }}
      />
    </div>
  );
};
