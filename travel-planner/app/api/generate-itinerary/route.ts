import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { destination, duration, travelers, budget } = await req.json()

    // Generate itinerary using AI
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `Create a detailed ${duration}-day travel itinerary for ${destination} for ${travelers} traveler(s) with a budget of $${budget}.

Format the response as JSON with this structure:
{
  "destination": "${destination}",
  "itinerary": [
    {
      "day": 1,
      "activities": ["Activity 1", "Activity 2", "Activity 3"]
    }
  ],
  "weather": {
    "temp": "Temperature range",
    "condition": "Weather condition",
    "forecast": "Detailed forecast description"
  },
  "budget": {
    "accommodation": amount,
    "food": amount,
    "activities": amount,
    "transport": amount,
    "total": total_amount
  }
}

Make the itinerary realistic, engaging, and well-balanced. Include specific attractions, restaurants, and activities. Ensure the budget breakdown adds up to approximately the total budget provided.`,
    })

    // Parse the AI response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response")
    }

    const itineraryData = JSON.parse(jsonMatch[0])

    // Add Google Maps embed URL
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(destination)}`

    return Response.json({
      ...itineraryData,
      mapUrl,
    })
  } catch (error: any) {
    console.error("[v0] Error generating itinerary:", error)

    if (error?.message?.includes("credit card")) {
      return Response.json(
        {
          error: "AI Gateway Setup Required",
          message:
            "The AI Gateway requires a credit card on file. Please add a card at vercel.com/ai to unlock free credits, or set up your own OpenAI API key as OPENAI_API_KEY in your environment variables.",
        },
        { status: 402 },
      )
    }

    return Response.json(
      {
        error: "Failed to generate itinerary",
        message: error?.message || "An unexpected error occurred",
      },
      { status: 500 },
    )
  }
}
