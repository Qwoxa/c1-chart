<template>
  <div class="chart-layout-tooltip-content">
    <h3 class="chart-layout-tooltip-content__heading">{{ capitalize(heading) }}</h3>

    <div class="chart-layout-tooltip-content__records">
      <div v-for="record in records" :key="record.name" :class="getRecordItemClasses(record)">
        <div class="chart-layout-tooltip-content__record-name">
          {{ record.name }}
        </div>

        <div class="chart-layout-tooltip-content__record-value">
          ${{ formatValue(record.value) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { divideNumberWithComa } from '@/utils/helpers';
import capitalize from 'lodash/capitalize';

export default {
  name: 'ChartLayoutTooltipContent',

  props: {
    heading: {
      type: String,
      required: true,
    },
    records: {
      type: Array,
      required: true,
    },
  },

  methods: {
    capitalize,

    formatValue(value) {
      return divideNumberWithComa(value.toFixed(2));
    },

    getRecordItemClasses(record) {
      const cl = 'chart-layout-tooltip-content__record-item';

      return {
        [cl]: true,
        [`${cl}--active`]: record.isActive,
      };
    },
  },
};
</script>

<style lang="scss">
$padding: 20px;

.chart-layout-tooltip-content {
  font-size: 12px;
  line-height: 1.2;
  box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.1);
  background-color: #313844;
  border-radius: 3px;
  color: #fff;
  width: 250px;

  &__heading {
    margin: 0 0 8px 0;
    padding: $padding $padding 0 $padding;
  }

  &__records {
    padding-bottom: $padding;
  }

  &__record-item {
    height: 27px;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 $padding;
  }

  &__record-item--active {
    background-color: #39404b;

    &:before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 4px solid #fc7088;
      position: absolute;
      left: 10px;
    }
  }

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #313844;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
