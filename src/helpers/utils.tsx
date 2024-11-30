//const currentDate = new Date();

// src/helpers/utils.ts
export const calculateDaysLeft = (initDate: Date, deadline: Date) => {
  const difference = deadline.getTime() - initDate.getTime();
  const daysLeft = Math.ceil(difference / (1000 * 3600 * 24)); 
  return daysLeft;
};
