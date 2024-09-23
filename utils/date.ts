import { format, monthEnd, monthStart, parse } from '@formkit/tempo'

export class DateFormatter {
  private date: Date
  constructor(initialDate = new Date()) {
    this.date = initialDate
  }
  formatJapaneseDate() {
    return format(this.date, 'YYYY-MM-DD')
  }
  formatJapaneseDateTime() {
    return format(this.date, 'HH:mm')
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

export class DateParser {
  private date: string
  constructor(initialDate: string) {
    this.date = initialDate
  }

  parseJapaneseDateTime() {
    return parse(this.date, 'YYYY-MM-DD HH:mm:ss')
  }
}
