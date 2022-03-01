'use strict';

// 搜索记录 接口

const Controller = require('egg').Controller;


class SearchController extends Controller {

    /* 获取搜索记录数据 */
    async getSearch() {
        const { ctx } = this;
        const { pageIndex, pageSize, searchInp } = ctx.query
        const list = await this.app.mysql.query(`
        SELECT * FROM search_history ORDER BY id DESC
        `);
        let searchList = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)

        //获取模糊搜索数据
        const userSearchList = await this.app.mysql.query(`SELECT * FROM allessay WHERE title LIKE '%${searchInp}%' AND tion LIKE '%true%' ORDER BY id DESC`)
        //获取搜索记录数据
        const searchData = await this.app.mysql.select('search_history')
        let data = +new Date();
        if (searchInp) {
            //判断是否存在
            let obj = searchData.find((item) => item.content === searchInp)
            obj
                ? await this.app.mysql.update('search_history', {
                    id: obj.id,
                    count: obj.count * 1 + 1,
                    date: new Date(parseInt(data)).toLocaleString()
                })
                : await this.app.mysql.insert('search_history', {
                    count: 1,
                    type: '',
                    content: searchInp,
                    date: new Date(parseInt(data)).toLocaleString()
                })
        }
        ctx.body = {
            code: 200,
            searchList,
            userSearchList,
            total: list.length
        }
    }

    /* 搜索记录数据删除 */
    async deleteSearch() {
        const { ctx } = this;
        const { id } = ctx.query
        await this.app.mysql.delete('search_history', { id: id });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
    /* 搜索记录数据批量删除 */
    async allDeleteSearch() {
        const { ctx } = this;
        const { searchHistoryList } = ctx.request.body
        await searchHistoryList.map(async item => {
            await this.app.mysql.query(`DELETE FROM search_history WHERE id = '${item.id}'`);
        })
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
    /* 访问搜索记录搜索 */
    async SearchHistory() {
        const { ctx } = this;
        const { dimSearchHistory } = ctx.request.body
        const result = await this.app.mysql.query(`
        SELECT * FROM search_history WHERE 
        type LIKE '%${dimSearchHistory.type}%' AND 
        content LIKE '%${dimSearchHistory.content}%' AND 
        count LIKE '%${dimSearchHistory.count}%' 
        `);
        ctx.body = {
            code: 200,
            message: '操作成功',
            result
        }
    }
}


module.exports = SearchController;