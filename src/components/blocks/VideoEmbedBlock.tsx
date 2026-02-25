import Image from 'next/image'

type Props = {
  heading?: string | null
  videoUrl?: string | null
  posterImage?: { url?: string; alt?: string } | null
  autoplay?: boolean
}

function getEmbedUrl(url: string): { type: 'youtube' | 'vimeo' | 'mp4'; embedUrl: string } {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  if (ytMatch) return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}` }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return { type: 'vimeo', embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}` }

  return { type: 'mp4', embedUrl: url }
}

export function VideoEmbedBlock({ heading, videoUrl, posterImage, autoplay }: Props) {
  if (!videoUrl) return null

  const { type, embedUrl } = getEmbedUrl(videoUrl)

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-8 text-center">
            {heading}
          </h2>
        )}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
          {type === 'mp4' ? (
            <>
              <video
                src={embedUrl}
                controls
                autoPlay={autoplay}
                muted={autoplay}
                playsInline
                className="w-full h-full object-cover"
                poster={posterImage?.url || undefined}
              />
              {posterImage?.url && !autoplay && (
                <Image
                  src={posterImage.url}
                  alt={posterImage.alt ?? 'Video poster'}
                  fill
                  className="object-cover pointer-events-none"
                />
              )}
            </>
          ) : (
            <iframe
              src={`${embedUrl}${autoplay ? '?autoplay=1&mute=1' : ''}`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={heading || 'Embedded video'}
            />
          )}
        </div>
      </div>
    </section>
  )
}
