/**
 * Returns the command to give to exec.
 *
 * It doesn't matter if the command requires root privilges, systemd uses polkit, which will ask for authentication by itself
 *
 * @param time - systemd time string
 * @param isRoot
 * @param action
 */
export function setTransientTimer(time: string, isRoot: boolean) {
  const command = "systemctl poweroff";

  return `systemd-run ${isRoot ? "" : "--user"}  --on-active="${time}" ${command} `;
}
