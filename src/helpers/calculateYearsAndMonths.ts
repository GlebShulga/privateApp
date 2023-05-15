export const calculateYearsAndMonths = (
    date: Date
  ): { years: number; months: number } => {
    const currentDate = new Date();
    let years = currentDate.getFullYear() - date.getFullYear();
    let months = currentDate.getMonth() - date.getMonth();
    const monthsInYear = 12;

    if (months < 0) {
      years--;
      months += monthsInYear;
    }

    return { years, months };
  };