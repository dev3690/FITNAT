
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



export const getWeeklyEndDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const result = [];

  // Check if the start date is greater than the end date
  if (start > end) {
    throw new Error("Start date must be before end date");
  }

  let current = new Date(start);

  // Adjust current to the first end of week date
  current.setDate(current.getDate() + 7);

  while (current <= end) {
    result.push(new Date(current));
    //   console.log(">>>>",current) // Move to the next week
    current.setDate(current.getDate() + 7);
  }

  // Ensure that the last date added is within the range
  if (current > end) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    let flag = true
    result.forEach((item) => {
      if (item.getDate() == new Date(end).getDate()) { flag = false }
    })
    if (flag)
      result.push(new Date(end));
  }
  let dt = result?.findIndex((item) => new Date() < item)
  console.log("DIFF", result, dt + 1, new Date().getDate())
  return { currWeek: dt + 1, isNotify: result[dt==-1 ? 0 : dt].getDay() - 2 == new Date().getDay() }
};