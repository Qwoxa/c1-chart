<template>
  <div
    ref="parent"
    class="chart-tooltip"
    @mousemove="handleMouseMoveChart"
    @mouseenter="handleMouseEnterBar"
    @mouseleave="handleMouseLeaveBar"
  >
    <Transition name="fade-opacity">
      <div v-show="isTooltipVisible" ref="tooltip" class="chart-tooltip-content-wr">
        <slot name="tooltip-content" />
      </div>
    </Transition>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ChartTooltip',

  data() {
    return {
      isTooltipVisible: false,
      styles: {
        left: 0,
        top: 0,
      },
    };
  },

  methods: {
    handleMouseEnterBar() {
      this.isTooltipVisible = true;
    },

    handleMouseLeaveBar() {
      this.isTooltipVisible = false;
    },

    handleMouseMoveChart(e) {
      this.lastMoveEvent = e;

      const tooltip = this.$refs.tooltip;

      tooltip.style.left = '10px';
      tooltip.style.top = '10px';
    },
  },
};
</script>
<style lang="scss">
.chart-tooltip {
  position: relative;

  .fade-opacity-enter-active,
  .fade-opacity-leave-active {
    transition: opacity 0.15s;
  }

  &-content-wr {
    position: absolute;
    display: block;
    pointer-events: none;
    z-index: 5;
  }
}
</style>
