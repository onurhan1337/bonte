import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserId(id: string): string | null {
  if (id && typeof id === "string") {
    const parts = id.split("|");
    if (parts.length === 2) {
      const userId = parts[1];
      return userId;
    } else {
      console.error("Invalid user identifier format");
    }
  } else {
    console.error("Invalid input for getUserId function");
  }

  return null;
}
