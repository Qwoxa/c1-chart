<template>
  <div
    class="tooltip-container"
    @mousemove="handleMouseMoveChart"
    @mouseenter="handleMouseEnterBar"
    @mouseleave="handleMouseLeaveBar"
  >
    <Transition name="fade-opacity">
      <div v-show="isTooltipVisible" ref="tooltip" class="tooltip-container__content">
        <slot name="tooltip-content" />
      </div>
    </Transition>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TooltipContainer',

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

      const tooltip = this.$refs.tooltip;
      const { right, left, top, bottom } = tooltip.getBoundingClientRect();
      const tooltipWidth = right - left;
      const tootlipHeihgt = top - bottom;

      const { top: columnTop, left: columnLeft } = this.position;
      const arrowHeight = 5;
      const paddingDistance = 2;

      tooltip.style.top = `${columnTop + tootlipHeihgt - arrowHeight - paddingDistance}px`;
      tooltip.style.left = `${columnLeft - tooltipWidth / 2}px`;
    },
  },
};
</script>
<style lang="scss">
.tooltip-container {
  position: relative;

  .fade-opacity-enter-active,
  .fade-opacity-leave-active {
    transition: opacity 0.15s;
  }

  &__content {
    position: absolute;
    display: block;
    pointer-events: none;
    z-index: 1;
  }
}
</style>
