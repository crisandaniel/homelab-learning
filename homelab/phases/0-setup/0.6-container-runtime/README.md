# 0.6 Container runtime on macOS

**Why:** Phases 1–3 and the permanent home lab services run here. Knowing that Docker on a Mac is
really "Docker inside a Linux VM" explains a lot of later surprises (file sharing speed, networking,
architecture).
**Concepts:** Docker client vs. daemon, Docker contexts, the hidden Linux VM, arm64 vs. amd64
**Prerequisites:** 0.1, read [ADR 001](../../../docs/decisions/001-container-runtime-macos.md)
**Time box:** 30–45 min

## Requirements
- [ ] ADR 001 decided
- [ ] The runtime is installed and starts by itself when the Mac mini starts
- [ ] `docker run hello-world` works
- [ ] I can say which OS and CPU architecture the Docker daemon runs on, and why it is not macOS

## Done when
`docker info --format '{{.OSType}}/{{.Architecture}}'` prints a Linux OS with an arm64 architecture,
and I can explain in one sentence why it says Linux on a Mac.

## Hints

<details><summary>Hint 1: direction</summary>

Before running it, predict what `docker info` will say about the OS. Then read the full output of
`docker info` and `docker context ls`: who is the client, who is the server, where does the server live?
</details>

<details><summary>Hint 2: concept / where to read</summary>

Read the hello-world output carefully: it describes the client → daemon → image → container flow
step by step. Note the architecture name used by Linux for Apple Silicon (`aarch64` / `arm64`).
</details>

<details><summary>Hint 3: specific</summary>

Start-at-login is in the runtime's settings. Try
`docker run --rm alpine uname -a` and compare with `uname -a` on the Mac itself.
</details>

---

## My prediction (before)

## What actually happened

## What broke and why

## In my own words
