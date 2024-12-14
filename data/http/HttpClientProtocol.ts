export enum ROLES {
  ADMIN = 'admin',
  MEMBER = 'member',
  OWNER = 'owner',
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  internalServerError = 500,
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type HttpRequest = {
  url: string
  method: HttpMethods
  headers?: Record<string, string>
  body?: unknown
  params?: Record<string, string | number>
}

export type HttpResponse<T = unknown> = {
  statusCode: number
  body?: T
}

export enum HttpSupabaseError {
  NO_ROWS = 'PGRST116',
  AUTH_ERROR = 'PGRST123',
  INVALID_DATA = 'PGRST124',
}
