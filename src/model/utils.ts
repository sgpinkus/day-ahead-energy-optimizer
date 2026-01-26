import type { IntervalMinutes } from '@/types';

export interface TimeSettings {
  basis: number;
  intervalMinutes: IntervalMinutes;
  startIntervalOffset: number;
}

export function startTimeString(settings: TimeSettings) {
  const startHour = `${String(Math.floor(settings.startIntervalOffset * settings.intervalMinutes / 60)).padStart(2, '0')}`;
  const startMinutes = `${String((settings.startIntervalOffset * settings.intervalMinutes) % 60).padStart(2, '0')}`;
  return `${startHour}:${startMinutes}`;
}
