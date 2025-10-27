export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8 w-full max-w-5xl">
      {children}
    </div>
  )
}
