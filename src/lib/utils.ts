import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MOBILE_NUMBER_REGEX = /^[6-9]\d{9}$/
export const AGE_REGEX = /^(?:1[89]|[2-9]\d|1[01]\d|120)$/
