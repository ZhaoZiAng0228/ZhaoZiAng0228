/*
 * @Author: your name
 * @Date: 2021-11-11 09:35:56
 * @LastEditTime: 2021-11-11 19:27:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\pratice_two\demo-ts\src\App.tsx
 */
import { BrowserRouter } from 'react-router-dom'
import { RouterView, routes } from './router/index'
//js写样式,用js的方式写css,作为组件使用,全局样式组件要注册在全局根组件的第一个组件位置
// import { GlobalStyle } from './assets/reset.style'
import ErrorBoundary from './components/ErrorBoundary'
import './App.scss'

const App = () => {
  return (
    <div className='container' style={{ width: '100%', height: '100%' }}>
      <BrowserRouter>
        {/* <GlobalStyle /> */}
        <ErrorBoundary>
          <RouterView routes={routes} />
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App
