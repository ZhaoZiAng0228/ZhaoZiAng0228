/**
 * @description: 切换中英文
 * @param {*}
 * @return {*}
 */
export const myChangeLangMiXin = {
    methods: {
        changeLang(value) {
            this.$i18n.locale = value
        },
    }
}
/**
 * @description:切换主题
 * @param {*}
 * @return {*}
 */
export const styleMixin = {
    methods: {
        // 切换主题方法
        styleModeChange(style) {
            window.nightModeStyle = style;
            if (style) {
                // 暗夜模式
                document.getElementsByTagName('body')[0].className = "night-mode-style"
            } else {
                // 日间模式
                document.getElementsByTagName('body')[0].className = "mode-style"
            }
        }
    },
    beforeCreate() {
        if (window.nightModeStyle) {
            // 暗夜模式
            document.getElementsByTagName('body')[0].className = "night-mode-style"
        } else {
            // 日间模式
            document.getElementsByTagName('body')[0].className = "mode-style"
        }
    },
    created() {
        window.nightModeStyle = false;
        window['styleModeChange'] = (nightModeStyle) => {
            this.styleModeChange(nightModeStyle);
        }
    },
}