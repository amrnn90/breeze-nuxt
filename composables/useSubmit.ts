export type ValidationErrors = Record<string, string[]>;

export type UseSubmitOptions = {
  onSuccess?: (result: any) => any;
  onError?: (error: Error) => any;
};

export function useSubmit<T>(
  fetchable: () => Promise<T>,
  options: UseSubmitOptions = {}
) {
  const validationErrors = ref<ValidationErrors>({});
  const error = ref<Error | null>(null);
  const inProgress = ref(false);
  const succeeded = ref<Boolean | null>(null);

  async function submit() {
    validationErrors.value = {};
    error.value = null;
    inProgress.value = true;
    succeeded.value = null;

    try {
      const data = await fetchable();
      succeeded.value = true;
      options?.onSuccess?.(data);
      return data;
    } catch (e: any) {
      error.value = e;
      succeeded.value = false;
      options?.onError?.(e);
      validationErrors.value = e.data?.errors;

      if (e.response?.status !== 422) throw e;
    } finally {
      inProgress.value = false;
    }
  }

  return {
    submit,
    inProgress,
    succeeded,
    validationErrors,
    error,
  };
}
