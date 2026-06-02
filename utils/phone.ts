export const PHONE_INPUT_PROPS = {
  inputMode: "tel",
  pattern: "[0-9+ ]*",
} as const;

export function sanitizePhoneInput(value: string): string {
  // Allow digits, spaces, and a single leading "+"
  const cleaned = String(value).replace(/[^\d+ ]/g, "");
  const hasLeadingPlus = cleaned.trimStart().startsWith("+");
  const withoutPluses = cleaned.replace(/\+/g, "");
  return hasLeadingPlus ? `+${withoutPluses}` : withoutPluses;
}

