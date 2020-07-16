<template>
  <div class="main-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MainContainer',
};
</script>

<style lang="scss">
.main-container {
  max-width: 1040px;
  padding: 0 20px;
  margin: 0 auto;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
}
</style>
