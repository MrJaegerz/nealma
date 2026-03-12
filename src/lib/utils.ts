import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function modalityLabel(modality: string): string {
  switch (modality) {
    case "domicile":
      return "\u00C0 domicile";
    case "visio":
      return "Visio";
    case "cabinet":
      return "Cabinet";
    case "les_deux":
      return "Domicile / Visio";
    default:
      return modality;
  }
}
