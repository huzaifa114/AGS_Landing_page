/** Fixed design canvas — stack scales down to fit narrower viewports */
export const HERO_STACK_DESIGN = {
  width: 520,
  height: 440,
  minHeight: 248,
  minScale: 0.46,
} as const;

export function getHeroStackScale(containerWidth: number): number {
  const { width, minScale } = HERO_STACK_DESIGN;
  return Math.min(1, Math.max(minScale, containerWidth / width));
}
