import { format, isToday, isYesterday } from 'date-fns'
import { format as jalaliFormat } from 'date-fns-jalali'
export function FormatDate(dateString) {
  const date = new Date(dateString)

  if (isToday(date)) {
    return 'Today'
  } else if (isYesterday(date)) {
    return 'Yesterday'
  } else {
    return format(date, 'EEEE, MMMM do')
  }
}

export function FormatFaDate(dateString) {
  const date = new Date(dateString)

  if (isToday(date)) {
    return 'امروز'
  } else if (isYesterday(date)) {
    return 'دیروز'
  } else {
    return jalaliFormat(date, 'EEEE,d  MMMM ')
  }
}
export function formatTime(dateString) {
  const date = new Date(dateString)
  return format(date, 'HH:mm')
}
