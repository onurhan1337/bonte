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

export async function fetcher<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);

  // If the server responds with a non-OK status, throw an error.
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  // If the server responds with a OK status, parse the JSON and return it.
  return res.json();
}

export default fetcher;
