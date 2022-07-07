import { FetchError } from "ohmyfetch";

export async function submitRequest<T>(
  fetchable: Promise<T>,
  onSuccess?: (data?: T) => any,
  onValidationError?: (errors?: string[]) => any
): Promise<{ data: T; errors: string[] }> {
  try {
    const data = await fetchable;
    await onSuccess?.(data);

    return { data, errors: null };
  } catch (error) {
    if (!(error instanceof FetchError)) throw error;
    if (error.response?.status !== 422) throw error;

    const errors = (error.data?.errors as string[]) || [];
    await onValidationError?.(errors);

    return { data: null, errors };
  }
}
