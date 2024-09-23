<template>
  <table v-for="schedule in schedules">
    <th>{{ schedule.date }}</th>
    <td>
      <table v-for="slot in schedule.slots">
        <th @click="handleSelectedTime(schedule.date, slot.time)">
          {{ slot.time }}
        </th>
      </table>
    </td>
  </table>
</template>

<script setup lang="ts">
import type { Schedules } from '@/composables/available-reservations'
import { addMinute, diffMinutes, sameDay } from '@formkit/tempo'

const selectedStartTime: Ref<Date | undefined> = ref()
const selectedEndTime: Ref<Date | undefined> = ref()

defineProps<{
  schedules: Schedules
}>()

const emit = defineEmits<{
  (e: 'timeRangeSelected', startTime: Date, endTime: Date): void
}>()

// 時間をリセットする関数
const resetSelectedTimes = () => {
  selectedStartTime.value = undefined
  selectedEndTime.value = undefined
}

// 開始時間よりも前の時間を選択した場合の処理
const updateTimesForEarlierSelection = (formattedTime: string) => {
  selectedEndTime.value = addMinute(selectedStartTime.value!, 30)
  selectedStartTime.value = addMinute(formattedTime, 0)
}

const handleSelectedTime = (date: string, time: string) => {
  const formattedTime = `${date} ${time}:00`

  // 未選択の場合、開始時間を設定
  if (!selectedStartTime.value) {
    selectedStartTime.value = addMinute(formattedTime, 0)
    return
  }

  // 同じ時間を再度選択した場合、時間をリセット
  if (diffMinutes(formattedTime, selectedStartTime.value) === 0) {
    resetSelectedTimes()
    return
  }

  // 同じ日付で後の時間を選択した場合、終了時間を設定
  if (sameDay(selectedStartTime.value, formattedTime)) {
    if (diffMinutes(formattedTime, selectedStartTime.value) > 0) {
      selectedEndTime.value = addMinute(formattedTime, 30)
      triggerTimeRangeSelection()
    } else {
      updateTimesForEarlierSelection(formattedTime)
    }
    return
  }

  // 別の日付を選択した場合、開始時間を再設定
  selectedStartTime.value = addMinute(formattedTime, 0)
  selectedEndTime.value = undefined
}

const triggerTimeRangeSelection = () => {
  if (selectedStartTime.value && selectedEndTime.value) {
    emit('timeRangeSelected', selectedStartTime.value, selectedEndTime.value)
  }
}
</script>
