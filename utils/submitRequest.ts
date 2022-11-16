import { FetchError } from "ohmyfetch";

export type ValidationErrors = Record<string, string[]> | null;

export async function submitRequest<T>(
  fetchable: Promise<T>,
  onSuccess?: (data?: T) => any,
  onValidationError?: (errors: ValidationErrors) => any
): Promise<{ data: T|null; errors: ValidationErrors }> {
  try {
    const data = await fetchable;
    await onSuccess?.(data);

    return { data, errors: null };
  } catch (error) {
    if (!(error instanceof FetchError)) throw error;
    if (error.response?.status !== 422) throw error;

    const errors = error.data?.errors || {};
    await onValidationError?.(errors);

    return { data: null, errors };
  }
}
