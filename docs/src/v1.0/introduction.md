---
outline: deep
---

# Introduction

Effortlessly create beautiful documentation sites with just markdown.

## VitePress

[VitePress](https://vitepress.dev/) is a Static Site Generator (SSG) designed for building fast, content-centric websites. In a nutshell, VitePress takes your source content written in Markdown, applies a theme to it, and generates static HTML pages that can be easily deployed anywhere.

## File Structure

A successful file structure organizes your data and code with the goal of repeatability, making it easier for you and your collaborators to revisit, revise and develop your project.

```
DOCS-STARTER
.
├── .github
├── .nginx
├── docs
│   ├── .vitepress
│   ├── sidebars
│   │   ├── v1.0.json
│   │   └── v1.1.json
│   ├── src
│   │   ├── public
│   │   ├── v1.0
│   │   │   └── index.md
│   │   └── v1.1
│   │       └── index.md
│   └── config.ts
└── README.md
```

### Root

The `/docs` directory is considered the project root of the VitePress site. The `/docs/.vitepress` directory is a reserved location for VitePress config file, dev server cache, build output, and optional theme customization code.

### Config

The config file `docs/config.ts` allows you to customize various aspects of your VitePress site. Consult the [config reference](https://vitepress.dev/reference/site-config) for full details on all config options 

### Content

All documentation content is stored in the `/docs/src/{version}` directory, where `{version}` represents the documentation version (e.g., `v1.0`, `v1.1`).

Each version has its own directory, allowing documentation to evolve independently without modifying previous versions.

### Sidebars

Sidebar configurations are stored in the `/docs/sidebars` directory. Each version has its own JSON configuration file (e.g., `v1.0.json`, `v1.1.json`).

These files define the navigation structure for their corresponding documentation versions. This allows each version to have its own sidebar items and hierarchy.

### Workflows

A workflow is a configurable automated process that will run one or more jobs. Workflows are defined by a YAML file checked in to your repository, located in `/.github/wokflows` directory and will run when triggered by an event in your repository

### Nginx Server Block

When using the Nginx web server, server blocks in `.nginx/default.conf` can be used to encapsulate configuration details.
