<template>
  <div class="login-page w-100">
    <div class="row g-0">
      <div class="col-xl-3 col-lg-4">
        <div class="p-4 pb-0 p-lg-5 pb-lg-0 auth-logo-section text-center">
          <div class="text-white-50 d-flex flex-column justify-content-center align-items-center">
            <h3 class="text-white">Nifehub</h3>
            <h5 class="text-white">Customer service</h5>
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
                      <h6 class="text-secondary">Sign in to continue to <br> <strong>Nifehub Customer service.</strong>
                      </h6>
                    </div>
                    <form class="space-y-6" action="#" method="POST" @submit.prevent="submit">
                      <div class="row">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div class="mt-3">
                          <input id="email" name="email" type="email" autocomplete="email"
                                 v-model="form.email" required="" style="padding-left: 10px"
                                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                      </div>

                      <div class="row">
                        <div class="flex items-center justify-between">
                          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
                            {{ $t('login_page.password') }}
                          </label>
                          <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">
                              {{ $t('login_page.forgot_pass') }}?</a>
                          </div>
                        </div>
                        <div class="mt-3">
                          <input id="password" name="password" type="password" autocomplete="current-password"
                                 required="" style="padding-left: 10px"
                                 v-model="form.password"
                                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset
                                       ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                       focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <div class="mt-3">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="remember_me" id="remember_me">
                            <label class="form-check-label" for="remember_me">
                              {{ $t('login_page.remember_me') }}
                            </label>
                          </div>
                        </div>
                      </div>
                      <button v-if="checkSubmit" type="button" disabled
                              class="flex w-full justify-center rounded-md btn-ct-primary px-3 py-1.5 text-sm font-semibold
                                       leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <span class="spinner-border spinner-border-sm m-1" role="status"></span>
                      </button>
                      <button v-else type="submit"
                              class="flex w-full justify-center rounded-md btn-ct-primary px-3 py-1.5 text-sm font-semibold
                                       leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <span>{{ $t('login') }}</span>
                      </button>
                    </form>
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
      currentYear: new Date().getFullYear(),
      image: {
        logo: Logo,
        AuthImg: AuthImg,
        showAuthImg: true
      },
      form: {
        email: '',
        password: ''
      },
      groups: []
    }
  },

  mounted() {
    this.image.showAuthImg = window.innerWidth >= 998;
  },

  setup() {
    const checkSubmit = ref(false)

    return {
      checkSubmit,
    }
  },

  methods: {
    async submit() {
      this.$emit('submit', this.form);
      this.checkSubmit = true;
      let customer_support = false;
      const email = this.form.email;
      const password = this.form.password;
      if (email && password) {
        try {

          const login = await AuthService.loginUser(email, password)
          if (login.success && login.statusCode === 200) {

            this.groups = login.data.groups
            await this.groups.forEach((item) => {
              if (item.code === 'customer-support') {
                customer_support = true
              }
            });
            if (customer_support === true) {
              localStorage.setItem("isLoggedIn", 'true')
              localStorage.setItem('userId', login.data.id)
              localStorage.setItem('token', login.data.token)
              localStorage.setItem('realName', login.data.real_name)
              localStorage.setItem('isCheckin', login.data.is_checkin)
              localStorage.setItem('isActivated', login.data.is_activated)
              localStorage.setItem('isAdminLogin', login.data.is_admin_login)
              localStorage.setItem('userName', login.data.username)
              await router.push({name: 'Home'});
            } else {
              this.checkSubmit = false
              this.$swal.fire({
                timer: 3000,
                position: "top-end",
                icon: "error",
                showConfirmButton: false,
                title: "Bạn không có quyền truy cập vào trang này!",
              })
            }
          } else {
            this.checkSubmit = false
            this.$swal.fire({
              timer: 3000,
              position: "top-end",
              icon: "warning",
              showConfirmButton: false,
              title: "Tài khoản hoặc mật khẩu không đúng!",
            })
          }
        } catch {
          this.$swal.fire({
            timer: 3000,
            position: "top-end",
            icon: "error",
            showConfirmButton: false,
            title: "Có lỗi trong quá trình đăng nhập, vui lòng thử lại!",
          })
        }
      }
    }
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
