<template>
  <div class="custom-select">
    <button @click="clearFilterText" :hidden="filterText ? false : true" class="clear-button">
      X
    </button>
    <input class="chosen-value form-control" type="text" v-model="filterText" @input="filterOptions" @focus="openDropdown" @blur="closeDropdown" placeholder="Chọn để tìm kiếm"/>
    <ul v-show="shouldDisplayDropdown" class="value-list w-100">
      <li v-for="option in filteredOptions" :key="option.id" @mousedown="selectOption(option)">
        {{ option.title }}
      </li>
    </ul>
  </div>
</template>
<style>
@import "../../../assets/select.css";
</style>
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: String,
  },
  data() {
    return {
      filterText: this.value ? this.options.find(option => option.id === this.value).title : '',
      isDropdownVisible: false,
      selectedOption: '',
      filteredOptions: [...this.options],
      originalOptions: [...this.options],
    }
  },
  computed: {
    shouldDisplayDropdown() {
      return this.isDropdownVisible
    },
  },
  mounted() {
    this.originalOptions = [...this.filteredOptions];
  },
  watch: {
    value(newVal) {
      this.filterText = newVal ? this.options.find(option => option.id === newVal).title : '';
    },
    options(newVal) {
      this.filteredOptions = [...newVal];
    },
  },
  methods: {
    filterOptions() {
      this.filteredOptions = this.options.filter(option =>
          option.title.toLowerCase().includes(this.filterText.toLowerCase())
      );
    },
    openDropdown() {
      this.originalOptions = this.filteredOptions;
      this.isDropdownVisible = true
    },
    closeDropdown() {
      this.isDropdownVisible = false
    },

    selectOption(option) {

      this.selectedOption = option;
      this.filterText = option.title;
      this.isDropdownVisible = false;
      this.$emit('input', option.id);
      this.$emit('change', option.id)
    },

    clearFilterText() {
      this.filterText = '';
      this.filteredOptions = [...this.options];
      this.$emit('input', '');
      this.$emit('change', '')
    },
  },
  name: 'Select',
}
</script>
