export const formatMatchDate = (dateString: string) => {
  const [datePart, timePart] = dateString.split(" ");
  return `${datePart} at ${timePart}`;
};
