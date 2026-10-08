# Phase 0: Setup

**Goal:** a lab that comes back by itself after a reboot, reachable from outside the home,
with shared storage on the NAS. No Kubernetes yet: just a solid base.

**Phase done when:** I reboot the Mac mini remotely, from outside the home, and within five minutes
I can SSH back in, run `docker ps` and mount a NAS share, without touching the machine.

| Task | Topic | Decides |
|---|---|---|
| [0.1](0.1-headless-server/README.md) | Mac mini as a headless server | |
| [0.2](0.2-network-addresses/README.md) | Fixed addresses for the Mac mini and the NAS | |
| [0.3](0.3-ssh-and-screen-sharing/README.md) | SSH with keys and Screen Sharing on the LAN | |
| [0.4](0.4-remote-access/README.md) | Remote access from outside the home | ADR 006 |
| [0.5](0.5-nfs-shares/README.md) | NFS shares on the Synology | ADR 004, 005 |
| [0.6](0.6-container-runtime/README.md) | Container runtime on macOS | ADR 001 |
| [0.7](0.7-first-vm/README.md) | First throwaway VM with cloud-init | ADR 002 |
| [0.8](0.8-reboot-test/README.md) | Reboot test | |
| [0.9](0.9-review-decisions/README.md) | Review the setup ADRs | |

0.1–0.3 can start as soon as the Mac mini is on the desk. 0.5 only needs the NAS.
