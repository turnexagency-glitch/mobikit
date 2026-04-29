'use client'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface SmartImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallback?: string
}

export default function SmartImage({ src, fallback, alt, ...props }: SmartImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (fallback && imgSrc !== fallback) {
          setImgSrc(fallback)
        }
      }}
    />
  )
}
