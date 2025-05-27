/**
 * Calculates the duration between a start date and end date
 * If endDate is "Present", calculates from start date to current date
 * Includes the current month in the calculation
 */
export function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = endDate === "Present" ? new Date() : new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  // Add 1 to include the current month
  months += 1;

  // Adjust for negative months
  if (months <= 0) {
    years--;
    months += 12;
  }

  // Handle month overflow (12 months = 1 year)
  if (months >= 12) {
    years += Math.floor(months / 12);
    months = months % 12;
  }

  // Format the duration string
  if (years === 0) {
    return months === 1 ? "1 month" : `${months} months`;
  } else if (months === 0) {
    return years === 1 ? "1 year" : `${years} years`;
  } else {
    const yearText = years === 1 ? "1 year" : `${years} years`;
    const monthText = months === 1 ? "1 month" : `${months} months`;
    return `${yearText} ${monthText}`;
  }
}
