export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-col h-full">
      <div className="flex flex-col items-center justify-start gap-4 py-8 md:py-10 min-h-screen">
        {children}
      </div>
    </section>
  );
}
