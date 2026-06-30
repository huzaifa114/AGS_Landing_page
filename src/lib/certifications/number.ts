export function normalizeCertificationNumber(input: string): string {
  return input.trim().toUpperCase();
}

export function generateCertificationNumber(sequence = 1): string {
  return `WW-${String(sequence).padStart(8, "0")}`;
}
