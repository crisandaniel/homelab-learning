# 006 Remote access from outside the home

**Status:** Proposed
**Date:** 2026-10-06
**Decided in task:** 0.4

## Context
I need SSH and desktop access to the Mac mini, plus access to DSM and to lab services, from outside
the home. Hard rule: **no router ports opened** for SSH or desktop.

A note on names: **WireGuard** is a free, open-source VPN protocol. Commercial VPN providers use it,
but their purpose is different (route my traffic out through their servers). Here the goal is to get
**into** my own network.

## Options

| Option | Pros | Cons |
|---|---|---|
| **Tailscale** | Built on WireGuard; no open ports; clients for Mac, NAS, phone; subnet router; free Personal plan | Coordination server is a third-party service |
| **Headscale** | Open-source Tailscale control server, same clients | Needs a server reachable from the internet (e.g. a cheap VPS) |
| **NetBird** | Open source, cloud free tier or self-hosted | Smaller ecosystem |
| **WireGuard by hand** (router or Synology VPN Server) | Fully mine; great for understanding VPNs | Port forwarding, public IP or dynamic DNS, manual key management |
| **Cloudflare Tunnel** | Free, no open ports, good for web apps | Clumsy for SSH and desktop |

**Leaning:** Tailscale now, so time goes to learning the lab. A self-hosted VPN can become task 5.10.

| Need | How |
|---|---|
| SSH to the Mac mini | macOS Remote Login over the Tailscale IP, **keys only** |
| Desktop | macOS Screen Sharing over Tailscale |
| DSM | Tailscale package on the Synology |
| VMs and services | Mac mini as a Tailscale **subnet router** |

Check before deciding: current Tailscale pricing and limits for personal use, and which macOS
variant of Tailscale runs **before login** (matters for a headless server after a reboot).

## Decision

## Consequences
