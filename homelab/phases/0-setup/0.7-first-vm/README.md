# 0.7 First throwaway VM with cloud-init

**Why:** The Kubernetes nodes in Phase 4 are VMs created by a script. If a VM can be destroyed and
rebuilt identically in one command, breaking things becomes cheap, and that is how I learn fastest.
**Concepts:** cloud-init (users, SSH keys, packages), infrastructure as code, disposable machines,
VM networking (NAT vs. bridged)
**Prerequisites:** 0.3, 0.5, read [ADR 002](../../../docs/decisions/002-vm-tool-for-k8s-nodes.md)
**Time box:** 45–60 min

## Requirements
- [ ] ADR 002 decided
- [ ] A cloud-init file in `infra/` creates a user with my **public** SSH key and installs the NFS client
- [ ] One command creates the VM from that file
- [ ] I SSH into the VM with my key
- [ ] The NFS share from 0.5 mounts inside the VM (the NAS allows the VM's IP, or I understand why not)
- [ ] I can say which IP the VM has and whether other devices on the LAN can reach it
- [ ] The VM is deleted and recreated, and it comes back identical

## Done when
Delete + recreate takes one command each, and in the new VM `df -h` shows the NFS share
after running the same mount command as before.

## Hints

<details><summary>Hint 1: direction</summary>

Start without cloud-init: launch a plain VM, look around, delete it. Then add cloud-init one piece at a
time (user first, then key, then packages) and recreate after each change.
</details>

<details><summary>Hint 2: concept / where to read</summary>

cloud-init docs, "users and groups" and "package update upgrade install" modules. The first line of the
file must be `#cloud-config`. Inside the VM, `cloud-init status --long` and `/var/log/cloud-init-output.log`
tell you what went wrong. The VM's IP is on a private network on the Mac: think about which IP the NAS
sees when the VM connects.
</details>

<details><summary>Hint 3: specific</summary>

Multipass: `multipass launch --name test --cloud-init infra/multipass/cloud-init.yaml`,
`multipass list`, `multipass delete --purge test`. Ubuntu package for NFS: `nfs-common`.
Public keys are fine in git; private keys never.
</details>

---

## My prediction (before)

## What actually happened

## What broke and why

## In my own words
