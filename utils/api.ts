interface ApiError extends Error {
  status?: number
  statusText?: string
  url?: string
  body?: unknown
  bodyText?: string
}

function normalizeBaseUrl(value: string | undefined | null) {
  return String(value ?? '').trim().replace(/\/$/, '')
}

function resolveApiBaseUrl(): string {
  const explicit =
    normalizeBaseUrl(process.env.NEXT_PUBLIC_BASE_URL) ||
    normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    normalizeBaseUrl(process.env.SITE_URL)
  if (explicit) return explicit

  // Server-side fallback for local dev when env isn't set.
  if (typeof window === 'undefined') {
    const vercel = normalizeBaseUrl(process.env.VERCEL_URL)
    if (vercel) return `https://${vercel}`
    const port = normalizeBaseUrl(process.env.PORT) || '3000'
    return `http://localhost:${port}`
  }

  // Browser-side fallback (same-origin).
  return ''
}

function buildApiUrl(path: string) {
  const base = resolveApiBaseUrl()
  const suffix = `/api/${path.replace(/^\//, '')}`
  return base ? `${base}${suffix}` : suffix
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

async function throwForNonOk(res: Response, apiUrl: string, options?: { silent?: boolean }) {
  if (res.ok) return

  const error: ApiError = new Error(`HTTP error! status: ${res.status} ${res.statusText}`)
  error.status = res.status
  error.statusText = res.statusText
  error.url = apiUrl

  const { text: bodyText, json: body } = await readBody(res)
  error.body = body
  error.bodyText = bodyText

  if (!options?.silent) {
    console.error('API Error:', {
      status: res.status,
      statusText: res.statusText,
      url: apiUrl,
      body: body ?? undefined,
      bodyTextPreview: bodyText ? bodyText.slice(0, 500) : undefined,
    })
  }

  if (res.status === 429) {
    error.message = 'Rate limit exceeded - Please try again later'
    throw error
  }

  if (res.status === 413) {
    error.message = 'Your file is too large. Please upload a smaller CV and try again.'
    throw error
  }

  if (body && typeof (body as any)?.message === 'string') {
    error.message = (body as any).message
    throw error
  }

  if (typeof bodyText === 'string' && bodyText.trim()) {
    // If the server responds with an HTML error page, don't surface raw markup to users.
    const normalized = bodyText.trim()
    const titleMatch = normalized.match(/<title[^>]*>([^<]+)<\/title>/i)
    const looksLikeHtml = /<!doctype html|<html[\s>]/i.test(normalized)
    const maybePayloadTooLarge =
      /payload too large|request entity too large|content too large/i.test(normalized)

    if (maybePayloadTooLarge) {
      error.message = 'Your file is too large. Please upload a smaller CV and try again.'
      throw error
    }

    if (looksLikeHtml && titleMatch?.[1]) {
      error.message = `${titleMatch[1]} (HTTP ${res.status})`
      throw error
    }
  }

  throw error
}

type GetDataOptions = {
  /** If true, do not `console.error` on failure (still throws). */
  silent?: boolean
}

function shouldLogApiErrors(silent?: boolean) {
  if (silent) return false
  return process.env.NODE_ENV !== 'test'
}

export const getData = async <T = unknown>(
  path: string,
  revalidate: number = 60,
  options: GetDataOptions = {},
): Promise<T> => {
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

    await throwForNonOk(res, apiUrl, { silent: options.silent })

    const { json, text } = await readBody(res)
    if (json !== null) return json as T
    if (!text) return null as T
    throw new Error(`Expected JSON response from ${apiUrl} but received non-JSON body`)
  } catch (error) {
    if (shouldLogApiErrors(options.silent)) {
      console.error('API Request Failed:', error, {
        url: path,
        apiUrl,
        timestamp: new Date().toISOString(),
      })
    }
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
    if (shouldLogApiErrors(false)) {
      console.error('API Request Failed:', error, {
        url: path,
        apiUrl,
        timestamp: new Date().toISOString(),
      })
    }
    throw error
  }
}

export const postFormData = async <TResponse = unknown>(
  path: string,
  formData: FormData,
): Promise<TResponse> => {
  const normalizedPath = path.replace(/^\//, '')
  const apiUrl =
    typeof window !== 'undefined'
      ? `/api/${normalizedPath}`
      : buildApiUrl(normalizedPath)
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })

    await throwForNonOk(res, apiUrl)
    const { json } = await readBody(res)
    return (json as TResponse) ?? (null as TResponse)
  } catch (error) {
    if (shouldLogApiErrors(false)) {
      console.error('API Request Failed:', error, {
        url: path,
        apiUrl,
        timestamp: new Date().toISOString(),
      })
    }
    throw error
  }
}

