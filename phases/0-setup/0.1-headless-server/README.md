# 0.1 Mac mini as a headless server

**Why:** A server that sleeps, or stays off after a power cut, is not a server. Everything later
(remote access, VMs, services) assumes the machine is up.
**Concepts:** power management (`pmset`), FileVault vs. auto-login (security vs. availability),
things that start at boot vs. at login
**Prerequisites:** none
**Time box:** 30–45 min

## Requirements
- [ ] The Mac mini never sleeps on its own (the display may sleep)
- [ ] It starts by itself after a power failure
- [ ] It has a short, clear hostname (e.g. `mini`)
- [ ] I have decided on **FileVault** and **auto-login**, and written down the trade-off below
- [ ] I have decided how macOS updates are handled (automatic install or manual)

## Done when
`pmset -g` shows that system sleep is disabled and that the machine restarts automatically after a
power failure, and `scutil --get LocalHostName` prints the chosen name.

## Hints

<details><summary>Hint 1: direction</summary>

Most of this is in System Settings → Energy. The terminal tool that shows (and changes) the same
settings is `pmset`. Read what `pmset -g` prints before changing anything.
</details>

<details><summary>Hint 2: the FileVault trade-off</summary>

With FileVault on, the disk stays locked after a reboot until someone types the password at the
boot screen. Until then nothing starts: no Tailscale, no SSH, no VMs. Auto-login is also disabled
while FileVault is on. Read about `fdesetup authrestart` (planned reboot that unlocks once) and
decide what matters more for this machine: data at rest encrypted, or coming back unattended.
</details>

<details><summary>Hint 3: specific</summary>

Look at the `sleep`, `disksleep`, `displaysleep` and `autorestart` keys in `man pmset`.
Hostname: System Settings → General → Sharing → Local hostname, or `scutil --set`.
</details>

---

## My prediction (before)

## What actually happened

## What broke and why

## My FileVault / auto-login decision and why

## In my own words
