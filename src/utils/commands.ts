export enum Action {
  poweroff,
  sleep,
  lock,
}

/**
 * Returns the command to give to exec.
 *
 * It doesn't matter if the command requires root privilges, systemd uses polkit, which will ask for authentication by itself
 *
 * @param time
 * @param isRoot
 * @param action
 */
export function setTransientTimer(time: Date, isRoot: boolean, action: Action) {
  const command = (() => {
    switch (action) {
      case Action.lock:
        return "xdg-screensaver lock";
      case Action.poweroff:
        return "systemctl poweroff";
      case Action.sleep:
        return "systemctl sleep";
    }
  })();

  return `systemd-run ${isRoot ? "" : "--user"}  --on-active="${10}" ${command} `;
}
