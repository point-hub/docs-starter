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
│   ├── src
│   │   ├── public
│   │   └── index.md
│   └── config.ts
└── README.md
```

### Root

The `/docs` directory is considered the project root of the VitePress site. The `/docs/.vitepress` directory is a reserved location for VitePress config file, dev server cache, build output, and optional theme customization code.

### Config

The config file `docs/config.ts` allows you to customize various aspects of your VitePress site. Consult the [config reference](https://vitepress.dev/reference/site-config) for full details on all config options 

### Content

You can put all your content in `/docs/src` directory.

### Workflows

A workflow is a configurable automated process that will run one or more jobs. Workflows are defined by a YAML file checked in to your repository, located in `/.github/wokflows` directory and will run when triggered by an event in your repository

### Nginx Server Block

When using the Nginx web server, server blocks in `.nginx/default.conf` can be used to encapsulate configuration details.
