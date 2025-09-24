import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text mb-4">
          My Awesome Docs
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          A minimalistic and beautiful documentation site, built with the best tools.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link to="/docs">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </main>
      <footer className="py-8 text-muted-foreground">
        Built with ❤️ and a lot of coffee.
      </footer>
    </div>
  )
}
