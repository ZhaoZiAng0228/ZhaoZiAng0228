/*
 * @Author: your name
 * @Date: 2021-10-19 19:11:15
 * @LastEditTime: 2021-10-19 20:48:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project\server_demo\src\utils\fiterRouter.js
 */


export const filterRouter = (routeList, author) => {
    const res = routeList.filter(item => {
        return item.meta.author.indexOf(author) !== -1
    })
    res.length && res.forEach(item => {
        if (item.children) {
            item.children = filterRouter(item.children, author)
        }
    })
    return res
}
