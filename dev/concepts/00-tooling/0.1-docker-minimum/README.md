# 0.1 Docker minimum for dev

**Why:** Every exercise and project in this track runs in a throwaway container. Five or six Docker
commands, understood, are enough to start; the homelab track goes deeper later.
**Read:** [Docker: `docker run` reference](https://docs.docker.com/reference/cli/docker/container/run/)
(only `--rm`, `-it`, `-v`, `-w`, `-p`, `-d`, `--name`) and the
[Node.js "Introduction" page](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
(it has a minimal HTTP server) (~20 min)
**Skip:** Dockerfiles, Compose, networks, everything else for now.
**Time box:** 45–60 min

## Write (material closed)
Work in this folder.
- [ ] `hello.js` that prints something, run with Node **inside a container**, and the container is
      gone afterwards
- [ ] A Node REPL opened inside a container (interactive), then exited
- [ ] `server.js`: a minimal HTTP server, running in a **detached** container, reachable from the
      browser on the Mac
- [ ] Its logs followed live, a shell opened inside it to look around, then stopped and removed
- [ ] A short way to run any file without typing the whole command (shell alias or a small script
      in `dev/bin/`)
- [ ] `notes.md`: each flag I used, in one line, in my own words

## Done when
- My short command runs `hello.js` and prints its output.
- `http://localhost:3000` shows the server's response in the browser.
- `docker ps -a` shows no leftover containers from this task.

## Predict
`server.js` listens on `127.0.0.1:3000` **inside** the container, and the container is started with
`-p 3000:3000`. What happens when you open `http://localhost:3000` on the Mac? Why?

<details><summary>Answer</summary>

The connection fails (reset or empty reply). Inside the container, `127.0.0.1` means "only this
container". Traffic forwarded by `-p` arrives on the container's network interface, not on its
loopback, so nobody is listening there. The server must listen on `0.0.0.0` (all interfaces).
This is the most common "my dev server in Docker doesn't work" bug.
</details>

<details><summary>Hint: if stuck on the command</summary>

The shape is `docker run [flags] <image> <command>`. You need the official `node` image (use the
current LTS tag, e.g. `node:24`; check nodejs.org), your folder mounted somewhere inside the
container, and that folder as the working directory. `"$PWD"` is the current folder on the Mac.
</details>

---

## What surprised me

## In my own words
