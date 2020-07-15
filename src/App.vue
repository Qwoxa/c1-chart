<template>
  <div id="app">
    <MainContainer>
      <Chart />
    </MainContainer>
  </div>
</template>

<script>
import MainContainer from '@/components/MainContainer';
import Chart from '@/components/Chart/Chart';

export default {
  name: 'App',
  components: {
    MainContainer,
    Chart,
  },
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}

html,
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}
</style>
