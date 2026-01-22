export interface Source {
    text: string
    score: number
    dense_score: number
    link: string | null
}

export interface ChatResponse {
    answer: string
    sources: Source[]
}

export async function chat(question: string): Promise<ChatResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    const response = await fetch(`${baseUrl}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
    })

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
    }

    return response.json()
}
