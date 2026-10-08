# 0.2 Fixed addresses for the Mac mini and the NAS

**Why:** NFS permissions, SSH configs and DNS names all point at IP addresses. If an address changes
after a router restart, half the lab breaks in confusing ways.
**Concepts:** DHCP, DHCP reservation vs. static IP, subnet, gateway, DNS server, MAC address
**Prerequisites:** 0.1
**Time box:** 30–45 min

## Requirements
- [ ] The Mac mini is on **wired** Ethernet, not Wi-Fi
- [ ] The Mac mini and the NAS always get the same IP (decide: reservation in the router or static)
- [ ] I can write down, without looking: my subnet, gateway, DNS server, the mini's IP, the NAS's IP
- [ ] The values are recorded in `infra/network.md` (IPs are fine in git; passwords are not)

## Done when
After renewing the DHCP lease (or restarting the router), both devices have the same IPs as before,
and `ping <nas-ip>` from the Mac mini answers.

## Hints

<details><summary>Hint 1: direction</summary>

There are two ways to get a fixed IP: tell the router "always give this MAC address this IP", or
configure the IP on the device itself. Think about which one keeps all the knowledge in one place.
</details>

<details><summary>Hint 2: concept / where to read</summary>

Reservations live in the router's admin page, usually under DHCP or LAN. You need the device's MAC
address. On the Synology: Control Panel → Network → Network Interface. On the Mac: System Settings →
Network → Ethernet → Details.
</details>

<details><summary>Hint 3: specific</summary>

On macOS: `ipconfig getifaddr en0` (the Ethernet interface may have a different name, check
`networksetup -listallhardwareports`), `route -n get default` for the gateway,
`scutil --dns` for DNS. To renew: Network → Ethernet → Details → TCP/IP → Renew DHCP Lease.
</details>

---

## My prediction (before)

## What actually happened

## What broke and why

## In my own words
