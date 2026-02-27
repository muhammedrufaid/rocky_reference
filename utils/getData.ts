interface ApiError extends Error {
  status?: number
  statusText?: string
  url?: string
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '')

export const getData = async <T = unknown>(url: string, revalidate: number = 60): Promise<T> => {
  try {
    const apiUrl = `${API_BASE_URL}/api/${url}`

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate },
    })

    if (!res.ok) {
      const error: ApiError = new Error(`HTTP error! status: ${res.status} ${res.statusText}`)
      error.status = res.status
      error.statusText = res.statusText
      error.url = apiUrl

      console.error('API Error:', {
        status: res.status,
        statusText: res.statusText,
        url: apiUrl,
      })

      if (res.status === 429) {
        error.message = 'Rate limit exceeded - Please try again later'
        throw error
      }

      try {
        const errorData = await res.json()
        error.message = errorData?.message || error.message
      } catch (e) {
        console.error('Failed to parse error response:', e)
      }

      throw error
    }

    return (await res.json()) as T
  } catch (error) {
    console.error('API Request Failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url,
      timestamp: new Date().toISOString(),
    })
    throw error
  }
}