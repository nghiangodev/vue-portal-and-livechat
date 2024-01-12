<template>
  <DefaultLayout>
    <!-- breadcrumb -->
    <Breadcrumb name="Category"></Breadcrumb>
    <!-- endbreadcrumb -->
    <div class="app-wrapper d-flex w-100 pt-4 flex-column">
      <div class="row">
        <div class="col-3 ">
          <label class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Show home type</label>
          <Select :options="isDarkOptions" v-model="is_dark"  @change="handleSelectIsDark"></Select>
        </div>
        <div class="col-3">
          <label class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Danh mục cha</label>
          <Select :options="parentIdOptions" v-model="parent_id"  @change="handleSelectParentId"></Select>
        </div>
        <div class="col-3">
          <label class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Loại</label>
          <Select :options="postTypeIdOptions" v-model="post_type_id"  @change="handleSelectPostTypeId"></Select>
        </div>
      </div>
      <DataTable id="table_category" ref="myDataTable" :options="dataTableOptions" :data="tableData" class="display">
        <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Tên</th>
          <th>Ngày tạo</th>
          <th>Ngày cập nhật</th>
          <th>Show home</th>
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
import moment from 'moment'
import CategoryService from '@/modules/business/placetogo/category/service'
import DataTable from '@/services/dataTableHelper'
import 'vue-select/dist/vue-select.css'
import {onMounted, ref, watch} from 'vue'
import router from '@/router'
import {errorSwal, hideBlockingOverlay, showBlockingOverlay, successSwal, warningSwal, actionDelete, actionRedirectEdit} from '@/services/method'
import VueSelect2 from 'vue-select'
import Select from '@/modules/business/common/Select.vue'

export default {
  components: {
    Breadcrumb,
    DefaultLayout,
    DataTable,
    Select
  },

  data() {
    return {
      is_dark: '',
      parent_id: '',
      post_type_id: '',
      isDarkOptions: [
        {
          id: 0,
          title: 'Ban ngày',
        },
        {
          id: 1,
          title: 'Ban đêm',
        },
        {
          id: 2,
          title: 'Cả ngày',
        },
      ],
    }
  },
  mounted() {
    actionRedirectEdit(this.$refs.myDataTable.$el, `/placetogo/category/form/`)

  },
  methods: {
    async handleSelectIsDark(event) {
      this.is_dark = event
      await showBlockingOverlay()

      const response = await CategoryService.list('', this.is_dark, this.parent_id, this.post_type_id)
      this.tableData = await this.convertApiDataTable(response.data.data);
      await hideBlockingOverlay()
    },

    async handleSelectParentId(event) {
      this.parent_id = event
      await showBlockingOverlay()

      const response = await CategoryService.list('', this.is_dark, this.parent_id, this.post_type_id)
      this.tableData = await this.convertApiDataTable(response.data.data);
      await hideBlockingOverlay()
    },

    async handleSelectPostTypeId(event) {
      this.post_type_id = event
      await showBlockingOverlay()

      const response = await CategoryService.list('', this.is_dark, this.parent_id, this.post_type_id)
      this.tableData = await this.convertApiDataTable(response.data.data);
      await hideBlockingOverlay()
    },
  },

  setup() {
    const tableData = ref([])
    const parentIdOptions = ref([])
    const postTypeIdOptions = ref([])

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
        {width: '20%', targets: 2},
        {width: '20%', targets: 3},
        {width: '10%', targets: 4},
        {width: '5%', targets: 5},
        {width: '5%', targets: 6},
      ],
      language: {
        searchPlaceholder: 'Search anything...',
      },
      initComplete: async function(settings, json) {

      },
    })

    async function getHighlightList() {
      try {
        await showBlockingOverlay()
        const response = await CategoryService.list()

        let responseData = response.data.data
        await hideBlockingOverlay()
        tableData.value = await convertApiDataTable(responseData)

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
        item.show_home ? 'Có' : 'Không',
        item.order,
      ])
    }

    async function parentList() {
      const response = await CategoryService.parentList()
      parentIdOptions.value = response.data.data.map(item => ({
        id: item.id,
        title: item.name,
      }));
    }
    async function postTypeList() {
      const response = await CategoryService.postTypeList()
      postTypeIdOptions.value = response.data.data.map(item => ({
        id: item.id,
        title: item.name,
      }));
    }

    onMounted(() => {
      getHighlightList()
      parentList()
      postTypeList()
    })

    return {
      tableData,
      dataTableOptions,
      parentIdOptions,
      postTypeIdOptions,
      convertApiDataTable
    }
  },
}
</script>
