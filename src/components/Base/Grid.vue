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
    startPointHeight: {
      type: Number,
      default: 0,
    },
    startPointWidth: {
      type: Number,
      default: 0,
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
    this.initializeGrid();
  },

  methods: {
    toStringLine(line) {
      return `${line.x1}-${line.x2}-${line.y1}-${line.y2}`;
    },
    initializeGrid() {
      let currentHeight = this.step * this.startPointHeight;
      while (currentHeight <= this.height) {
        this.lines.push({ x1: 0, x2: this.width, y1: currentHeight, y2: currentHeight });
        currentHeight += this.step;
      }

      let currentWidth = this.step * this.startPointWidth;
      while (currentWidth <= this.width) {
        this.lines.push({ x1: currentWidth, x2: currentWidth, y1: 0, y2: this.height });
        currentWidth += this.step;
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
