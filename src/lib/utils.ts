<<<<<<< HEAD
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
=======
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
>>>>>>> main
}
