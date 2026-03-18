/**
 * Lightweight API error handling.
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
    public readonly body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}

export function toApiError(err: unknown): ApiError {
  if (isApiError(err)) return err;
  if (err instanceof Error) return new ApiError(err.message);
  return new ApiError(String(err));
}
