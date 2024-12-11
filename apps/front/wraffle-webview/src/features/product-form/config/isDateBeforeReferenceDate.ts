export const isDateBeforeReferenceDate = (
  date: Date | undefined,
  referenceDate: Date | undefined,
) => {
  if (!date || !referenceDate) return true;
  if (date > referenceDate) {
    return false;
  }
  return true;
};
