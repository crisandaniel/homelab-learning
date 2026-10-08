# 0.5 NFS shares on the Synology

**Why:** Containers and VMs are disposable; the data they need often is not. Shared storage that
outlives them is the base for backups and, later, Kubernetes volumes.
**Concepts:** NFS exports, NFS permissions by IP, UID/GID mapping, squash (root squash, all squash),
privileged vs. non-privileged ports
**Prerequisites:** 0.2, read [ADR 004](../../../docs/decisions/004-storage-layout.md) and
[ADR 005](../../../docs/decisions/005-nas-protocol.md)
**Time box:** 45–60 min

## Requirements
- [ ] ADR 004 and ADR 005 decided
- [ ] NFS is enabled on the Synology
- [ ] Shares exist for the uses decided in ADR 004 (e.g. `k8s`, `backups`, `media`)
- [ ] NFS access is limited to the lab's IP addresses, not the whole network
- [ ] A share mounts on the Mac mini and is writable
- [ ] I can explain which user owns a file created over NFS, and why

## Done when
A file created over NFS from the Mac mini shows up in DSM File Station, and I wrote down which owner
DSM shows for it.

## Hints

<details><summary>Hint 1: direction</summary>

Two places on the Synology: turning on the NFS service, and the NFS permissions of each shared folder.
On the Mac you mount the share into an empty directory.
</details>

<details><summary>Hint 2: concept / where to read</summary>

NFS (with `sec=sys`) does not send a username, only a numeric UID. Compare `id -u` on the Mac with
what the NAS shows as owner. Read what each squash option does to that number. Synology's help for
"NFS permissions" explains every field.
</details>

<details><summary>Hint 3: specific</summary>

DSM: Control Panel → File Services → NFS; then Shared Folder → Edit → NFS Permissions.
macOS uses non-privileged ports by default, so either allow them on the share or mount with
`-o resvport`. Mount: `sudo mount -t nfs <nas-ip>:/volume1/<share> ~/nfs-test`. The exact export
path is shown at the bottom of the NFS permissions dialog.
</details>

---

## My prediction (before)

## What actually happened

## What broke and why

## In my own words
