import Link from 'next/link'

export function PreviewBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-amber-500 text-black text-center py-2 px-4 text-sm font-semibold">
      Preview Mode — You are viewing draft content.{' '}
      <Link href="/api/exit-preview" className="underline font-bold ml-2">
        Exit Preview
      </Link>
    </div>
  )
}
