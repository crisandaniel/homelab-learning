# 004 Storage layout: local SSD vs. NAS

**Status:** Proposed
**Date:** 2026-10-06
**Decided in task:** 0.5

## Context
Compute runs on the Mac mini (512 GB SSD, an external 1 TB NVMe possible later). The Synology
DS1522+ has the capacity, on 1 GbE today (~110 MB/s), 10 GbE later.

Databases on network storage are a known source of trouble: **SQLite on NFS/SMB can corrupt** because
of file locking, and Postgres on NFS is slow on `fsync` and sensitive to network drops. Many home lab
apps use SQLite.

## Options

| Option | Pros | Cons |
|---|---|---|
| **Everything on the NAS** | One place for all data, NAS snapshots cover everything | Databases at risk; everything depends on the network |
| **Everything local** | Fastest, simplest | Data lost if the Mac mini dies; limited space |
| **Split** | Databases and hot data local (fast, safe); media, large files and backups on the NAS | Two places to think about; needs a backup job |

**Leaning:** Split.

| Data | Where |
|---|---|
| Databases, app state, VM disks | Mac mini SSD (external NVMe if space runs out) |
| Media, photos, large files | NAS |
| Backups of local databases | NAS, written by a scheduled job |

In Phase 4, Postgres on NFS is still done **on purpose**, as an exercise, to feel the difference
between StorageClasses.

External NVMe: buy only when the internal SSD fills up. If bought: Thunderbolt/USB4 enclosure,
APFS, and check it is mounted after a reboot before VMs start.

## Decision

## Consequences
