# Home Assistant on the NAS (compose)

**Why:** First service that runs for real, 24/7. If it breaks, the lights stop being smart: you
need to know where its data lives, how it restarts and how to update it without losing anything.
**Concepts:** compose file, image tags and pinning, host networking, bind mounts, restart policies,
environment variables, Synology Container Manager projects
**Prerequisites:** ADR 009 (decide and mark it Accepted first)
**Time box:** 45–60 min

## Requirements
- [x] A `compose.yaml` in this folder, written by you, with one service: Home Assistant from its
      official image
- [x] The image tag is a **specific version**, not `latest` or `stable`
- [x] The container sees the LAN directly, so Home Assistant can discover devices
- [x] Configuration lives in a folder on the NAS disks and survives deleting the container
- [x] The time zone is Romania's
- [x] The container starts by itself after a crash and after a NAS reboot, but stays stopped if
      you stop it on purpose
- [x] Deployed on the NAS as a Container Manager **Project**, using this exact `compose.yaml`

## Done when
1. `http://<nas-ip>:8123` shows the Home Assistant onboarding page, and you create your user.
2. You delete the container (not the folder), recreate it from the project, and your user is
   still there.

## Hints
<!-- Open one at a time, only after 20 minutes stuck. -->

<details><summary>Hint 1: direction</summary>

Home Assistant's own docs have an installation page for "Container" with a Docker Compose
example. Read it, then write yours from memory and compare. Question everything in their example:
do you need every line?

</details>

<details><summary>Hint 2: concept / where to read</summary>

- Network: compose `network_mode` (what does `host` remove compared to the default bridge?).
- Data: bind mount vs. named volume. On Synology, shared folders live under `/volume1/...`.
- Restart: compare the compose `restart` policies; only one matches "unless I stopped it".
- Tags: the image's tag list on GitHub Container Registry; pick a release number.
- The NAS is **amd64** (AMD Ryzen) and the Mac is **arm64**: why can the same image name run on both?

</details>

<details><summary>Hint 3: specific</summary>

- Image: `ghcr.io/home-assistant/home-assistant:<version>`
- Config inside the container is at `/config`; mount a NAS folder such as `/volume1/docker/homeassistant` there.
- Time zone: the `TZ` environment variable, value `Europe/Bucharest`.
- `privileged: true` from the official example is only needed for USB/Bluetooth devices. Leave it out for now
  and note in "What broke" if something needs it.

</details>

---

## Install Guide

1. Install `Container Manager` on NAS 
- From `Container Manager` create new project and select folder inside `docker`: `home-assistant`
- Copy/Load [compose.yaml](./compose.yaml) file to project
- If it fails create `config` folder inside `docker/home-assistant` - HA will keep settings here

2. Access from Internet
- In Cloudflare -> Networks -> Tunnels create a new tunnel `home-assistant`
- Select `Docker` as `Operating System`
- From `Container Manager` on NAS create another project `cloudflare-tunnel` and load the content from [compose-cf-tunnel.yaml](./compose-cf-tunnel.yaml) and replace the token with the one from Cloudflare.
  - Now the container established a tunnel to CF and acts as a proxy to NAS ports since it uses the same IP address (`network_mode: host` from its compose file)
- Tunnel should be `Healthy`
- Edit tunnel and in `Routes` tab add a new route -> Published Application
  - Subdomain: `ha` or whatever name 
  - Domain: select which domain to use, I have learn2.dev
  - Service URL: http://<localip>:8123 (e.g. http://192.168.1.209:8123 in my case which is the NAS IP address)
- In `Home Assistant` -> Settings -> Network -> Reverse proxy:
  - Enable `Trust X-forwarded-For`
  - `+ Add Trusted proxies` -> add the IP of the NAS (e.g. 192.168.1.209)
- Enable TwoFactorAuthentication from the `Home Assistant` dashboard -> Click profile icon -> Security -> Multi-factor authentication modules

3. Enable backups
- disable Synology DSM integration: it requires an `admin` user, and HA (public on the internet) would store that password in plain text in `config/.storage`
- From Settings -> System -> Backups -> set to "This system"
- Emergency kit saved to 1Password
- Test with a manual backup
- Backups are stored on the NAS in `docker/home-assistant/config/backups/`

How it works:
- request on ha.learn2.dev -> Cloudflare -> Tunnel -> NAS: [`cloudflare-tunnel` -> forwards the request to IP:PORT configured which is the HomeAssistant -> `home-assistant` responds] 
