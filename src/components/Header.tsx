export function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-border/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            
            <h1 className="text-xl font-semibold text-foreground">
              SIP Calculator
            </h1>
          </div>
          <div className="text-sm text-muted-foreground hidden sm:block">
            Plan your investments smarter
          </div>
        </div>
      </div>
    </header>
  );
}
