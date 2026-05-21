/** Homepage v2 rollout — set NEXT_PUBLIC_HOME_V2=false to disable (rollback). */
export function isHomepageV2Enabled(): boolean {
  return process.env.NEXT_PUBLIC_HOME_V2 !== "false";
}
