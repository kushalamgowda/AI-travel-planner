"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Users, Loader2 } from "lucide-react"
import { TravelResults } from "@/components/travel-results"

export function TravelPlannerForm() {
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [travelers, setTravelers] = useState("")
  const [budget, setBudget] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, duration, travelers, budget }),
      })

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("[v0] Error generating itinerary:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">Start Planning</CardTitle>
          <CardDescription className="text-muted-foreground">
            Tell us about your trip and we'll create a personalized plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-card-foreground">
                  Destination
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="destination"
                    placeholder="e.g., Paris, France"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-10 bg-secondary border-border text-secondary-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-card-foreground">
                  Duration (days)
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 7"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="pl-10 bg-secondary border-border text-secondary-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers" className="text-card-foreground">
                  Number of Travelers
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="travelers"
                    type="number"
                    placeholder="e.g., 2"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="pl-10 bg-secondary border-border text-secondary-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-card-foreground">
                  Budget (USD)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-sm text-muted-foreground">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 3000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="pl-8 bg-secondary border-border text-secondary-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Your Itinerary...
                </>
              ) : (
                "Generate Travel Plan"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {results && <TravelResults results={results} />}
    </div>
  )
}
