import { TravelPlannerForm } from "@/components/travel-planner-form"
import { Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">AI-Powered Travel Planning</span>
            </div>
            <h1 className="mb-6 text-balance font-sans text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Plan Your Perfect Trip
            </h1>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl">
              Enter your destination and let AI create a personalized itinerary with weather forecasts, budget planning,
              and interactive maps.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <TravelPlannerForm />
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Powered by AI • Built with Next.js</p>
        </div>
      </footer>
    </main>
  )
}
