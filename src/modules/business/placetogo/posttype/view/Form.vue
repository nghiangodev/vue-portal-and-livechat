\
<template>
  <DefaultLayout>
    <!--    breadcrumb-->
    <Breadcrumb :name=" ids ? 'Edit' : 'Add new'" backToUrl="/placetogo/category" backTo="Category" actionName="Edit"></Breadcrumb>
    <!--    endbreadcrumb-->
    <Form @submit="submitForm" ref="formSubmit" class="w-100" :validationSchema="validationSchema">
      <div class="pt-3 row">
        <div class="col-6 pt-2">
          <label for="fullName" class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Name
            <img src="/images/flag/vi.svg">
            <span class="text-danger fw-bold">&#42;</span>
          </label>
          <Field type="text" class="form-control mt-2 mb-2" @keyup="handleKeyUpVi" v-model="form.vi.name" placeholder="Vui lòng nhập dữ liệu" id="form_vi_name"
                 name="form_vi_name"/>
          <Field type="text" class="form-control mt-2 mb-2" hidden v-model="form.id" name="id"/>
          <ErrorMessage class="error py-2 text-danger" name="form_vi_name"/>
        </div>
        <div class="col-6  pt-3">
          <label class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Slug <img src="/images/flag/vi.svg"></label>
          <input v-model="form.vi.slug" readonly name="form_vi_slug" class="form-control mb-2">
        </div>
        <div class="col-6 pt-2">
          <label for="fullName" class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Name
            <img src="/images/flag/en.svg"><span class="text-danger fw-bold">&#42;</span></label>
          <Field type="text" class="form-control mt-2 mb-2" @keyup="handleKeyUpEn" v-model="form.en.name" placeholder="Vui lòng nhập dữ liệu" id="form_en_name"
                 name="form_en_name"/>
          <ErrorMessage class="error py-2 text-danger" name="form_en_name"/>
        </div>
        <div class="col-6  pt-3">
          <label class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Slug <img src="/images/flag/en.svg"></label>
          <input v-model="form.en.slug" readonly name="form_en_slug" class="form-control mb-2">
        </div>
        <div class="col-6  pt-3">
          <label class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Danh mục cha</label>
          <v-select class="custom-height-select" name="type_id" v-model="this.form.parent_id" :options="parentList" label="title" multiple></v-select>
        </div>
        <div class="col-6  pt-2">
          <label class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Sort order</label>
          <Field v-model="form.order" name="sort_order" type="number" class="text-end form-control mt-2"></Field>
        </div>
        <div class="col-6  pt-2 mb-2">
          <label class="fw-bold fs-custom w-100 d-flex flex-row gap-2 align-items-center">Category image</label>
          <UploadAvatar :images="cImages"></UploadAvatar>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-start pt-5 gap-3 align-items-center">
        <button class="btn btn-dark" type="button" @click=reverseUrl>Back</button>
        <button class="btn btn-brand-theme" type="submit">Save</button>
      </div>
    </Form>
  </DefaultLayout>
  <!-- Modal -->
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
import PTGCategoryService from '@/modules/business/placetogo/category/service'
import moment from 'moment/moment'
import UploadImages from '@/modules/business/common/UploadImages.vue'
import 'vue-select/dist/vue-select.css'
import {generateSlug} from '@/services/helper'
import UploadAvatar from '@/modules/business/common/UploadAvatar.vue'
import PTGPostTypeService from '@/modules/business/placetogo/posttype/service'

export default {
  components: {
    UploadAvatar,
    Breadcrumb,
    DefaultLayout,
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      cImages: [],
      form: {
        vi: {
          name: '',
          slug: '',
          description: '',
        },
        en: {
          name: '',
          slug: '',
          description: '',
        },
        order: '',
        parent_id: [],
        id: '',
      },
    }
  },
  methods: {
    handleKeyUpVi(event) {
      this.form.vi.slug = generateSlug(event.target.value)
    },
    handleKeyUpEn(event) {
      this.form.en.slug = generateSlug(event.target.value)
    },
    async submitForm() {

      const formData = new FormData()


      for (let i = 0; i < this.cImages.length; i++) {
        const cImages = this.cImages[i]

        if (!this.cImages[i].existing && !this.cImages[i].remove) {
          formData.append('cImages[]', cImages.file)
        }

        if (this.cImages[i].remove && this.cImages[i].id > 0) {
          formData.append('removeCImages[]', cImages.file)
        }
      }

      formData.append('order', this.form.order)
      formData.append('data_vi', JSON.stringify(this.form.vi))
      formData.append('data_en', JSON.stringify(this.form.en))
      formData.append('parent_id', JSON.stringify(this.form.parent_id))

      formData.append('id', this.form.id)

      const response = await PTGPostTypeService.storeList(formData)

      let data = response.data

      await hideBlockingOverlay()

      if (data.data.id) {
        await successSwal(`/placetogo/post-type/form/${data.data.id}`, 'Thêm dữ liệu thành công', true)
      } else {
        await errorSwal(data.statusValue)
      }

    },

    async reverseUrl() {
      try {
        await warningSwal('PtgPostType', 'Dữ liệu sẽ không được lưu lại. Bạn chắc chứ ?')
      } catch {
        await errorSwal()
      }
    },

  },
  mounted() {
  },
  computed: {
    validationSchema() {
      return yup.object({
        form_vi_name: yup.string().required('Trường này là bắt buộc'),
        form_en_name: yup.string().required('Trường này là bắt buộc'),
      })
    },
  },

  setup() {
    const form = ref({
      vi: {
        name: '',
        slug: '',
      },
      en: {
        name: '',
        slug: '',
      },
      order: '',
      parent_id: [],
      id: '',
    })
    const cImages = ref([])
    const parentList = ref([])
    const route = useRoute()

    async function getPostTypeId(id) {
      try {

        const response = await PTGPostTypeService.list(id)

        let responseData = response.data.data[0]
        let translationData = JSON.parse(response.data.data[0].translations[0]?.attribute_data)
        console.log(translationData)
        form.value.vi.name = responseData.name
        form.value.vi.slug = responseData.slug
        form.value.en.name = translationData.name ?? ''
        form.value.en.slug = translationData.slug ?? ''
        form.value.order = responseData.order
        form.value.id = id

        form.value.parent_id = responseData.category.map(item => ({
          id: item.id,
          title: item.name,
        }))
        cImages.value = [
          {
            url: await encodeImageToBase64(responseData.image.path),
            file: await dataURItoBlob(responseData.image),
            existing: true,
            id: responseData.id,
            remove: false,
          }]

      } catch (e) {
        console.log(e)
      }
    }

    async function categoryParentList() {
      try {

        let response = await PTGCategoryService.parentList()

        response = response.data.data

        parentList.value = response.map(item => ({id: item.id, title: item.name}))

      } catch (e) {
        console.log(e)
      }
    }


    onMounted(() => {
      if (route.params.id) {
        getPostTypeId(route.params.id)
        categoryParentList()
      }
    })

    return {
      ids: route.params.id,
      form,
      cImages,
      parentList,
    }
  },
}
</script>
