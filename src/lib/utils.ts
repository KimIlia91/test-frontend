import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PartnersTable } from "./definitions"
import { DEFAULT_CURSOR } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentCursor(partners: PartnersTable[]) {
  return partners.length > 0 ? partners[partners.length - 1].id : DEFAULT_CURSOR;
}
