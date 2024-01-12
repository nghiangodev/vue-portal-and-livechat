<template>
  <DefaultLayout>
    <!-- breadcrumb -->
    <Breadcrumb name="Post Type"></Breadcrumb>
    <!-- endbreadcrumb -->
    <div class="app-wrapper d-flex w-100 pt-4 flex-column">
      <div class="row">
        <div class="col-3 ">
          <label class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Danh mục</label>
         <Select :options="categoryOptions" v-model="category_id"  @change="handleSelectCategoryId"></Select>
        </div>
      </div>
      <DataTable ref="myDataTable" :options="dataTableOptions" :data="tableData" class="display">
        <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Name</th>
          <th>Ngày tạo</th>
          <th>Ngày cập nhật</th>
          <th>Order</th>
        </tr>
        </thead>
      </DataTable>
    </div>
  </DefaultLayout>
</template>
<script>
import DefaultLayout from '@/modules/business/common/DefaultLayout.vue'
import Breadcrumb from '@/modules/business/common/Breadcrumb.vue'
import Select from '@/modules/business/common/Select.vue'
import moment from 'moment'
import CategoryService from '@/modules/business/placetogo/category/service'

import DataTable from '@/services/dataTableHelper'

import {onMounted, ref, watch} from 'vue'
import router from '@/router'
import {errorSwal, hideBlockingOverlay, showBlockingOverlay, successSwal, warningSwal, actionDelete, actionRedirectEdit} from '@/services/method'
import PTGPostTypeService from '@/modules/business/placetogo/posttype/service'

export default {
  components: {
    Breadcrumb,
    DefaultLayout,
    DataTable,
    Select,
  },

  mounted() {
    actionRedirectEdit(this.$refs.myDataTable.$el, `/placetogo/post-type/form/`)
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option =>
          option.label.toLowerCase().includes(this.filterText.toLowerCase())
      );
    },
  },
  data() {
    return {
      category_id: '',
      options: [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' },
        // Add more options as needed
      ],
      selectedOption: null,
      filterText: '',
      isDropdownVisible: false,
    }
  },

  methods: {
    filterOptions() {
      // You can put additional logic here if needed
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownVisible = false;
      this.filterText = ''; // Clear the filter text after selecting an option
    },

    async handleSelectCategoryId(event) {
      this.category_id = event
      await showBlockingOverlay()
      const response = await PTGPostTypeService.list('', this.category_id)
      this.tableData = await this.convertApiDataTable(response.data.data);
      await hideBlockingOverlay()
    },
  },

  setup() {
    const tableData = ref([])
    const categoryOptions = ref([])

    const dataTableOptions = ref({
      dom: '<"top"f>rtl<"bottom"ip><"clear">',
      paging: true,
      pageLength: 10,
      searching: true,
      ordering: true,
      info: true,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
      columnDefs: [
        {width: '3%', targets: 0, className: 'dt-center'},
        {width: '3%', targets: 1},
        {width: '40%', targets: 2},
        {width: '20%', targets: 3},
        {width: '20%', targets: 4},
        {width: '10%', targets: 4},
      ],

      language: {
        searchPlaceholder: 'Search anything...',
      },
      initComplete: function() {
        // Remove the 'dt-button' class from the DataTable buttons
        const buttons = document.querySelectorAll('.dt-button')
        buttons.forEach((button) => {
          button.classList.remove('dt-button')
        })
      },
    })

    async function getPostTypeList() {
      try {
        await showBlockingOverlay()
        const response = await PTGPostTypeService.list()

        let responseData = response.data.data
        await hideBlockingOverlay()
        tableData.value = await convertApiDataTable(responseData)

      } catch (e) {
        console.log(e)
      }
    }

    async function getCategoryList() {
      try {
        const response = await PTGPostTypeService.categoryList()

        categoryOptions.value = response.data.data.map(item => ({
          id: item.id,
          title: item.name,
        }));

      } catch (e) {
        console.log(e)
      }
    }

    async function convertApiDataTable(apiData) {
      return apiData.map((item, key) => [
        `<input class="form-check-input" type="checkbox" id="inlineCheckbox1" data-key="${key}" value="${item.id}">`,
        item.id,
        item.name,
        moment(item.created_at).format('DD-MM-YYYY HH:mm:ss'),
        moment(item.updated_at).format('DD-MM-YYYY HH:mm:ss'),
        item.order,
      ])
    }

    onMounted(() => {
      getPostTypeList()
      getCategoryList()
    })

    return {
      tableData,
      dataTableOptions,
      categoryOptions,
      convertApiDataTable
    }
  },
}
</script>
