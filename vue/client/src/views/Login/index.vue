<!--
 * @Author: your name
 * @Date: 2021-10-24 18:50:13
 * @LastEditTime: 2021-10-29 19:32:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project_client\client\src\views\Login\index.vue
-->
<template>
  <div class="body">
    <div class="container w3layouts agileits">
      <div class="login w3layouts agileits">
        <h2>登 录</h2>
        <form action="#" method="post">
          <input type="text" name="Userame" placeholder="用户名" required v-model="userForm.name" />
          <input
            type="password"
            name="Password"
            placeholder="密码"
            required
            v-model="userForm.password"
          />
        </form>
        <ul class="tick w3layouts agileits">
          <li>
            <input type="checkbox" id="brand1" value />
            <label for="brand1">
              <span></span>记住我
            </label>
          </li>
        </ul>
        <div class="send-button w3layouts agileits">
          <button @click="userLogins">登录</button>
        </div>
        <a href="#">记住密码?</a>
        <div class="social-icons w3layouts agileits">
          <p>- 其他方式登录 -</p>
          <ul>
            <li class="qq" @click="thirDpartyLogin">
              <a
                href="https://gitee.com/oauth/authorize?client_id=1c1095e2f3da4befe8a051644a7f7e84b8731d7f266da147dd9a3ff08cd39971&redirect_uri=http://10.3.225.34:8080/login&response_type=code"
              >
                <span class="icons w3layouts agileits"></span>
                <span class="text w3layouts agileits">gitee</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// import { ThirdPartyLogin, } from "../../api/login";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    let userForm = ref({
      name: "",
      password: "",
    });
    let router = useRouter();
    let route = useRoute();
    let store = useStore();
    const userLogins = () => {
      store.dispatch("LOGIN_USER", { user: userForm.value });
    };
    // 第三方登录
    const thirDpartyLogin = async () => {
      if(route.query.code){
        store.dispatch("THIR_DPARTY_LOGIN", { code: route.query.code });
      }
    };
      thirDpartyLogin();
    return {
      store,
      router,
      route,
      userForm,
      thirDpartyLogin,
      userLogins,
    };
  },
};
</script>

<style scoped>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
dl,
dt,
dd,
ol,
nav ul,
nav li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
ol,
ul {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
}
.txt-rt {
  text-align: right;
}
.txt-lt {
  text-align: left;
}
.txt-center {
  text-align: center;
}
.float-rt {
  float: right;
}
.float-lt {
  float: left;
}
.clear {
  clear: both;
}
.pos-relative {
  position: relative;
}
.pos-absolute {
  position: absolute;
}
.vertical-base {
  vertical-align: baseline;
}
.vertical-top {
  vertical-align: top;
}
.underline {
  padding-bottom: 3px;
  border-bottom: 1px solid #eee;
}
nav.vertical ul li {
  display: block;
}
nav.horizontal ul li {
  display: inline-block;
}
img {
  max-width: 100%;
}

@keyframes Logins {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(3000px);
  }
}

@keyframes Bodys {
  to {
    opacity: 1;
  }
  from {
    opacity: 0;
  }
}

.body {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  font-family: "Roboto", sans-serif;
  text-align: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  z-index: 99999999;
  overflow: hidden;
  animation: Bodys 1s;
}

.body a {
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
  -ms-transition: 0.5s all;
  text-decoration: none;
}

h1 {
  font-size: 45px;
  font-weight: 500;
  letter-spacing: 4px;
  margin: 60px 0;
  color: #ffffff;
}

.container {
  width: 50%;
  margin: 0 auto;
  padding: 40px;
  background-color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 5px;
  -moz-box-shadow: 0 -5px 10px 1px rgba(99, 99, 99, 0.57);
  -webkit-box-shadow: 0 -5px 10px 1px rgba(99, 99, 99, 0.57);
  box-shadow: 0 -5px 10px 1px rgba(99, 99, 99, 0.57);
  border-bottom: none;
  border-bottom-left-radius: initial;
  border-bottom-right-radius: initial;
  animation: Logins 1s;
}

.login {
  width: 100%;
  text-align: left;
}

::-webkit-input-placeholder {
  color: #ccc;
}

:-moz-placeholder {
  color: #ccc;
}

::-moz-placeholder {
  color: #ccc;
}

:-ms-input-placeholder {
  color: #ccc;
}

h2 {
  font-size: 28px;
  text-align: center;
  color: #000;
  font-weight: 600;
  margin-bottom: 20px;
}
ul.tick {
  list-style: none;
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
}

ul.tick li input[type="checkbox"] {
  display: none;
}

ul.tick li input[type="checkbox"] + label {
  position: relative;
  padding-left: 30px;
  border: #f0f8ff;
  display: inline-block;
  font-size: 13px;
  color: #eee;
}

ul.tick li input[type="checkbox"] + label span:first-child {
  width: 17px;
  height: 17px;
  display: inline-block;
  border: 1px solid #eee;
  position: absolute;
  top: -3px;
  left: 0;
  bottom: 4px;
}

ul.tick li input[type="checkbox"]:checked + label span:first-child:before {
  content: "";
  background: url(../../images/tick.png) no-repeat;
  position: absolute;
  left: 3px;
  top: 3px;
  font-size: 10px;
  width: 10px;
  height: 10px;
}

.social-icons {
  margin-top: 20px;
  text-align: center;
}

.social-icons p {
  color: #ccc;
  margin-bottom: 15px;
}

.social-icons ul li {
  float: left;
  width: 32.9%;
}
.copyrights {
  text-indent: -9999px;
  height: 0;
  line-height: 0;
  font-size: 0;
  overflow: hidden;
}
li.twt {
  margin: 0 2px;
}

.social-icons ul li a {
  display: block;
}

.social-icons ul li a span {
  vertical-align: middle;
  color: #000;
  font-size: 15px;
  margin-left: 10px;
}

.social-icons ul li span.icons {
  background: url("../../images/i1.png") no-repeat center;
  width: 30px;
  height: 30px;
  display: inline-block;
}

.social-icons ul li.weixin span.icons {
  background: url("../../images/weixin.png") no-repeat;
  background-size: 100%;
}
.social-icons ul li.qq span.icons {
  background: url("../../images/gitee.png") no-repeat;
  background-size: 100%;
}
.social-icons ul li.weibo span.icons {
  /*--w3layouts--*/
  /*--agileits--*/
  background: url("../../images/weibo.png") no-repeat;
  background-size: 100%;
}

.social-icons ul li a:hover span.icons {
  transform: rotatey(360deg);
  -webkit-transform: rotatey(360deg);
  -o-transform: rotatey(360deg);
  -moz-transform: rotatey(360deg);
  -ms-transform: rotatey(360deg);
  transition: 0.5s all;
}

input[type="text"],
input[type="password"] {
  width: 93.4%;
  margin-bottom: 20px;
  padding: 10px;
  float: left;
  background-color: transparent;
  border: none;
  font-size: 15px;
  border-bottom: 1px solid #ccc;
  outline: none;
  color: #000;
}

.send-button {
  margin-bottom: 20px;
  text-align: center;
}

.send-button button {
  width: 60%;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 100;
  background-color: transparent;
  color: #fff;
  background-color: #0066ff;
  border-width: thin;
  cursor: pointer;
  outline: none;
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
  -ms-transition: 0.5s all;
  text-decoration: none;
}

/*--w3layouts--*/
/*--agileits--*/
.send-button input[type="submit"]:hover {
  background-color: #000;
  border: 1px solid #fff;
  color: #fff;
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
  -ms-transition: 0.5s all;
  text-decoration: none;
}

.login a {
  color: #ccc;
}

.login a:hover {
  color: #fff;
}

/*-- Index-Page-Styling --*/

/*--- Responsive Code ---*/

@media screen and (max-width: 1920px) {
  h1 {
    margin: 100px 0;
  }
}

@media screen and (max-width: 1600px) {
  h1 {
    margin: 60px 0;
  }
}

@media screen and (max-width: 1440px) {
  .container {
    width: 53%;
  }
}

@media screen and (max-width: 1366px) {
  h1 {
    margin: 50px 0;
  }
  .container {
    width: 57%;
  }
  /*--w3layouts--*/
  /*--agileits--*/
}

@media screen and (max-width: 1280px) {
  .container {
    width: 60%;
  }
}

@media screen and (max-width: 1024px) {
  .container {
    width: 76%;
  }
}

@media screen and (max-width: 966px) {
  .container {
    width: 80%;
  }
}

@media screen and (max-width: 853px) {
  .login {
    padding-right: 36px;
  }
  .social-icons ul li {
    width: 32.8%;
  }
}

@media screen and (max-width: 800px) {
  h1 {
    font-size: 43px;
  }
  .login {
    padding-right: 35px;
  }
  .social-icons ul li span.icons {
    width: 28px;
  }
}

@media screen and (max-width: 768px) {
  .container {
    width: 85%;
  }
}

@media screen and (max-width: 736px) {
  h1 {
    font-size: 40px;
  }
  .container {
    width: 87%;
    padding: 35px;
  }
  .login {
    padding-right: 34px;
  }
  .social-icons ul li a span {
    font-size: 14px;
  }
}

@media screen and (max-width: 667px) {
  h1 {
    font-size: 35px;
    letter-spacing: 3px;
  }
  .container {
    width: 55%;
    padding: 50px;
  }
  .login {
    padding: 0;
    width: 100%;
    margin-bottom: 50px;
  }
}

@media screen and (max-width: 603px) {
  h1 {
    letter-spacing: 2px;
  }
}

@media screen and (max-width: 568px) {
  h1 {
    letter-spacing: 1px;
    margin: 30px 0;
  }
  .container {
    width: 60%;
    padding: 40px;
  }
}

@media screen and (max-width: 533px) {
  h1 {
    font-size: 32px;
  }
}

@media screen and (max-width: 480px) {
  .container {
    width: 70%;
    padding: 35px;
  }
  .send-button input[type="submit"] {
    width: 50%;
    padding: 8px 0;
  }
}

@media screen and (max-width: 414px) {
  h1 {
    font-size: 30px;
  }
  .container {
    width: 75%;
    padding: 25px;
  }
  .login {
    margin-bottom: 30px;
  }
  h2 {
    font-size: 30px;
    margin-bottom: 15px;
  }
}

@media screen and (max-width: 384px) {
  h1 {
    letter-spacing: 0px;
  }
}

@media screen and (max-width: 375px) {
  .social-icons ul li span.icons {
    width: 27px;
  }
}

@media screen and (max-width: 360px) {
  .container {
    width: 80%;
    padding: 20px;
  }
}
</style>