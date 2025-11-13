export const appendIf = (
    form: FormData,
    key: string,
    value?: string | Blob | File | null
  ) => {
    if (value !== undefined && value !== null && value !== "") {
      form.append(key, value);
    }
  };