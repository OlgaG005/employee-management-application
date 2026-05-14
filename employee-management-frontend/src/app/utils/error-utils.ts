export function getApiErrorMessage(error: any, fallbackMessage: string): string {
  if (error.error?.details?.length > 0) {
    return error.error.details.join('\n');
  }

  if (error.error?.message) {
    return error.error.message;
  }

  return fallbackMessage;
}