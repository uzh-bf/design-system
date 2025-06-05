import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function parseTags(tagsJson: string): string[] {
  try {
    return JSON.parse(tagsJson)
  } catch (e) {
    console.error('Error parsing tags:', e)
    return [] // Return empty array in case of error
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
