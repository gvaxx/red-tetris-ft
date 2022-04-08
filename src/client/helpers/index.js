export const hasErrors = (errors) => {
  const keys = Object.keys(errors);
  return keys.some(key => errors[key]);
}