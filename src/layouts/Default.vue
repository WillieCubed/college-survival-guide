<template>
  <div class="bg-gray-200">
    <header class="header mx-auto max-w-3xl p-4">
      <span class="inline-block text-2xl text-bold">
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </span>
      <nav class="nav max-auto max-w-2xl">
        <!-- TODO: Search bar -->
      </nav>
    </header>
    <main class="mx-auto max-w-3xl p-4"> 
      <slot></slot>
    </main>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="postcss" scoped>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.header {
  height: 64px;
}
</style>
