# 003 Kubernetes distribution

**Status:** Proposed
**Date:** 2026-10-06
**Decided in task:** 4.2

## Context
I need a real multi-node cluster on the VMs from ADR 002. The goal is learning how Kubernetes works,
not running it at scale. The cluster must be rebuildable by a script.

## Options

| Option | Pros | Cons |
|---|---|---|
| **k3s** | Light, one binary, real multi-node, uses containerd; ships with ingress (Traefik) and local storage | Bundles components, which hides some pieces (they can be disabled) |
| **kubeadm** | The "official" way; you see every component | More steps and more ways to fail; slower start |
| **kind** | Cluster in Docker containers, great for CI | Nodes are containers, not machines; chaos tests are less realistic |
| **minikube** | Popular in tutorials | Mostly single-node, oriented to local dev |
| **MicroK8s** | Snap-based, add-ons | Snap adds its own layer of concepts |
| **Talos Linux** | Immutable OS built only for k8s, API-managed | Very different model; better as a later challenge |

**Leaning:** k3s first, so time goes to Kubernetes concepts, not installation. Optional later: rebuild
the cluster with kubeadm once to see every component installed by hand.

## Decision

## Consequences
