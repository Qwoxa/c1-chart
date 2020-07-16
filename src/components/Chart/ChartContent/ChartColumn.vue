<template>
  <div :class="classes" :style="styles">
    <div
      v-for="subColumn in subColumns"
      class="chart-column__sub-column-wr"
      :key="subColumn.name"
      :style="getSubColumnStyles(subColumn)"
    >
      <div class="chart-column__sub-column" />
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3-scale';

export default {
  name: 'ChartColumn',

  props: {
    records: {
      type: Array,
      required: true,
    },
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
    value: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      subColumns: null,
      minSubcolumnHeight: 7,
    };
  },

  created() {
    const yScale = d3
      .scaleLinear()
      .domain([0, this.value])
      .range([0, this.height]);

    this.calculateYScaleForRecords(yScale);
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

  methods: {
    getSubColumnStyles(subColumn) {
      return {
        height: `${subColumn.height}px`,
      };
    },
    calculateYScaleForRecords(yScale) {
      let accumulator = 0;
      let takenAdditionalSpace = 0;

      this.subColumns = this.records.map(record => {
        const calculatedHeight = yScale(record.value);

        const height = Math.max(this.minSubcolumnHeight, calculatedHeight);
        takenAdditionalSpace +=
          this.minSubcolumnHeight <= calculatedHeight
            ? 0
            : this.minSubcolumnHeight - calculatedHeight;

        const offsetBottom = accumulator;
        accumulator += height;

        return {
          ...record,
          height,
          offsetBottom,
        };
      });

      if (takenAdditionalSpace !== 0) {
        console.log(takenAdditionalSpace);
        this.evenlyDistributeAdditionalSpace(takenAdditionalSpace);
      }
    },
    evenlyDistributeAdditionalSpace(additionalSpace) {
      let isDistributed = false;
      let leftNoDonors = false;

      while (!isDistributed || leftNoDonors) {
        const sectionsDonors = this.subColumns.filter(sc => sc.height > this.minSubcolumnHeight);
        if (sectionsDonors.length === 0) {
          leftNoDonors = true;
          break;
        }

        const subtrahend = additionalSpace / sectionsDonors.length;
        this.subColumns = this.subColumns.map(sc => {
          let finalSubtrahend = subtrahend;

          if (sc.height - subtrahend < this.minSubcolumnHeight) {
            finalSubtrahend = sc.height - this.minSubcolumnHeight;
          }

          additionalSpace -= finalSubtrahend;

          return { ...sc, height: sc.height - finalSubtrahend };
        });

        isDistributed = Math.round(additionalSpace * 10000) === 0;
      }
    },
  },
};
</script>

<style lang="scss">
.chart-column {
  position: absolute;
  border-radius: 2px;

  &__sub-column {
    height: 100%;
  }

  &__sub-column-wr:not(:last-child) {
    padding-bottom: 3px;
  }

  &--column-1 & {
    &__sub-column {
      height: 100%;
      background-color: rgba(127, 202, 159, 0.3);
      border: 1px solid #7fca9f;

      &:hover {
        background-color: #aee2c4;
        border: 1px solid #7fca9f;
      }
    }
  }

  &--column-2 & {
    &__sub-column {
      background-color: rgba(255, 188, 13, 0.3);
      border: 1px solid #ffbc0d;

      &:hover {
        background-color: #ffda93;
        border: 1px solid #ffbc0d;
      }
    }
  }
}
</style>
