<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/dashboard"> <img width=40px src="/images/portal.svg"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-2">

            <li class="nav-item dropdown" v-for="(navbar,menuName) in navBars">
              <a class="nav-link dropdown-toggle text-white fs-custom" href="#" :id="menuName" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <font-awesome-icon :icon="navbar.icons"/>
                {{ menuName }}
              </a>
              <ul class="dropdown-menu" :aria-labelledby="menuName">
                <li v-for="item in navbar.items">
                  <router-link  class="dropdown-item " :to="menuGenerate(menuName,item)">{{ item }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button class="btn btn-success btn-brand-theme dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {{ userName }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button class="dropdown-item" @click="logOut">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import {computed, ref} from 'vue'
import router from '@/router'
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import Unidecode from "unidecode";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      userName: localStorage.getItem('userName'),
    }
  },
  setup() {
    const navBars = ref({
      'Placetogo': {
        'icons': 'earth-americas',
        'items': [
          'Category',
          'Post type',
          'Business Profile',
          'Recommend shop',
          'Banner Ads app',
          'Shops',
          'Report',
          'Report Reason',
        ],
      },
      'Social': {
        'icons': 'people-arrows',
        'items': [
          'Posts',
          'Report',
          'Report reason',
        ],
      },
      'Event': {
        'icons': 'calendar',
        'items': [
          'Event',
          'Type',
          'Highlight',
          'Special guest',
          'Event internal page',
        ],
      },
      'Voucher': {
        'icons': 'ticket',
        'items': [
          'Voucher',
          'Voucher code',
        ],
      },
      'Business': {
        'icons': 'business-time',
        'items': [
          'Business Request',
          'Identities',
          'Business posts blog',
          'package register',
          'Type',
          'Booking block ips',
          'Transaction',
        ],
      },
      'Companion': {
        'icons': 'users',
        'items': [
          'Profile',
          'Service list',
          'Feature',
          'Trending',
          'Group',
          'Zodiac',
          'Report',
          'Report reason',
          'Review list',
          'Credit points',
          'Request',
          'Banner',
          'Recruitment angel',
          'Gift',
          'Call with stranger',
        ],
      },
      'Agency': {
        'icons': 'user',
        'items': [
          'Agency',
        ],
      },
      'KOL': {
        'icons': 'user',
        'items': [
          'List KOL',
          'KOL identities',
        ],
      },
      'Order': {
        'icons': 'money-bill',
        'items': [
          'Order',
          'Transaction',
          'Order cancel',
        ],
      },
      'Advertising': {
        'icons': 'truck-fast',
        'items': [
          'Packages',
          'Request Packages',
          'Category',
        ],
      },
      'Contact': {
        'icons': 'address-book',
        'items': [
          'Contact',
          'Agency Contact',
        ],
      },
      'Careers': {
        'icons': 'file',
        'items': [
          'Category',
          'Careers',
          'Profile',
        ],
      },
      'Wallet': {
        'icons': 'wallet',
        'items': [
          'Transaction',
        ],
      },
      'FAQ': {
        'icons': 'question',
        'items': [
          'FAQ',
          'Group',
        ],
      },
      'User': {
        'icons': 'user',
        'items': [
          'Users',
          'Identities',
          'Report',
          'Reason',
          'Call logs',
        ],
      },
    })

    return {
      navBars,
    }
  },
  methods: {
    logOut() {
      localStorage.setItem('isLoggedIn', 'false')
      localStorage.setItem('userId', '')
      localStorage.setItem('token', '')
      localStorage.setItem('realName', '')
      localStorage.setItem('isCheckin', '')
      localStorage.setItem('isActivated', '')
      localStorage.setItem('isAdminLogin', '')
      router.push({name: 'Login'})
    },

    menuGenerate(category, subCategory) {
      category = category.toLowerCase().trim()

      subCategory =  Unidecode(subCategory).toLowerCase().replace(/[^a-zA-Z0-9-]+/g, "-");

      return `/${category}/${subCategory}`
    }
  },
}
</script>
<style scoped>
/* Add styling for the header */
header {
  background-color: #4EAC6D;
  color: #ffffff;
}
</style>
