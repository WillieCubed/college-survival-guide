/**
 * A hook that returns the current auth state of the user.
 */
export function useAuth() {
  const user = {
    id: "",
  };
  return {
    user,
  };
}
