<template>
  <div class="btn-group">
    <div @click="toggleMenu()"
         class="dropdown-toggle-color-selector"
         :style="{backgroundColor: '#' + selected.color}">
    </div>
    <div class="dropdown-menu-color-selector" v-if="showMenu">
      <div v-for="(option) in options" v-bind:key="option.value">
        <div :class="'status'"
             :style="{backgroundColor: '#' + option.color}"
             @click="updateOption(option)"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import './color-selector.scss';

export default {
  name: 'ColorSelector',
  data() {
    return {
      showMenu: false,
      placeholderText: 'Please select an item',
    };
  },
  props: {
    options: {
      type: [Array, Object],
    },
    selected: Object,
    placeholder: [String],
    closeOnOutsideClick: {
      type: [Boolean],
      default: true,
    },
  },
  mounted() {
    if (this.closeOnOutsideClick) {
      document.addEventListener('click', this.clickHandler);
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickHandler);
  },
  methods: {
    updateOption(option) {
      this.showMenu = false;
      this.$emit('updateOption', (option));
    },
    clickHandler(event) {
      const { target } = event;
      const { $el } = this;
      if (!$el.contains(target)) {
        this.showMenu = false;
      }
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
