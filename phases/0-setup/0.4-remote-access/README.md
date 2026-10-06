# 0.4 Remote access from outside the home

**Why:** The lab is only useful if I can reach it from anywhere, and the way I reach it must not
expose SSH or the desktop to the whole internet.
**Concepts:** VPN vs. port forwarding, WireGuard, NAT traversal, overlay network (tailnet),
node key expiry, subnet router
**Prerequisites:** 0.3, read [ADR 006](../../../docs/decisions/006-remote-access.md)
**Time box:** 45–60 min

## Requirements
- [ ] ADR 006 decided (Decision + Consequences written)
- [ ] The Mac mini, the NAS and my phone/laptop are in the same private network (tailnet)
- [ ] The Mac mini's VPN client starts **at boot**, before anyone logs in
- [ ] The Mac mini does not drop out of the network when its key expires
- [ ] SSH and Screen Sharing work from outside the home
- [ ] DSM opens from outside the home
- [ ] No port forwarding rules were added to the router

## Done when
With the laptop on a phone hotspot (not the home Wi-Fi): `ssh mini` works over the VPN address,
Screen Sharing connects, and DSM opens in the browser.

## Hints

<details><summary>Hint 1: direction</summary>

Install the client on each device and log in with the same account. Then look for the settings
that matter for a **server**: when the client starts, and what happens when the device's key expires.
</details>

<details><summary>Hint 2: concept / where to read</summary>

Tailscale offers more than one macOS client; read their docs on the differences, especially which one
runs as a system daemon without a logged-in user. In the admin console, look at "key expiry" per
machine. The Synology package is in Package Center.
</details>

<details><summary>Hint 3: specific</summary>

`tailscale status` lists the machines and their 100.x addresses. Update the `Host mini` block in
`~/.ssh/config` or add a second alias (`mini-remote`) using the Tailscale name. Disable key expiry
for the Mac mini and the NAS in the admin console.
</details>

---

## My prediction (before)

## What actually happened

## What broke and why

## In my own words
