'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 动态路由数据
  router.get('/setRoute', controller.layout.setRoute);
  // 登录
  router.post('/login', controller.login.login);
  // 注册
  router.post('/sign', controller.login.sign);
  // 第三方登录
  router.post('/ThirdPartyLogin', controller.login.ThirdPartyLogin);

  // 工作台全部文章数据
  router.get('/workAll', controller.work.workAll);

  // 用户管理页面数据
  router.get('/user', controller.user.user);
  // 更改用户管理页面状态
  router.post('/tion', controller.user.tion);
  // 批量更改用户管理页面状态
  router.post('/allTion', controller.user.allTion);
  // 更改用户管理页面角色权限
  router.post('/role', controller.user.role);
  // 批量更改用户管理页面角色权限
  router.post('/allRole', controller.user.allRole);
  // 用户管理页面搜索功能
  router.post('/userSearch', controller.user.userSearch);


  // 所有文章页面数据
  router.get('/all', controller.all.all);
  // 所有文章页面首焦推荐
  router.post('/setRecomment', controller.all.setRecomment);
  // 删除点击的文章
  router.delete('/deleteEditor', controller.all.deleteEditor);
  // 所有文章的模糊搜索功能
  router.post('/allSearch', controller.all.allSearch);
  // 所有文章的批量删除
  router.post('/allDeleteAll', controller.all.allDeleteAll);
  // 所有文章的批量发布
  router.post('/all/allTion', controller.all.allTion);
  // 所有文章的批量首焦
  router.post('/allRecommend', controller.all.allRecommend);
  // 客户端所有文章详情页
  router.post('/getDetails', controller.all.getDetails);
  // 客户端所有文章详情页点赞和取消点赞功能
  router.post('/give', controller.all.give);
  // 客户端所有文章详情页评论功能接口
  router.post('/allMessage', controller.all.allMessage);


  // 编辑器新增文章
  router.post('/add', controller.editor.add);
  // 编辑器修改文章回显
  router.post('/echo', controller.editor.echo);
  // 编辑器修改文章
  router.post('/changeEditor', controller.editor.changeEditor);
  // 编辑器新增页面
  router.post('/addPage', controller.editor.addPage);
  // 编辑器修改页面回显
  router.post('/echoPage', controller.editor.echoPage);
  // 编辑器修改网页
  router.post('/changePageEditor', controller.editor.changePageEditor);
  // 编辑器获取分类
  router.post('/getClassTag', controller.editor.getClassTag);
  // 编辑器上传文件
  router.post('/addEditorKnow', controller.editor.addEditorKnow);


  // 上传文件
  router.post('/setLoad', controller.file.setLoad);
  // 获取文件管理页面数据
  router.get('/setFile', controller.file.setFile);
  // 文件管理页面模糊搜索
  router.post('/fileSearch', controller.file.fileSearch);
  // 文件管理页面侧边栏数据
  router.post('/detailFiles', controller.file.detailFiles);
  // 文件管理页面侧边栏数据
  router.delete('/deleteFiles', controller.file.deleteFiles);
  // 上传海报
  router.post('/setPosterLoad', controller.poster.setPosterLoad);
  // 获取海报管理页面数据
  router.post('/setPosters', controller.poster.setPosters);


  // 获取知识小册页面数据
  router.get('/setKnow', controller.knowle.setKnow);
  // 知识小册页面回显数据
  router.post('/setKnowList', controller.knowle.setKnowList);
  // 知识小册编辑
  router.post('/addFileKnow', controller.knowle.addFileKnow);
  // 知识小册编辑
  router.post('/redactKnow', controller.knowle.redactKnow);
  // 知识小册新建
  router.post('/addKnowle', controller.knowle.addKnowle);
  // 知识小册新建
  router.post('/setKnowleStatu', controller.knowle.setKnowleStatu);
  // 删除知识小册数据
  router.post('/deleteKnow', controller.knowle.deleteKnow);
  // 知识小册模糊搜索
  router.post('/searchKnowle', controller.knowle.searchKnowle);
  // 知识小册上传文件数据
  router.get('/setImgFile', controller.knowle.setImgFile);
  // 知识小册上传图片 点击覆盖
  router.post('/coverImg', controller.knowle.coverImg);
  // 知识小册上传数据模糊搜索
  router.post('/searchImgKnowle', controller.knowle.searchImgKnowle);
  // 客户端知识小册详情接口
  router.get('/knowData', controller.knowle.knowData);


  // 获取邮件管理页面数据
  router.get('/getEmail', controller.email.getEmail);
  // 邮件管理数据删除
  router.delete('/deleteEmail', controller.email.deleteEmail);
  // 邮件管理批量数据删除
  router.post('/allDeleteEmail', controller.email.allDeleteEmail);
  // 邮件管理模糊搜索
  router.post('/searchEmail', controller.email.searchEmail);


  // 获取访问统计页面数据
  router.get('/getVisit', controller.visit.getVisit);
  // 访问统计数据删除
  router.delete('/deleteVisit', controller.visit.deleteVisit);
  // 访问统计批量数据删除
  router.post('/allDeleteVisit', controller.visit.allDeleteVisit);
  // 访问统计批量数据搜索
  router.post('/searchVisit', controller.visit.searchVisit);


  // 获取搜索记录页面数据
  router.get('/getSearch', controller.search.getSearch);
  // 搜索记录数据删除
  router.delete('/deleteSearch', controller.search.deleteSearch);
  // 搜索记录数据批量删除
  router.post('/allDeleteSearch', controller.search.allDeleteSearch);


  // 访问统计批量数据搜索
  router.post('/SearchHistory', controller.search.SearchHistory);
  // 获取评论管理页面数据
  router.get('/getComment', controller.comment.getComment);
  // 修改评论管理数据状态
  router.post('/typeComment', controller.comment.typeComment);
  // 删除评论管理数据状态
  router.delete('/deleteComment', controller.comment.deleteComment);
  // 评论管理数据批量删除
  router.post('/allDeleteComment', controller.comment.allDeleteComment);
  // 批量修改评论管理状态
  router.post('/commentOff', controller.comment.commentOff);
  // 评论管理回复
  router.post('/addComment', controller.comment.addComment);
  // 评论管理批量数据搜索
  router.post('/searchComment', controller.comment.searchComment);


  // 获取页面管理页面数据
  router.get('/getPage', controller.page.getPage);
  // 修改页面管理数据状态
  router.post('/typePage', controller.page.typePage);
  // 删除页面管理数据状态
  router.delete('/deletePage', controller.page.deletePage);
  // 页面管理数据批量删除
  router.post('/allDeletePage', controller.page.allDeletePage);
  // 批量修改页面管理状态
  router.post('/PageOff', controller.page.PageOff);
  // 页面管理批量数据搜索
  router.post('/searchPage', controller.page.searchPage);


  // 获取分类管理页面数据
  router.get('/get_classify', controller.classify.get_classify);
  // 分类管理数据添加分类
  router.put('/add_classify', controller.classify.add_classify);
  //  分类管理数据修改分类
  router.post('/edit_classify', controller.classify.edit_classify);
  // 分类管理页面删除分类
  router.delete('/del_classify', controller.classify.del_classify);
  // 客户端文章分类数量
  router.post('/num_classify', controller.classify.num_classify);


  // 获取分类管理页面数据
  router.get('/get_label', controller.label.get_label);
  // 分类管理数据添加分类
  router.put('/add_label', controller.label.add_label);
  // 分类管理数据修改分类
  router.post('/edit_label', controller.label.edit_label);
  // 分类管理页面删除分类
  router.delete('/del_label', controller.label.del_label);


  // 个人中心数据
  router.get('/setSpace', controller.space.setSpace);
  // 个人中心基本设置图片
  router.post('/imgUpData', controller.space.imgUpData);
  // 个人中心基本设置
  router.post('/upDataBasic', controller.space.upDataBasic);
  // 个人中心密码更新
  router.post('/upDataPass', controller.space.upDataPass);


  // 支付
  router.get('/getAlipay', controller.alipay.getAlipay);
};
