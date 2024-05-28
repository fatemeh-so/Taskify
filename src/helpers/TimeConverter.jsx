import { format, isToday, isYesterday } from 'date-fns'

export function formatDate(dateString) {
  const date = new Date(dateString)

  if (isToday(date)) {
    return 'Today'
  } else if (isYesterday(date)) {
    return 'Yesterday'
  } else {
    return format(date, 'EEEE, MMMM do')
  }
}
export function formatTime(dateString) {
  const date = new Date(dateString)
  return format(date, 'HH:mm')
}
