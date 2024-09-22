import { format, monthEnd, monthStart } from '@formkit/tempo'

export class DateFormatter {
  private date: Date
  constructor(initialDate = new Date()) {
    this.date = initialDate
  }
  fomatJapaneseDate() {
    return format(this.date, 'full')
  }
  formatJapaneseDateTime() {
    return format(this.date, { time: 'short' })
  }
  getStartOfMonth() {
    const startOfMonth = monthStart(this.date)
    return format(startOfMonth, 'long')
  }
  getEndOfMonth() {
    const endOfMonth = monthEnd(this.date)
    return format(endOfMonth)
  }
}
