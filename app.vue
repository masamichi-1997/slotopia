<template>
  {{ currentDate }}
  <br />
  {{ form }}

  <TimeSlotSelector
    :schedules="schedules"
    @time-range-selected="onTimeRangeSelected(startTime, endTime)"
  />
</template>

<script setup lang="ts">
import { DateFormatter } from '@/utils/date'

const schedules = ref()
const currentDate = new DateFormatter().formatJapaneseDate()

// ストアでいいかも？
const startTime = new DateParser(
  `${currentDate} 09:00:00`
).parseJapaneseDateTime()
const endTime = new DateParser(
  `${currentDate} 18:00:00`
).parseJapaneseDateTime()

const form = ref({
  startTime: '',
  endTime: '',
})

const onTimeRangeSelected = (startTime: Date, endTime: Date) => {
  form.value.startTime = new DateFormatter(startTime).formatJapaneseDateTime()
  form.value.endTime = new DateFormatter(endTime).formatJapaneseDateTime()
}

onMounted(() => {
  schedules.value = getAvailableReservations(startTime, endTime)
})
</script>
