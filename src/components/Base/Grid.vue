<template>
  <div class="grid">
    <svg class="grid__lines-wr" :width="width" :height="height">
      <line
        v-for="line in lines"
        class="grid__line"
        :key="toStringLine(line)"
        :x1="line.x1"
        :x2="line.x2"
        :y1="line.y1"
        :y2="line.y2"
      />
    </svg>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Grid',

  props: {
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      lines: [],
    };
  },

  created() {
    this.initializeHorizonalLines();
    this.initializeVerticalLines();
  },

  methods: {
    toStringLine(line) {
      return `${line.x1}-${line.x2}-${line.y1}-${line.y2}`;
    },
    initializeHorizonalLines() {
      let dividedCell = this.width % this.step;
      if (dividedCell === 0) dividedCell = this.step;

      const offset = dividedCell / 2;
      let currentWidth = offset;
      while (currentWidth <= this.width - offset) {
        this.lines.push({
          x1: currentWidth,
          x2: currentWidth,
          y1: 0,
          y2: this.height,
        });
        currentWidth += this.step;
      }
    },
    initializeVerticalLines() {
      let dividedCell = this.height % this.step;
      if (dividedCell === 0) dividedCell = this.step;

      const offset = Math.ceil(dividedCell / 2);
      let currentHeight = offset;
      while (currentHeight <= this.height - offset) {
        this.lines.push({
          x1: 0,
          x2: this.width,
          y1: currentHeight,
          y2: currentHeight,
        });
        currentHeight += this.step;
      }
    },
  },
};
</script>

<style lang="scss">
.grid {
  &__lines-wr {
    position: absolute;
  }

  &__line {
    stroke: #e5e9ef;
    stroke-width: 1px;
    stroke-dasharray: 3 1;
  }
}
</style>
