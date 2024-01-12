<template>
  <div class=" d-flex flex-row justify-content-start align-items-center gap-2">
    <router-link class="" to='/dashboard'>
      <font-awesome-icon class="text-brand-theme" size="xl" icon="home"/>
    </router-link>
    <span>></span>
    <router-link v-if="actionName" class="text-brand-theme" :to="backToUrl">
      <div class="fs-3 fw-medium fw-bold">{{ backTo }}</div>
    </router-link>
    <span v-if="actionName" >></span>
    <div class="fs-3 fw-medium fw-bold">{{ name }}</div>
  </div>
</template>
<script>
export default {
  methods: {},
  name: 'Breadcrumb',
  props: {
    name: String,
    actionName: String,
    backToUrl: String,
    backTo: String,
  },
}
</script>
