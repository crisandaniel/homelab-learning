# 009 Where Home Assistant runs

**Status:** Accepted
**Date:** 2026-11-13
**Decided in task:** side quest (early 3.4: first real home lab service)

## Context
Home Assistant (HA) must run 24/7: if it is down, automations stop. It needs to discover devices on
the LAN (mDNS, SSDP), which in Docker means `network_mode: host`. It keeps its state in SQLite.

Hardware: the Synology DS1522+ (AMD Ryzen R1600, always on, Container Manager and Virtual Machine
Manager available) and the Mac mini (main compute: production containers plus the lab, arm64).

Constraints from earlier ADRs:
- 004: SQLite must not live on NFS/SMB. A volume on the NAS's own disks, used by a container on
  the NAS, is local storage for that container, so this is fine.
- 001: every Docker setup on macOS runs containers inside a hidden Linux VM. `network_mode: host`
  means the VM's network, not the Mac's LAN interface, so multicast discovery (mDNS/SSDP) is
  unreliable or broken there.

## Options

| Option | Pros | Cons |
|---|---|---|
| **A. HA Container on the NAS** (Container Manager, compose) | Always on; practices Docker and compose; one `compose.yaml` in git | No add-ons store (extra services are separate containers); updates by pulling a new image |
| **B. HA OS in a VM on the NAS** (Virtual Machine Manager) | Full HA: add-ons, built-in backups, one-click updates | A black box: little Docker learning; takes more RAM |
| **C. HA Container on the Mac mini** | Fits "compute on the Mac mini" | Device discovery unreliable (containers live in a VM, see 001); HA would depend on macOS updates and reboots |
| **D. Dedicated device** (HA Green, Raspberry Pi) | Isolated, simplest for HA | Extra cost and one more device; no learning value for this repo |

**Leaning:** A. It is the option that teaches the most (compose, volumes, host networking,
updates) and runs on hardware that is always on. Move to B later if add-ons become a must.

Open questions before deciding:
- Do you have (or plan) Zigbee/Thread/Z-Wave devices with a USB dongle? USB passthrough to a
  container on Synology can need extra work.
- Do you need add-ons (e.g. Mosquitto, Zigbee2MQTT, ESPHome)? With A they become extra
  containers in the same compose file.

## Decision

- Chose container on NAS
  - no extra devices 
  - less load on NAS
  - learning more about docker

## Consequences

- Containerized HomeAssistant lacks built-in apps/add-ons. To fix this will require more containers.
