interface ApiError extends Error {
  status?: number
  statusText?: string
  url?: string
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '')

function buildApiUrl(path: string) {
  return `${API_BASE_URL}/api/${path.replace(/^\//, '')}`
}

async function parseJsonSafe(res: Response) {
  try {
    return await res.json()
  } catch {
    return null
  }
}

async function throwForNonOk(res: Response, apiUrl: string) {
  if (res.ok) return

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

  const errorData = await parseJsonSafe(res)
  if (errorData && typeof (errorData as any)?.message === 'string') {
    error.message = (errorData as any).message
  }

  throw error
}

export const getData = async <T = unknown>(path: string, revalidate: number = 60): Promise<T> => {
  const apiUrl = buildApiUrl(path)
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate },
    })

    await throwForNonOk(res, apiUrl)
    return (await res.json()) as T
  } catch (error) {
    console.error('API Request Failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: path,
      timestamp: new Date().toISOString(),
    })
    throw error
  }
}

export const postData = async <TResponse = unknown, TBody = unknown>(
  path: string,
  body: TBody,
): Promise<TResponse> => {
  const apiUrl = buildApiUrl(path)
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body ?? {}),
    })

    await throwForNonOk(res, apiUrl)
    const data = await parseJsonSafe(res)
    return data as TResponse
  } catch (error) {
    console.error('API Request Failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: path,
      timestamp: new Date().toISOString(),
    })
    throw error
  }
}

