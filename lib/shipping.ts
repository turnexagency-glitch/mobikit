/**
 * Tarif livraison (transporteur Maroc) :
 * Base  : 20 DH intra-Casablanca / 35 DH inter-villes
 * Supplément poids :
 *   S  0–5 Kg   → inclus
 *   M  5–10 Kg  → +3 DH
 *   L  10–15 Kg → +4 DH
 *   XL 15–30 Kg → +5 DH/Kg (total du colis)
 */
export function calculateShipping(totalWeightKg: number, ville: string): number {
  if (!ville) return 0

  const base = ville === 'Casablanca' ? 20 : 35

  let supplement = 0
  if (totalWeightKg <= 5) {
    supplement = 0
  } else if (totalWeightKg <= 10) {
    supplement = 3
  } else if (totalWeightKg <= 15) {
    supplement = 4
  } else {
    supplement = Math.ceil(totalWeightKg) * 5
  }

  return base + supplement
}

export function shippingZoneLabel(ville: string): string {
  return ville === 'Casablanca' ? 'Intra-Casablanca' : 'Inter-villes'
}
