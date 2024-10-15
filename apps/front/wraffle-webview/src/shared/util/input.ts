export const handleMaxLength = (e: React.FormEvent<HTMLInputElement>) => {
  const inputElement = e.currentTarget;
  const {value, maxLength} = inputElement;
  if (value.length > maxLength) {
    inputElement.value = value.slice(0, maxLength);
  }
};
