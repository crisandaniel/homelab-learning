# 0.3 SSH with keys and Screen Sharing on the LAN

**Why:** SSH is how I will manage the Mac mini, every VM and every Kubernetes node. Key-only login is
the baseline for anything reachable over a network.
**Concepts:** public/private key pairs, `authorized_keys`, `~/.ssh/config`, sshd configuration,
password vs. key authentication
**Prerequisites:** 0.2
**Time box:** 45–60 min

## Requirements
- [ ] Remote Login (SSH) and Screen Sharing are enabled on the Mac mini, only for my user
- [ ] My laptop logs in with a key, using a short alias (`ssh mini`)
- [ ] **Password** login over SSH is disabled
- [ ] I did not lock myself out (keep one working session open while changing the SSH config)
- [ ] Screen Sharing works from the laptop on the LAN

## Done when
`ssh mini` logs in without a password, and
`ssh -o PubkeyAuthentication=no mini` is refused with `Permission denied`.

## Hints

<details><summary>Hint 1: direction</summary>

Three separate steps: create a key pair on the laptop, put the **public** half on the Mac mini,
tell the SSH server to stop accepting passwords. Do them in that order and test after each.
</details>

<details><summary>Hint 2: concept / where to read</summary>

`man ssh-keygen`, `man ssh_config`, `man sshd_config`. Prefer an `ed25519` key. Look at how
`/etc/ssh/sshd_config` includes extra files from a `.d` directory: adding a small file there is
cleaner than editing the main config.
</details>

<details><summary>Hint 3: specific</summary>

`ssh-keygen -t ed25519`, then `ssh-copy-id`. In `~/.ssh/config` a `Host mini` block with
`HostName`, `User` and `IdentityFile`. On the server: `PasswordAuthentication no` and
`KbdInteractiveAuthentication no`. Toggling Remote Login off and on in System Settings restarts sshd.
</details>

---

## My prediction (before)

## What actually happened

## What broke and why

## In my own words
