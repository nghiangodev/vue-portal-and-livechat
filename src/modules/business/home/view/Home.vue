<template>
  <div class="login-page w-100">
    <div class="row g-0">
      <div class="col-xl-3 col-lg-4">
        <div class="p-4 pb-0 p-lg-5 pb-lg-0 auth-logo-section text-center">
          <div class="text-white-50 d-flex flex-column justify-content-center align-items-center">
            <h3 class="text-white">Nifehub</h3>
            <img src="/images/portal.svg">
          </div>
          <div class="mt-auto auth-img-div" v-if="image.showAuthImg">
            <img :src="image.AuthImg" alt="img" class="auth-img">
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-lg-8">
        <div class="card-login m-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column h-100 px-4 pt-4">
                <div class="row justify-content-center my-auto" style="min-height: 80vh">
                  <div class="col-sm-8 col-lg-6 col-xl-5 col-xxl-4 m-5">
                    <div class="text-center m-5">
                      <h3>Welcome Back !</h3>
                      <h6 class="text-secondary">Choose to connect server</h6>
                    </div>
                    <div class="d-flex flex-column justify-content-center align-items-center pt-5">
                      <router-link target="_blank" class="btn btn-success btn-brand-theme mb-5" to="/chat">Go to Livechat</router-link>
                      <router-link target="_blank" class="btn btn-success btn-brand-theme" to="/dashboard">Go to Portal</router-link>
                    </div>
                  </div>

                </div>
                <div class="row text-center bottom-0">
                  <div class="col-xl-12">
                    <div class="text-center text-muted p-4">
                      © {{ currentYear }} Lot Technology LLC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from '@/router';
import AuthService from "@/modules/auth/service";
import Logo from '@/assets/logo/Background.png';
import AuthImg from '@/assets/images/auth-img.png'
import {ref} from "vue";


export default {

  data() {
    return {
      image: {
        logo: Logo,
        AuthImg: AuthImg,
        showAuthImg: true
      },
      currentYear: new Date().getFullYear(),
    }
  },

  mounted() {
    this.image.showAuthImg = window.innerWidth >= 998;
  },

  setup() {
  },

  methods: {
  },
}
</script>

<style>

.login-page {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  background: var(--color-background);

  .auth-logo-section {
    display: flex;
    flex-direction: column
  }

  @media (min-width: 992px) {
    .auth-logo-section {
      height: 100vh;
    }
  }

  @media (max-width: 991.98px) {
    .auth-logo-section {
      text-align: center
    }
  }

  .auth-img-div {
    height: 60vh;

    .auth-img {
      position: relative;
      z-index: 1000;
    }
  }

  @media (min-width: 992px) and (max-width: 1549.98px) {
    .auth-img {
      max-width: 220%
    }
  }

  @media (min-width: 1550px) {
    .auth-img {
      max-width: 200%
    }
  }

  @media (min-width: 1550px) {
    .auth-img {
      max-width: 200%
    }
  }

  .card-login {
    .card {
      min-height: 92vh;
      border-radius: 16px;

      .btn-ct-primary {
        background-color: var(--color-background);

        &:hover {
          background-color: var(--color-hover-background);
        }
      }
    }
  }
}
</style>
