<template>
  <div :class="classes" :style="styles"></div>
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
    columnIndex: {
      type: Number,
      required: true,
    },
  },

  computed: {
    classes() {
      const cl = 'chart-column';

      return {
        [cl]: true,
        [`${cl}--column-${this.columnIndex}`]: true,
      };
    },
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
  position: absolute;
  border-radius: 2px;

  &--column-1 {
    background-color: rgba(127, 202, 159, 0.3);
    border: 1px solid #7fca9f;

    &:hover {
      background-color: #aee2c4;
      border: 1px solid #7fca9f;
    }
  }

  &--column-2 {
    background-color: rgba(255, 188, 13, 0.3);
    border: 1px solid #ffbc0d;

    &:hover {
      background-color: #ffda93;
      border: 1px solid #ffbc0d;
    }
  }
}
</style>
