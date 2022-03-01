import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    //默认显示语言
    locale: 'zh',
    messages: {
        //引入对应语言文件
        zh: require('./zh'),
        en: require('./en')
    }
})
export default i18n