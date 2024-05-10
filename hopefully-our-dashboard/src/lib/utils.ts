import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimeDifference(timeIn: string, timeOut: string) {
  function toSeconds(time: string) {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
  const timeInSec = toSeconds(timeIn);
  const timeOutSec = toSeconds(timeOut);
  const diffSec = (timeOutSec - timeInSec);
  const diffArr = [Math.floor(diffSec / 3600), Math.floor((diffSec % 3600) / 60), diffSec % 60];
  const diff: string = diffArr.map(i => i.toString().padStart(2, "0")).join(":");
  return diff;
  
}

export function getRoadTime(distance: number) {
  const timeSec = distance / 16 * 3600;
  const timeArr = [Math.floor(timeSec / 3600), Math.floor((timeSec % 3600) / 60), timeSec % 60];
  const time: string = timeArr.map(i => i.toString().padStart(2, "0")).join(":");
  return time;
}