<template>
  <DefaultLayout>
    <!-- breadcrumb -->
    <Breadcrumb name="Highlight"></Breadcrumb>
    <!-- endbreadcrumb -->
    <div class="app-wrapper d-flex w-100 pt-4">
      <DataTable ref="myDataTable" :options="dataTableOptions" :data="tableData" class="display">
        <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Tên</th>
          <th>Tên Event</th>
          <th>Ngày tạo</th>
          <th>Sort order</th>
          <th>Hình ảnh MB</th>
          <th>Hình ảnh PC</th>
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
import HighlightService from '@/modules/business/event/highlight/service'

import DataTable from '@/services/dataTableHelper'

import { onMounted, ref, watch } from 'vue'
import router from '@/router'
import {errorSwal, hideBlockingOverlay, showBlockingOverlay, successSwal, warningSwal, actionDelete, actionRedirectEdit} from '@/services/method'

export default {
  components: {
    Breadcrumb,
    DefaultLayout,
    DataTable,
  },

  mounted() {
    actionRedirectEdit(this.$refs.myDataTable.$el,`/event/highlight/form/`)
  },

  setup() {
    const tableData = ref([])

    const dataTableOptions = ref({
      dom: '<"top"Bf>rtl<"bottom"ip><"clear">',
      paging: true,
      pageLength: 10,
      searching: true,
      ordering: true,
      info: true,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
      columnDefs: [
        { width: '3%', targets: 0, className: 'dt-center' },
        { width: '3%', targets: 1 },
        { width: '20%', targets: 2 },
        { width: '20%', targets: 3 },
        { width: '10%', targets: 4 },
        { width: '5%', targets: 5 },
        { width: '5%', targets: 6 },
        { width: '5%', targets: 7 },
      ],
      buttons: [
        {
          text: 'Add New',
          action: function (e, dt, node, config) {
            router.push({ name: 'HighlightForm' })
          },
          className: 'btn btn-success',
        },
        {
          text: 'Delete',
          action: async function (e, dt, node, config) {
            await showBlockingOverlay()
            let {checkboxValues,data}  = await actionDelete(e, dt, node, config)

            if (checkboxValues.length > 0) {
              const response = await HighlightService.destroyList(data)
              await hideBlockingOverlay()

              await successSwal(`/event/highlight`, 'Xóa dữ liệu thành công', true)
            } else {
              await warningSwal('', 'Vui lòng chọn danh sách dữ liệu để xóa', true,false)
            }
          },
          className: 'btn btn-danger',
        },
      ],
      language: {
        searchPlaceholder: 'Search anything...',
      },
      initComplete: function () {
        // Remove the 'dt-button' class from the DataTable buttons
        const buttons = document.querySelectorAll('.dt-button')
        buttons.forEach((button) => {
          button.classList.remove('dt-button')
        })
      },
    })

    async function getHighlightList() {
      try {
        await showBlockingOverlay()
        const response = await HighlightService.list()

        let responseData = response.data.data
        await hideBlockingOverlay()
        tableData.value = await convertApiDataTable(responseData)

      } catch (e) {
        console.log(e)
      }
    }


    async function convertApiDataTable(apiData) {
      return apiData.map((item,key) => [
        `<input class="form-check-input" type="checkbox" id="inlineCheckbox1" data-key="${key}" value="${item.id}">`,
        item.id,
        item.name,
        item.event?.name ?? '',
        moment(item.created_at).format('DD-MM-YYYY HH:mm:ss'),
        item.sort_order,
        `<img width="34" height="34" src="${item.images[0]?.path}" alt>`,
        `<img  width="60" height="60" src="${item.images_p_c[0]?.path}"  alt>`,
      ])
    }


    onMounted(() => {
      getHighlightList()
    })

    return {
      tableData,
      dataTableOptions,
    }
  },
}
</script>
