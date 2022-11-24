
# Zender Wikipedia embed

## General

This repo contains the source code to the Wikipedia embed application, this application is used for 2 purposes:
- Configurator for ToolForge (https://wiki-embed.toolforge.org)
- Script to preview Wikipedia articles

It is build with:

- node: `v16.14.0` (`lts/gallium`)
- yarn: `v1.22.5`
- npm: `v8.3.1`

For a complete list of packages and version check out the `package.json` file.

## Setup

1) Use the **Node version** specified in .nvmrc by running `nvm use` (or install `lts/gallium` manually).
2) **Install** all dependencies by running `yarn install` in the root of the project folder.
3) Run `yarn dev` to start the project.

### Yarn

The available commands for development are:

| command | runs                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------- |
| dev | Starts the development server. |
| build | Makes a production build of the application. |
| start   | Starts the node server used by Toolforge. |
| lint| Runs eslint with the configured settings. |

<br>

## Team

This project has been created by:

- Studio Hyperdrive: info@studiohyperdrive.be

It is currently maintained by:
- Milat Omed: milat.omed@studiohyperdrive.be

