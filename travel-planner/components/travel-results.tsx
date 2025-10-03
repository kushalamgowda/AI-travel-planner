"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign, Cloud, Map } from "lucide-react"

interface TravelResultsProps {
  results: {
    destination: string
    itinerary: Array<{ day: number; activities: string[] }>
    weather: { temp: string; condition: string; forecast: string }
    budget: { accommodation: number; food: number; activities: number; transport: number; total: number }
    mapUrl: string
  }
}

export function TravelResults({ results }: TravelResultsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MapPin className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">{results.destination}</h2>
      </div>

      <Tabs defaultValue="itinerary" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger
            value="itinerary"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Itinerary
          </TabsTrigger>
          <TabsTrigger
            value="weather"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Cloud className="mr-2 h-4 w-4" />
            Weather
          </TabsTrigger>
          <TabsTrigger
            value="budget"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Budget
          </TabsTrigger>
          <TabsTrigger
            value="map"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Map className="mr-2 h-4 w-4" />
            Map
          </TabsTrigger>
        </TabsList>

        <TabsContent value="itinerary" className="space-y-4">
          {results.itinerary.map((day) => (
            <Card key={day.day} className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Badge variant="outline" className="border-primary text-primary">
                    Day {day.day}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {day.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-card-foreground">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{activity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="weather">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                  <Cloud className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-card-foreground">{results.weather.temp}</p>
                  <p className="text-lg text-muted-foreground">{results.weather.condition}</p>
                </div>
              </div>
              <p className="leading-relaxed text-card-foreground">{results.weather.forecast}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Budget Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <BudgetItem label="Accommodation" amount={results.budget.accommodation} />
                <BudgetItem label="Food & Dining" amount={results.budget.food} />
                <BudgetItem label="Activities" amount={results.budget.activities} />
                <BudgetItem label="Transportation" amount={results.budget.transport} />
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-card-foreground">Total Estimated Cost</span>
                  <span className="text-2xl font-bold text-primary">${results.budget.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-secondary">
                <iframe
                  src={results.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BudgetItem({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
      <span className="font-medium text-secondary-foreground">{label}</span>
      <span className="text-lg font-semibold text-secondary-foreground">${amount.toLocaleString()}</span>
    </div>
  )
}
