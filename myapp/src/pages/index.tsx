/*
 * @Author: your name
 * @Date: 2022-03-05 19:03:07
 * @LastEditTime: 2022-03-07 09:56:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \新建文件夹 (2)\ZhaoZiAng0228\myapp\src\pages\index.tsx
 */
import React, { useState, useEffect } from 'react';
import { history, Link } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  const [count, setCount] = useState(0)
  const btn = () => {
    // console.log(1);

    history.push('/pages/home?:[id$]')
  }

  useEffect(() => {
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState == 'hidden') {
        setCount(count + 1)
      } else if (count === 3) {
        // return alert('结束')
      }
      else {
        // document.title = '这就对了~~';
        setTimeout(function () {
          document.getElementById('demo')?.innerHTML
        }, 1500);
      }
    });
    window.addEventListener("beforeunload", function (e) {
      //不是所有浏览器都支持提示信息的修改
      var confirmationMessage = "请先保存您编辑的内容,否则您修改的信息会丢失。";
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    });






  }, [count]);
  console.log(count);



  return (
    <div>
      <h1 className={styles.title} id='demo'>Page index</h1>
      <button onClick={btn}>点击</button>
      <Link to='/pages/list'>go to list </Link>
      <video id="v"></video>
    </div >
  );
}
