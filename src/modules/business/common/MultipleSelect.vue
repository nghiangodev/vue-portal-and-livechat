<template>
  <div class="custom-select-multiple" ref="customSelect">
    <div class="form-control chosen-multiple-value" @click="toggleDropdown">
      <div class="d-flex flex-row align-items-center gap-2 flex-wrap">
        <span class="option-selected" v-for="selectedOption in selectedOptions" :key="selectedOption">
          {{ getOptionTitle(selectedOption) }}
          <span class="ps-1 text-brand-theme fw-bold" @click="removeSelectedOption(selectedOption)">X</span>
        </span>
      </div>
    </div>
    <ul v-show="shouldDisplayDropdown" class="value-list w-100">
      <input v-show="isDropdownVisible" v-model="filterText" class="form-control fw-bold" type="text" @input="filterOptions" placeholder="Chọn để tìm kiếm"/>

      <li v-for="option in filteredOptions" :key="option.id" @mousedown="selectOption(option)" class="d-flex flex-row justify-content-between">
        <span>{{ option.title }}</span>
        <span v-if="selectedOptions.includes(option.id)" class="check-mark">&#10003;</span>
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
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isDropdownVisible: false,
      selectedOptions: [...this.value],
      filteredOptions: [...this.options],
      filterText: '',
    }
  },
  computed: {
    shouldDisplayDropdown() {
      return this.isDropdownVisible && this.filteredOptions.length > 0
    },
  },
  mounted() {
    document.body.addEventListener('click', this.handleClickOutside);
  },

  beforeDestroy() {
    document.body.removeEventListener('click', this.handleClickOutside);
  },
  watch: {
    value(newVal) {
      this.selectedOptions = [...newVal]
    },
    options(newVal) {
      this.filteredOptions = [...newVal]
    },
  },
  methods: {
    handleClickOutside(event) {
      const customSelectElement = this.$refs.customSelect;
      if (customSelectElement && !customSelectElement.contains(event.target)) {
        this.closeDropdown();
      }
    },
    filterOptions() {
      this.filteredOptions = this.options.filter(option =>
          option.title.toLowerCase().includes(this.filterText.toLowerCase()),
      )
    },
    openDropdown() {
      this.isDropdownVisible = true;
      this.filterText = '';
    },
    closeDropdown() {
      this.isDropdownVisible = false;
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    selectOption(option) {
      if (!this.selectedOptions.includes(option.id)) {
        this.selectedOptions.push(option.id);
        this.filterText = '';

      } else {
        this.selectedOptions = this.selectedOptions.filter(id => id !== option.id);
      }
      this.emitSelectedOptions();
    },
    removeSelectedOption(optionId) {
      this.selectedOptions = this.selectedOptions.filter(id => id !== optionId);
      this.emitSelectedOptions();
    },
    clearFilterText() {
      this.filterText = '';
      this.filteredOptions = [...this.options];
      this.$emit('input', '');
      this.$emit('change', '')
    },
    getOptionTitle(optionId) {
      const option = this.options.find(opt => opt.id === optionId);
      return option ? option.title : '';
    },
    emitSelectedOptions() {
      // Emit the updated array of selected options
      this.$emit('input', this.selectedOptions);
      this.$emit('change', this.selectedOptions);
    },
  },
  name: 'MultipleSelect',
}
</script>
