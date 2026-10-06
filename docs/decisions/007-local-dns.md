# 007 Hostnames and DNS in the lab

**Status:** Proposed
**Date:** 2026-10-06
**Decided in task:** 4.6 (first need), revisited in 5.9

## Context
Kubernetes Ingress routes by hostname (`vote.…`, `result.…`), so services need names that resolve
to the lab. Typing IPs and ports works until there are more than three services.

How nip.io works: a public DNS service that returns the IP written inside the name.
`vote.192.168.1.50.nip.io` resolves to `192.168.1.50`. No setup at all.

## Options

| Option | Pros | Cons |
|---|---|---|
| **nip.io / sslip.io** | Zero setup | Needs internet; some routers block public answers with private IPs (DNS rebinding protection); ugly names |
| **`/etc/hosts`** | Simple, offline | Per device; no wildcards; does not reach phones |
| **Synology DNS Server** | Already have the NAS; wildcard zone like `*.lab.home` | Every device must use the NAS as DNS (router DHCP setting) |
| **Pi-hole / AdGuard Home** | DNS + ad blocking; nice UI | One more service to run and keep alive |
| **Router DNS** | Central | Depends heavily on the router model |
| **Tailscale MagicDNS** | Works remotely | Machine names only, no wildcard per service |

**Leaning:** nip.io in Phase 4, so DNS does not block the Kubernetes work. Local DNS (Synology DNS
Server or AdGuard Home) as task 5.9, which is a good lesson on how DNS resolution really works.

## Decision

## Consequences
