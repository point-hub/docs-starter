
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, withBase } from 'vitepress'

interface IProps {
  versions: string[]
  latestVersion: string
  screenMenu?: boolean
  menu?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  screenMenu: false,
  menu: false,
})

const route = useRoute()

const currentVersion = computed(() => {
  const match = route.path.match(/^\/(v\d+\.\d+)(?:\/|$)/)

  return match?.[1] ?? props.latestVersion
})

const isCompact = computed(() => props.screenMenu || props.menu)

function getVersionUrl(version: string): string {
  return withBase(`/${version}/introduction`)
}

function closeDropdown(event: Event): void {
  const link = event.currentTarget as HTMLAnchorElement
  const details = link.closest('details')

  details?.removeAttribute('open')
}

const dropdown = ref<HTMLDetailsElement | null>(null)

function handleOutsideClick(event: MouseEvent): void {
  if (
    dropdown.value?.open &&
    !dropdown.value.contains(event.target as Node)
  ) {
    dropdown.value.open = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div class="version-nav-item">
    <template v-if="isCompact">
      <div class="version-nav-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="6" cy="3" r="2" />
          <circle cx="6" cy="21" r="2" />
          <circle cx="18" cy="6" r="2" />
          <path d="M6 5v14" />
          <path d="M18 8a6 6 0 0 1-6 6H6" />
        </svg>

        <span>{{ currentVersion }}</span>
      </div>

      <a
        v-for="version in versions"
        :key="version"
        :href="getVersionUrl(version)"
        class="version-nav-link"
        :class="{ active: version === currentVersion }"
      >
        {{ version }}
        <span v-if="version === latestVersion" class="latest-label">
          Latest
        </span>
      </a>
    </template>

    <details v-else class="version-dropdown" ref="dropdown">
      <summary class="version-trigger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="6" cy="3" r="2" />
          <circle cx="6" cy="21" r="2" />
          <circle cx="18" cy="6" r="2" />
          <path d="M6 5v14" />
          <path d="M18 8a6 6 0 0 1-6 6H6" />
        </svg>

        <span>{{ currentVersion }}</span>

        <svg
          class="chevron"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div class="version-dropdown-menu">
        <a
          v-for="version in versions"
          :key="version"
          :href="getVersionUrl(version)"
          class="version-nav-link"
          :class="{ active: version === currentVersion }"
          @click="closeDropdown"
        >
          <span>{{ version }}</span>

          <span v-if="version === latestVersion" class="latest-label">
            Latest
          </span>
        </a>
      </div>
    </details>
  </div>
</template>

<style scoped>
.version-nav-item {
  display: flex;
  align-items: center;
  height: var(--vp-nav-height);
  font-size: 13px;
  font-weight: 500;
}

.version-dropdown {
  position: relative;
  height: 100%;
}

.version-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  padding: 0 12px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  list-style: none;
  transition: color 0.25s;
}

.version-trigger::-webkit-details-marker {
  display: none;
}

.version-trigger:hover,
.version-dropdown[open] .version-trigger {
  color: var(--vp-c-brand-1);
}

.chevron {
  transition: transform 0.2s;
}

.version-dropdown[open] .chevron {
  transform: rotate(180deg);
}

.version-dropdown-menu {
  position: absolute;
  top: calc(100% - 4px);
  right: 0;
  z-index: 100;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

.version-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 10px;
  border-radius: 6px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.version-nav-link:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.version-nav-link.active {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.latest-label {
  color: var(--vp-c-text-2);
  font-size: 11px;
  font-weight: 400;
}

.version-nav-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  color: var(--vp-c-text-1);
}
</style>
