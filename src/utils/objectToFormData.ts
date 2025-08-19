export function objectToFormData(obj: Record<string, unknown>): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    const isFile = typeof File !== "undefined" && value instanceof File;
    const isBlob = typeof Blob !== "undefined" && value instanceof Blob;
    const isFileList = typeof FileList !== "undefined" && value instanceof FileList;
    const isFileLike =
      !isFile &&
      !isBlob &&
      typeof value === "object" &&
      value !== null &&
      "size" in (value as object) &&
      "type" in (value as object) &&
      typeof (value as { arrayBuffer?: unknown }).arrayBuffer === "function";

    if (isFile || isBlob || isFileLike) {
      const fileOrBlob = value as Blob;
      const maybeName = (value as { name?: unknown } | null)?.name;
      if (maybeName && typeof maybeName === "string") {
        formData.append(key, fileOrBlob, maybeName);
      } else {
        formData.append(key, fileOrBlob);
      }
    } else if (isFileList) {
      Array.from(value as FileList).forEach((file) => formData.append(key, file));
    } else if (Array.isArray(value)) {
      (value as unknown[]).forEach((item) => {
        const itemIsFile = typeof File !== "undefined" && item instanceof File;
        const itemIsBlob = typeof Blob !== "undefined" && item instanceof Blob;
        const itemIsFileLike =
          !itemIsBlob &&
          !itemIsFile &&
          typeof item === "object" &&
          item !== null &&
          "size" in (item as object) &&
          "type" in (item as object) &&
          typeof (item as { arrayBuffer?: unknown }).arrayBuffer === "function";

        if (itemIsFile || itemIsBlob || itemIsFileLike) {
          const fileOrBlob = item as Blob;
          const maybeName = (item as { name?: unknown } | null)?.name;
          if (maybeName && typeof maybeName === "string") {
            formData.append(key, fileOrBlob, maybeName);
          } else {
            formData.append(key, fileOrBlob);
          }
        } else {
          formData.append(key, String(item));
        }
      });
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}
