export function calculateNewRating(currentRating: number, ratingsCount: number, newRating: number): number {
  return ((currentRating * ratingsCount) + newRating) / (ratingsCount + 1)
}