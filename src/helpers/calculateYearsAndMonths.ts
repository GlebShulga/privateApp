export const calculateYearsAndMonths = (
  date: Date
): { years: number; months: number } => {
  const currentDate = new Date();
  const monthIndexAdjustment = 1;
  let years = currentDate.getFullYear() - date.getFullYear();
  let months = currentDate.getMonth() - date.getMonth() + monthIndexAdjustment;
  const monthsInYear = 12;

  if (months < 0) {
    years--;
    months += monthsInYear;
  }

  return { years, months };
};
