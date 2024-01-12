<template>
  <DefaultLayout>
    <!--    breadcrumb-->
    <Breadcrumb :name=" ids ? 'Edit' : 'Add new'" backToUrl="/event/highlight" backTo="Highlight" actionName="Add New"></Breadcrumb>
    <!--    endbreadcrumb-->
    <Form @submit="submitForm" ref="formSubmit" class="w-100" :validationSchema="validationSchema">
      <div class="pt-3 row">
        <div class="row d-flex align-items-center">
          <div class="col-6 pt-2">
            <label for="fullName" class="fw-bold fs-custom  w-100 d-flex flex-row gap-2 align-items-center">Name
              <img src="/images/flag/vi.svg">
              <span class="text-danger fw-bold">&#42;</span></label>
            <Field type="text" class="form-control mt-2 mb-2" v-model="form.vi.name" placeholder="Vui lòng nhập dữ liệu" id="form_vi_name" name="form_vi_name"/>
            <Field type="text" class="form-control mt-2 mb-2" hidden v-model="form.event_id" name="event_id"/>
            <Field type="text" class="form-control mt-2 mb-2" hidden v-model="form.id" name="id"/>
            <ErrorMessage class="error py-2 text-danger" name="form_vi_name"/>
          </div>
          <div class="col-6 pt-2">
            <label for="fullName" class="fw-bold  w-100 d-flex flex-row gap-2 align-items-center">Name
              <img src="/images/flag/en.svg">
              <span class="text-danger fw-bold">&#42;</span></label>
            <Field type="text" class="form-control mt-2 mb-2" v-model="form.en.name" placeholder="Vui lòng nhập dữ liệu" id="form_en_name" name="form_en_name"/>
            <ErrorMessage class="error py-2 text-danger" name="form_en_name"/>
          </div>
          <div class="col-6 mt-4">
            <button type="button" class="btn btn-brand-theme" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Chọn sự kiện
            </button>
          </div>
        </div>
        <div class="col-6  pt-2">
          <label class="fw-bold fs-custom">Tên sự kiện</label>
          <input disabled v-model="form.event_name" class="form-control mb-2">
        </div>
        <div class="col-6  pt-2">
          <label class="fw-bold fs-custom">Slug</label>
          <input disabled v-model="form.event_slug" class="form-control mb-2">
        </div>
        <div class="col-6  pt-2">
          <label class="fw-bold fs-custom">Giá vé</label>
          <input disabled v-model="form.event_ticket_price" class="form-control mb-2">
        </div>
        <div class="col-6  pt-2">
          <label class="fw-bold fs-custom">Website</label>
          <input disabled v-model="form.event_website" class="form-control mb-2">
        </div>
        <div class="col-6  pt-2">
          <label class="fw-bold fs-custom">Thời gian bắt đầu</label>
          <input disabled v-model="form.event_start_time" class="form-control mb-2">
        </div>
        <div class="col-6  pt-2">
          <label class="fw-bold fs-custom">Thời gian kết thúc</label>
          <input disabled v-model="form.event_end_time" class="form-control mb-2">
        </div>
        <div class="col-6  pt-2 mb-2">
          <label class="fw-bold fs-custom">Ảnh app</label>
          <UploadImages :images="images"></UploadImages>
        </div>
        <div class="col-6  pt-2 mb-2">
          <label class="fw-bold fs-custom">Ảnh PC</label>
          <UploadImages :images="imagesPC"></UploadImages>
        </div>
        <div class="col-6  pt-2">
          <label class="fw-bold fs-custom">Sort order</label>
          <Field v-model="form.sort_order" name="sort_order" type="number" class="text-end form-control mt-2"></Field>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-start pt-5 gap-3 align-items-center">
        <button class="btn btn-dark" type="button" @click=reverseUrl>Back</button>
        <button class="btn btn-brand-theme" type="submit">Save</button>
      </div>
    </Form>
  </DefaultLayout>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog  modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Chọn sự kiện</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body app-wrapper d-flex w-100 pt-4">
          <DataTable ref="myDataTable" :options="dataTableOptions" :data="tableData" class="display">
            <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>slug</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Giá vé</th>
              <th>Tổng vé</th>
              <th>Loại</th>
              <th>Website</th>
            </tr>
            </thead>
          </DataTable>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import "../style/index.scss";
</style>
<script>
import DefaultLayout from '@/modules/business/common/DefaultLayout.vue'
import Breadcrumb from '@/modules/business/common/Breadcrumb.vue'
import * as yup from 'yup'
import {Form, Field, ErrorMessage} from 'vee-validate'

import {onMounted, reactive, ref, toRefs} from 'vue'
import router from '@/router'
import {
  errorSwal,
  hideBlockingOverlay,
  showBlockingOverlay,
  successSwal,
  warningSwal,
  handleFileUpload,
  handleRemoveFileUpload,
  encodeImageToBase64, dataURItoBlob,
} from '@/services/method'
import {useRoute} from 'vue-router'
import HighlightService from '@/modules/business/event/highlight/service'
import moment from 'moment/moment'

import DataTable from '@/services/dataTableHelper'
import UploadImages from '@/modules/business/common/UploadImages.vue'

export default {
  data() {
    return {
      images: [],
      imagesPC: [],
      form: {
        vi: {
          name: ''
        },
        en: {
          name: ''
        },
        event_id: '',
        event_slug: '',
        event_name: '',
        event_start_time: '',
        event_end_time: '',
        event_ticket_price: '',
        event_website: '',
        sort_order: 0,
        id: '',
      },
    }
  },
  methods: {
    async submitForm() {

      const formData = new FormData()

      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i]
       if(!this.images[i].existing && !this.images[i].remove) {
         formData.append('images[]', image.file)
       }

        if(this.images[i].remove  && this.images[i].id > 0) {
          formData.append('removeImages[]', image.file)
        }
      }

      for (let i = 0; i < this.imagesPC.length; i++) {
        const imagePC = this.imagesPC[i]
        if(!this.imagesPC[i].existing && !this.imagesPC[i].remove) {
          formData.append('imagesPC[]', imagePC.file)
        }

        if(this.imagesPC[i].remove && this.imagesPC[i].id > 0) {
          formData.append('removeImages[]', imagePC.file)
        }
      }

      formData.append('event_id', this.form.event_id)
      formData.append('data_vi', JSON.stringify(this.form.vi))
      formData.append('data_en', JSON.stringify(this.form.en))
      formData.append('sort_order', this.form.sort_order)
      formData.append('id', this.form.id)

      // await showBlockingOverlay()
      const response = await HighlightService.storeList(formData)

      let data = response.data
console.log(data)
      await hideBlockingOverlay()

      if (data.data.id) {
        await successSwal(`/event/highlight/form/${data.data.id}`, 'Thêm dữ liệu thành công', true)
      } else {
        await errorSwal(data.statusValue)

      }

    },

    async reverseUrl() {
      try {
        await warningSwal('Highlight', 'Dữ liệu sẽ không được lưu lại. Bạn chắc chứ ?')
      } catch {
        await errorSwal()
      }
    },

  },
  mounted() {

    const dataTableElement = this.$refs.myDataTable.$el
    dataTableElement.addEventListener('click', (event) => {
      const targetRow = event.target.closest('tr')
      if (targetRow) {
        const allRowData = Array.from(targetRow.children).map(td => td.textContent)

        this.form.event_id = allRowData[0]
        this.form.event_name = allRowData[1]
        this.form.event_slug = allRowData[2]
        this.form.event_start_time = allRowData[3]
        this.form.event_end_time = allRowData[4]
        this.form.event_ticket_price = allRowData[5]
        this.form.event_website = allRowData[8]

        document.querySelector('.modal [data-bs-dismiss="modal"]').click()
      }
    })
  },
  computed: {
    validationSchema() {
      return yup.object({
        form_vi_name: yup.string().required('Trường này là bắt buộc'),
        form_en_name: yup.string().required('Trường này là bắt buộc'),
      })
    },
  },
  components: {
    UploadImages,
    Breadcrumb,
    DefaultLayout,
    Form,
    Field,
    ErrorMessage,
    DataTable,
  },

  setup() {
    const form = ref({
      vi: {
        name: ''
      },
      en: {
        name: ''
      },
      event_id: '',
      event_slug: '',
      event_name: '',
      event_start_time: '',
      event_end_time: '',
      event_ticket_price: '',
      event_website: '',
      sort_order: 0,
      id: '',
    })
    const images = ref([])
    const imagesPC = ref([])
    const route = useRoute()
    const tableData = ref([])

    const dataTableOptions = ref({
      dom: '<"top"f>rtl<"bottom"ip><"clear">',
      paging: true,
      pageLength: 10,
      searching: true,
      ordering: true,
      info: true,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],

      language: {
        searchPlaceholder: 'Search anything...',
      },

    })


    async function getEventList() {
      try {
        const response = await HighlightService.eventList()

        let responseData = response.data.data

        tableData.value = await convertApiDataTable(responseData)

      } catch (e) {
        console.log(e)
      }
    }

    async function getHighlightDetail(id) {
      try {

        const response = await HighlightService.list(id)

        let responseData = response.data.data[0]
        let translationData = JSON.parse(response.data.data[0].translations[0]?.attribute_data)
        form.value.event_id = responseData.event.id
        form.value.event_slug = responseData.event.slug
        form.value.event_name = responseData.event.name
        form.value.event_start_time = moment(responseData.event.start_time).format('DD-MM-YYYY HH:mm:ss')
        form.value.event_end_time = moment(responseData.event.end_time).format('DD-MM-YYYY HH:mm:ss')
        form.value.event_ticket_price = responseData.event.ticket_price
        form.value.event_website = responseData.event.website
        form.value.sort_order = responseData.sort_order
        form.value.highlight_name = responseData.name
        form.value.vi.name = responseData.name
        form.value.en.name = translationData.name
        form.value.id = id

        images.value = await Promise.all(
            responseData.images.map(async (image) => {
              const encodedUrl = await encodeImageToBase64(image.path)
              const fileUrl = await dataURItoBlob(image)
              return {
                url: encodedUrl,
                file: fileUrl,
                existing: true,
                id: image.id,
                remove: false,
              }
            }),
        )

        imagesPC.value = await Promise.all(
            responseData.images_p_c.map(async (image) => {
              const encodedUrl = await encodeImageToBase64(image.path)
              const fileUrl = await dataURItoBlob(image)
              return {
                url: encodedUrl,
                file: fileUrl,
                existing: true,
                id: image.id,
                remove: false,
              }
            }),
        )

      } catch (e) {
        console.log(e)
      }
    }

    async function convertApiDataTable(apiData) {
      return apiData.map((item) => [
        item.id,
        item.name,
        item.slug,
        moment(item.start_time).format('DD-MM-YYYY HH:mm:ss'),
        moment(item.end_time).format('DD-MM-YYYY HH:mm:ss'),
        item.ticket_price,
        item.total_ticket,
        item.type,
        item.website,
      ])
    }

    onMounted(() => {
      getEventList()

      if (route.params.id) {
        getHighlightDetail(route.params.id)
      }
    })

    return {
      ids: route.params.id,
      tableData,
      dataTableOptions,
      form,
      images,
      imagesPC,
    }
  },
}
</script>
