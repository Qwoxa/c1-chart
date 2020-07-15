<template>
  <div class="chart-column" :style="styles"></div>
</template>

<script>
export default {
  name: 'ChartColumn',

  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    left: {
      type: Number,
      required: true,
    },
    gridHeight: {
      type: Number,
      required: true,
    },
  },

  computed: {
    styles() {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
        left: `${this.left}px`,
        top: `${this.gridHeight - this.height}px`,
      };
    },
  },
};
</script>

<style lang="scss">
.chart-column {
  border: 1px solid red;
  position: absolute;
}
</style>
