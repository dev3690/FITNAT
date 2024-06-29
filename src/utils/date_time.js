
export const formatDateYYMMDD = (isoDate) => {
  // const isoDate = "2024-08-05T00:00:00.000Z";
  const date = new Date(isoDate);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);
  return formattedDate
}

export const calcTimeline = (patient) => {
  const currentDate = new Date();
  const startDate = new Date(patient.start_date);
  const endDate = new Date(patient.end_date);
  const totalWeeks = Math.ceil((endDate - startDate) / (7 * 24 * 60 * 60 * 1000));
  const currentWeek = Math.ceil((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000));

  return { currentWeek, totalWeeks }
}
