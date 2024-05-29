export const getGreeting = (): string => {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export function formatDate(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 hours to 12 for 12 AM/PM
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${formattedHours}:${formattedMinutes} ${ampm}, ${day}-${month}-${year}`;
}

export function generateRandom7DigitNumber() {
  const min = 1000000;
  const max = 9999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
