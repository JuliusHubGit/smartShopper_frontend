
<script setup>

</script>

<template>
  <div class="app-layout">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  line-height: 1.5;
  padding: 1rem;
  background-color: #f5f5f5;
  width: 100%;
}

nav {
  display: flex;
  gap: 1rem;
}

a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}

main {
  padding: 1rem;
  flex: 1;
}
</style>
