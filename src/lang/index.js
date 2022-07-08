import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)


const messages = {
    en: {
      message: 'hello',
      ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
    },
    zh: {
      message: '你好',
      ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
    }
  }

  const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
  })
  
  Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
  })
  
 export default i18n;