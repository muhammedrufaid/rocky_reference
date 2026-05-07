interface ApiError extends Error {
  status?: number
  statusText?: string
  url?: string
  body?: unknown
  bodyText?: string
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '')

function buildApiUrl(path: string) {
  return `${API_BASE_URL}/api/${path.replace(/^\//, '')}`
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text) as unknown
  } catch {
    return null
  }
}

async function readBody(res: Response): Promise<{ text: string; json: unknown | null }> {
  try {
    const text = await res.text()
    return { text, json: text ? safeJsonParse(text) : null }
  } catch {
    return { text: '', json: null }
  }
}

async function throwForNonOk(res: Response, apiUrl: string) {
  if (res.ok) return

  const error: ApiError = new Error(`HTTP error! status: ${res.status} ${res.statusText}`)
  error.status = res.status
  error.statusText = res.statusText
  error.url = apiUrl

  const { text: bodyText, json: body } = await readBody(res)
  error.body = body
  error.bodyText = bodyText

  console.error('API Error:', {
    status: res.status,
    statusText: res.statusText,
    url: apiUrl,
    body: body ?? undefined,
    bodyTextPreview: bodyText ? bodyText.slice(0, 500) : undefined,
  })

  if (res.status === 429) {
    error.message = 'Rate limit exceeded - Please try again later'
    throw error
  }

  if (body && typeof (body as any)?.message === 'string') {
    error.message = (body as any).message
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

    const { json, text } = await readBody(res)
    if (json !== null) return json as T
    if (!text) return null as T
    throw new Error(`Expected JSON response from ${apiUrl} but received non-JSON body`)
  } catch (error) {
    console.error('API Request Failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: path,
      apiUrl,
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
    const { json } = await readBody(res)
    return (json as TResponse) ?? (null as TResponse)
  } catch (error) {
    console.error('API Request Failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: path,
      apiUrl,
      timestamp: new Date().toISOString(),
    })
    throw error
  }
}

