export type Achievement = {
  title: string;
  status: "not_started" | "completed";
};

/**
 * Gets the achievements of the given user.
 */
export function useAchievements(userId: string) {
  const achievements: Achievement[] = [];
  return {
    achievements,
  };
}
