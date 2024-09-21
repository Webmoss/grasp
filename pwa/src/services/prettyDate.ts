export default function(timestamp: number) {
  const date = new Date(timestamp * 1000);

  // Get day, month, year, hours, and minutes
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'pm' : 'am';

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Convert 0 hour to 12 for 12-hour format
  const formattedHours = String(hours).padStart(2, '0');

  // Format the date and time
  return `${day}/${month}/${year} ${formattedHours}:${minutes}${period}`;
}
