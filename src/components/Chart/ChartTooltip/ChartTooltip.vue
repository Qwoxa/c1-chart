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

  props: {
    position: {
      validator: value => typeof value === 'object' || value === null,
      required: true,
    },
  },

  data() {
    return {
      isTooltipVisible: false,
    };
  },

  methods: {
    handleMouseEnterBar() {
      this.isTooltipVisible = true;
    },

    handleMouseLeaveBar() {
      this.isTooltipVisible = false;
    },

    handleMouseMoveChart() {
      if (this.position === null) {
        return;
      }

      const { top, left } = this.position;

      const tooltip = this.$refs.tooltip;
      const rect = tooltip.getBoundingClientRect();
      const tooltipWidth = rect.right - rect.left;
      const tootlipHeihgt = rect.top - rect.bottom;

      tooltip.style.top = `${top + tootlipHeihgt - 7}px`;
      tooltip.style.left = `${left - tooltipWidth / 2}px`;
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
