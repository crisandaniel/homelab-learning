# 008 Where lab credentials live

**Status:** Accepted
**Date:** 2026-10-06
**Decided in task:** before 0.3

## Context
The lab will collect credentials: SSH keys, NAS and router passwords, DSM accounts, kubeconfigs,
`.env` values. Hard rule: **no secrets in git**. They still need to live somewhere safe that
survives a lost laptop and works from any device.

I already pay for 1Password. This is not something I want to spend learning time on.

Out of scope: how **apps in the cluster** get their secrets (SOPS, Sealed Secrets, External Secrets
Operator). That gets its own ADR at task 4.7, after I have seen a plain Kubernetes `Secret`.

## Options

| Option | Pros | Cons |
|---|---|---|
| **1Password** (existing subscription) | Already paid and installed; CLI `op` for scripts; SSH agent with Touch ID | Third-party cloud service |
| **Bitwarden / Vaultwarden** | Open source, can self-host on the NAS | New tool to set up; self-hosting means I own its backups |
| **Cloud secret manager** (AWS, GCP, Azure) | Real-world skill | Account, IAM and cost for a home lab; overkill |
| **Files on disk only** | Nothing to set up | No backup, no sync, easy to commit by mistake |

**Leaning:** 1Password, since it is already there. Do SSH the classic way in task 0.3 (keys on disk)
to learn how it works, then optionally move the key into the 1Password SSH agent.

## Decision
All lab passwords and credentials go into **one 1Password vault** named `homelab`.

## Consequences
- Easier: one place to look, backed up and synced, nothing secret in the repo.
- Kubeconfigs are stored there only as a backup; the source of truth is the server, they can be regenerated.
- Later, optional: use `op run` / `op read` so `.env` files with real values never exist on disk (phase 3).
- Revisit at 4.7: secrets for apps in the cluster (separate ADR).
- Reversible: 1Password and Bitwarden import each other's exports.
- Not self-hosting the vault on the Mac mini: it would hold the credentials needed to recover the
  Mac mini itself (FileVault recovery key, NAS admin, router, Tailscale). Vaultwarden stays a
  possible learning project for 3.4, not a second place for real passwords.
