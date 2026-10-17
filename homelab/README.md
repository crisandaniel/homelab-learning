# Homelab track

Learning Docker, Kubernetes and the infrastructure around them **by building a real home lab**,
one short task at a time. Secondary track: 1–2 sessions a week (the dev track is the main one,
see the [root README](../README.md)).

Each task has a clear goal and a verifiable "Done when" check. Each tool choice is an ADR in
[`docs/decisions/`](docs/decisions/). The AI mentor follows the root [`AGENTS.md`](../AGENTS.md)
plus [`AGENTS.md`](AGENTS.md) in this folder.

## How I work

1. Pick the next unchecked task below. If its file does not exist yet, ask the agent to create it.
2. **Predict** what a command will do before running it.
3. Stuck for more than 20 minutes: open the next hint, or ask, saying first what I tried.
4. Done: fill "In my own words", add flashcards in Anki (export to `../flashcards.tsv`), write a `[homelab]` entry in
   `../JOURNAL.md`, tick the box, commit with the `homelab` prefix.
5. End of phase: tag it (`git tag homelab-phase-0-done`) and ask for a **quiz**.

## The lab

| | |
|---|---|
| Server | Mac mini M5 Pro, 64 GB RAM, 512 GB SSD, 10 GbE (arm64) |
| Storage | Synology DS1522+ (1 GbE, 10 GbE module later) |
| Host role | The Mac mini is **production**: real services run there in containers. All experiments run in VMs or containers, never on the host itself |
| Practice app | Docker [example-voting-app](https://github.com/dockersamples/example-voting-app) (source only, my own Dockerfiles and manifests) |

```
vote (Python) → Redis (queue) → worker (.NET) → Postgres → result (Node)
```

## Progress

### Phase 0: Setup → [`phases/0-setup`](phases/0-setup/)
The lab survives a reboot and I can reach it from outside the home.

- [ ] 0.1 Mac mini as a headless server
- [ ] 0.2 Network: fixed addresses for the Mac mini and the NAS
- [ ] 0.3 SSH with keys and Screen Sharing on the LAN
- [ ] 0.4 Remote access from outside the home
- [ ] 0.5 NFS shares on the Synology
- [ ] 0.6 Container runtime on macOS
- [ ] 0.7 VM tool: first throwaway VM with cloud-init
- [ ] 0.8 Reboot test: everything comes back by itself
- [ ] 0.9 Review the setup ADRs and mark them Accepted

### Phase 1: Linux, what containers stand on
- [ ] 1.1 Processes and signals (`ps`, `top`, SIGTERM vs SIGKILL)
- [ ] 1.2 Networking basics (`ip`, `ss`, `curl`, `dig`)
- [ ] 1.3 Files, permissions, users and UIDs
- [ ] 1.4 systemd services and logs (`systemctl`, `journalctl`)
- [ ] 1.5 A "container" without Docker: `unshare`
- [ ] 1.6 Namespaces and cgroups: what a process sees vs. what it may use

### Phase 2: Docker
- [ ] 2.1 Lifecycle: `run`, `ps`, `logs`, `exec`, `stop`, `rm`
- [ ] 2.2 Images vs. containers, layers (`history`, `inspect`)
- [ ] 2.3 Bring in the voting app source, delete their Docker files
- [ ] 2.4 Write a Dockerfile for `vote`
- [ ] 2.5 Multi-stage build for `worker`, layer cache, `.dockerignore`
- [ ] 2.6 Networks: containers find each other by name
- [ ] 2.7 Volumes vs. bind mounts: Postgres data survives `rm`
- [ ] 2.8 Env vars, restart policies, memory/CPU limits, OOMKilled
- [ ] 2.9 Debugging a container that exits immediately
- [ ] 2.10 Registry: push, pull, run a private registry
- [ ] 2.11 Multi-arch images with `buildx` (arm64 + amd64)

### Phase 3: Docker Compose
- [ ] 3.1 The whole voting app in one `compose.yaml`
- [ ] 3.2 Healthchecks and start order
- [ ] 3.3 `.env`, profiles, override files
- [ ] 3.4 First real home lab service, running permanently, data split local/NAS

### Phase 4: Kubernetes
- [ ] 4.1 Architecture: control plane vs. node, drawn from memory
- [ ] 4.2 A 3-node cluster built by a script in `infra/`
- [ ] 4.3 Pods from hand-written YAML; reading `describe` events
- [ ] 4.4 Deployments: scale, rolling update, rollback
- [ ] 4.5 Services and cluster DNS
- [ ] 4.6 Ingress with hostnames
- [ ] 4.7 ConfigMaps and Secrets
- [ ] 4.8 Probes: liveness, readiness, startup (including the worker, which has no HTTP)
- [ ] 4.9 Requests, limits, QoS; provoke Pending and OOMKilled
- [ ] 4.10 Storage: local vs. NFS StorageClasses
- [ ] 4.11 StatefulSet for Postgres
- [ ] 4.12 Namespaces; `crictl` on a node (the containerd/CRI mental model)
- [ ] 4.13 Chaos: stop a node, watch the pods move
- [ ] 4.14 CronJob: nightly Postgres backup to the NAS

### Phase 5: Production-like
- [ ] 5.1 Packaging: Helm or Kustomize
- [ ] 5.2 GitOps: a push to git reaches the cluster
- [ ] 5.3 Metrics and dashboards
- [ ] 5.4 Centralized logs
- [ ] 5.5 RBAC and ServiceAccounts
- [ ] 5.6 NetworkPolicy: only `worker` and `result` reach Postgres
- [ ] 5.7 TLS for the ingress
- [ ] 5.8 Secrets that can live in git (encrypted)
- [ ] 5.9 Local DNS instead of nip.io
- [ ] 5.10 (optional) Self-hosted VPN: replace or understand what Tailscale does
- [ ] 5.11 (optional) 10 GbE direct link Mac mini ↔ NAS on its own subnet

## Decisions

Setup decisions are already written as **Proposed** ADRs with options. Later ones get an ADR when I
reach them.

| ADR | Topic | Status |
|---|---|---|
| [001](docs/decisions/001-container-runtime-macos.md) | Container runtime on macOS | Proposed |
| [002](docs/decisions/002-vm-tool-for-k8s-nodes.md) | VM tool for Kubernetes nodes | Proposed |
| [003](docs/decisions/003-kubernetes-distribution.md) | Kubernetes distribution | Proposed |
| [004](docs/decisions/004-storage-layout.md) | Storage layout: local SSD vs. NAS | Proposed |
| [005](docs/decisions/005-nas-protocol.md) | NAS protocol for containers and VMs | Proposed |
| [006](docs/decisions/006-remote-access.md) | Remote access from outside the home | Proposed |
| [007](docs/decisions/007-local-dns.md) | Hostnames and DNS in the lab | Proposed |
| [008](docs/decisions/008-secrets-management.md) | Where lab credentials live | Accepted |

Ahead (no ADR yet): Helm vs. Kustomize · Argo CD vs. Flux · Prometheus/Grafana vs. alternatives ·
Loki vs. alternatives · Sealed Secrets vs. SOPS · which real services to self-host.

## What I can skip for now

dockershim history · Docker Swarm · etcd internals · writing operators/CRDs · service mesh.
Come back only when a real need shows up.
