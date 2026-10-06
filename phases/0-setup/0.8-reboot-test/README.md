# 0.8 Reboot test

**Why:** Unattended reboots happen: power cuts, macOS updates. A lab that needs someone at the desk
after each one stops being used.
**Concepts:** boot order, services at boot vs. at login, "it worked once" vs. "it works after restart"
**Prerequisites:** 0.1–0.7
**Time box:** 30–45 min

## Requirements
- [ ] Before rebooting: a written list of what must come back (VPN, SSH, container runtime, VM tool,
      the test VM if it should autostart) and my **prediction** for each
- [ ] The reboot is triggered remotely, from outside the home, over the VPN
- [ ] Each item on the list is checked after the reboot, and differences from the prediction are explained
- [ ] Anything that did not come back is fixed and the test repeated

## Done when
From outside the home: `sudo reboot` on the Mac mini, and within five minutes `ssh mini` works,
`docker ps` works and the NFS share mounts, without touching the machine.

## Hints

<details><summary>Hint 1: direction</summary>

Sort the list into two groups: what starts when the machine boots, and what starts when a user logs in.
Your FileVault and auto-login decisions from 0.1 decide whether the second group ever starts.
</details>

<details><summary>Hint 2: concept / where to read</summary>

On macOS, things that start at boot are LaunchDaemons (`/Library/LaunchDaemons`), things that start at
login are LaunchAgents and Login Items. `launchctl list` shows what is loaded for the current user.
</details>

<details><summary>Hint 3: specific</summary>

If FileVault is on, a planned remote reboot needs `sudo fdesetup authrestart`.
Check the VM tool's documentation on whether instances restart after the host reboots.
</details>

---

## My prediction (before)

## What actually happened

## What broke and why

## In my own words
