const { parse, format } = require("date-fns");
const time = 86400000;
const calculatePrice = (
  paymentType,
  numberOfSeat,
  startDate,
  duration,
  plan
) => {
  plan.toLowerCase();
  let amount;
  let totalAmount;
  let endDate;

  const date = parse(startDate, "yyyy/MM/dd", new Date());

  let formattedDate = format(date, "yyyy-MM-dd");
  console.log(date, formattedDate, startDate);
  if (paymentType === "sterling-pos") {
    if (plan === "daily") {
      amount = 1980;
      totalAmount = parseInt(duration) * amount * +numberOfSeat;
      endDate = formatDate(date, duration);
    }
    if (plan === "weekly") {
      amount = 9700;
      let durationInWeeks = +duration * 7;
      totalAmount = durationInWeeks * amount * +numberOfSeat;
      endDate = formatDate(date, durationInWeeks);
    }
    if (plan === "monthly") {
      amount = 39100;
      let durationInMonths = +duration * 30;
      totalAmount = durationInMonths * amount * +numberOfSeat;
      endDate = formatDate(date, durationInMonths);
    }
  } else {
    if (plan === "daily") {
      amount = 3980;
      totalAmount = parseInt(duration) * amount * +numberOfSeat;
      endDate = formatDate(date, duration);
      console.log("Ans", endDate);
    }
    if (plan === "weekly") {
      amount = 19700;
      let durationInWeeks = +duration * 7;
      totalAmount = durationInWeeks * amount * +numberOfSeat;
      endDate = formatDate(date, durationInWeeks);
    }
    if (plan === "monthly") {
      amount = 79100;
      let durationInMonths = +duration * 30;
      endDate = formatDate(date, durationInMonths);
    }
  }
  console.log(totalAmount, amount, endDate);
  return {
    totalAmount,
    amount,
    endDate,
  };
};

const formatDate = (date, duration) => {
  const endDate = new Date(date.getTime() + +duration * time);
  formattedDate = format(endDate, "yyyy-MM-dd");
  return formattedDate;
};
calculatePrice("sterling-pos", 3, "2022/09/08", 4, "weekly");
