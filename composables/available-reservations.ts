import { addDay, addMinute, isBefore } from '@formkit/tempo'

type Slot = {
  status: number
  time: string
}

type Slots = Slot[]

type Schedule = {
  date: string
  slots: Slot[]
}

export type Schedules = Schedule[]

const DEFAULT_INTERVAL = 30
const DEFAULT_SCHEDULE_DAYS = 7
const SLOT_STATUS = {
  available: {
    label: '予約可',
    value: 1,
  },
  reserved: {
    label: '予約不可',
    value: 2,
  },
  inquiry: {
    label: '要問い合わせ',
    value: 3,
  },
}

const splitTimeRange = (
  startTime: Date,
  endTime: Date,
  interval: number = DEFAULT_INTERVAL
): Slots => {
  const timeSlots: Slots = []

  let start = addMinute(startTime, 0)
  while (isBefore(start, endTime)) {
    timeSlots.push({
      status: SLOT_STATUS.available.value,
      time: new DateFormatter(start).formatJapaneseDateTime(),
    })
    start = addMinute(start, interval)
  }

  return timeSlots
}

const createSchedules = (
  startTime: Date,
  endTime: Date,
  date: Date,
  days: number = DEFAULT_SCHEDULE_DAYS
): Schedules => {
  return new Array(days).fill(0).map((value, index) => {
    const targetDay = addDay(date, index)
    const timeSlots = splitTimeRange(startTime, endTime)
    return {
      date: new DateFormatter(targetDay).formatJapaneseDate(),
      slots: timeSlots,
    }
  })
}

export const getAvailableReservations = (
  startTime: Date,
  endTime: Date,
  date: Date = new Date(),
  days: number = DEFAULT_SCHEDULE_DAYS
) => {
  const initialSchedules = createSchedules(startTime, endTime, date, days)
  return initialSchedules
}
