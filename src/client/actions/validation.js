export const VALIDATION = 'validation';
export const validation = (field, error = '') => {
  return {
    type: VALIDATION,
    field,
    error,
  }
}
  