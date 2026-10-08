# 005 NAS protocol for containers and VMs

**Status:** Proposed
**Date:** 2026-10-06
**Decided in task:** 0.5

## Context
Linux VMs, containers and (later) Kubernetes volumes need to reach shares on the Synology.
Finder access from the Mac is a separate need.

## Options

| Option | Pros | Cons |
|---|---|---|
| **NFS** | Native to Linux; Kubernetes NFS provisioners exist; low overhead | Permissions map by numeric UID/GID, which confuses at first; no real auth with `sec=sys` (restrict by IP) |
| **SMB** | Great for Finder and Windows; user/password auth | Awkward in Linux containers and Kubernetes; permission mapping issues |
| **iSCSI** | Block device: behaves like a local disk, fine for databases | One writer at a time; more complex; not shared storage |

**Leaning:** NFS for VMs, containers and Kubernetes, restricted to the lab's IP addresses.
SMB stays for Finder. iSCSI is worth a look later, as an experiment for databases.

Synology notes to verify during 0.5: enable NFS (v4.1 if available), set per-share NFS permissions,
understand the squash options, and "allow connections from non-privileged ports" if a macOS client
mounts the share.

## Decision

## Consequences
