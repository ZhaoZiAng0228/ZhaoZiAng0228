export const filterRouter = (routerList: any, author: any) => {
  const res = routerList.filter((item: any) => {
    return item.meta.author.indexOf(author) !== -1;
  });
  res.length &&
    res.forEach((item: any) => {
      if (item.children) {
        item.children = filterRouter(item.children, author);
      }
    });
  return res;
};
