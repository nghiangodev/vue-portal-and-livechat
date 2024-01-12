import "boxicons";
import "bootstrap"
import i18n from "./i18n"
import "./assets/main.css"
import App from "./App.vue";
import router from "./router";
import {createPinia} from "pinia";
import {createHead} from "@vueuse/head";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import VueSelect from "vue-select";

library.add(fas);

import {createApp} from 'vue/dist/vue.esm-bundler';

const head = createHead()

const app = createApp(App);

app.config.globalProperties.$eventBus = createEventBus();


app.use(createPinia());
app.use(head);
app.use(VueSweetalert2);
app.use(i18n);
app.use(router);

app.component("v-select", VueSelect)
app.component('font-awesome-icon', FontAwesomeIcon).mount("#app");

function createEventBus() {
    const listeners = {};
    return {
        $on(event, callback) {
            if (!listeners[event]) {
                listeners[event] = [];
            }
            listeners[event].push(callback);
        },
        $emit(event, ...args) {
            if (listeners[event]) {
                listeners[event].forEach((callback) => {
                    callback(...args);
                });
            }
        },
    };
}
