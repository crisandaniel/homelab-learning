# 0.2 Node and npm

**Why:** Every JS project starts with `package.json`. Knowing what dependencies, scripts and the
lockfile do saves hours of "works on my machine". Running it in Compose with `node_modules` in a
volume is the setup every mini-project will use.
**Read:** [npm: package.json](https://docs.npmjs.com/cli/configuring-npm/package-json)
(`name`, `scripts`, `dependencies`, `devDependencies`),
[npm: package-lock.json](https://docs.npmjs.com/cli/configuring-npm/package-lock-json) (first part),
[Docker Compose: quickstart](https://docs.docker.com/compose/gettingstarted/) (~30 min)
**Skip:** publishing packages, workspaces, `peerDependencies`.
**Time box:** 45–60 min

## Write (material closed)
Work in a `sandbox/` subfolder of this task.
- [ ] `package.json` created **inside a container** (not with npm on the Mac)
- [ ] One dependency and one dev dependency of my choice, installed inside the container
- [ ] A `start` script that runs a file using the dependency
- [ ] `compose.yaml` that runs `npm start`: code bind-mounted from the Mac, `node_modules` in a
      **named volume**
- [ ] `notes.md`: what `package-lock.json` is for, dependencies vs. devDependencies, and why
      `node_modules` must not come from the Mac

## Done when
- `docker compose up` runs the `start` script and the dependency works.
- There is **no** `node_modules` folder on the Mac in `sandbox/`.
- `docker volume ls` shows the named volume.

## Predict
1. You run `docker compose down`, then `docker compose up` again. Does npm need to reinstall the
   dependencies?
2. Same, but with `docker compose down -v`?

<details><summary>Answer</summary>

1. No. `down` removes containers and networks, but **named volumes survive**, so `node_modules`
   is still there.
2. Yes. `-v` also removes the named volumes declared in the compose file, so `node_modules` is gone.

Volumes outlive containers on purpose: that is how databases keep their data.
</details>

<details><summary>Hint: why not node_modules from the Mac?</summary>

The Mac is `darwin-arm64`, the container is `linux-arm64`. Packages with native code (esbuild,
bcrypt, sharp...) are compiled for one OS and crash on the other. A volume mounted at
`/app/node_modules` "hides" that folder from the bind mount.
</details>

---

## What surprised me

## In my own words
