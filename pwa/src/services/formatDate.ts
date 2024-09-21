export default function (date: string) {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-ZA', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Africa/Johannesburg',
  }).format(d);
}
