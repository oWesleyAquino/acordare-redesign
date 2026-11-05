import Image from 'next/image';

type PhotoProps = {src: string; sizes: string; priority?: boolean; position?: string};

// As fotografias acompanham textos equivalentes e permanecem decorativas.
export function ResponsivePhoto({src, sizes, priority = false, position = 'center'}: PhotoProps) {
  return <Image src={src} alt="" fill sizes={sizes} priority={priority} fetchPriority={priority ? 'high' : undefined} quality={85}
    style={{objectFit: 'cover', objectPosition: position}} />;
}
