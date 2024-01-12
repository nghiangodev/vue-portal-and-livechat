import {createI18n} from "vue-i18n";
import en_auth_trans from "@/modules/auth/i18n/en";
import vi_auth_trans from "@/modules/auth/i18n/vi";
import en_chat_trans from "@/modules/chats/i18n/en"
import vi_chat_trans from "@/modules/chats/i18n/vi"

const messages = {
    en: {
        ...en_chat_trans, ...en_auth_trans,
        login: 'Login'
    }, vi: {
        ...vi_chat_trans, ...vi_auth_trans,
        login: 'Đăng nhập'
    }
}
export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    messages
})