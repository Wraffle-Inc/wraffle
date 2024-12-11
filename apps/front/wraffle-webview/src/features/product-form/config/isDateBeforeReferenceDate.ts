interface DateComparisonParams {
  date: Date | undefined;
  referenceDate: Date | undefined;
}

export const isDateBeforeReferenceDate = ({
  date,
  referenceDate,
}: DateComparisonParams) => {
  if (!date || !referenceDate) return true;
  if (date > referenceDate) {
    return false;
  }
  return true;
};
