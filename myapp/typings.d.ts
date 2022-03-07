/*
 * @Author: your name
 * @Date: 2022-03-05 19:03:07
 * @LastEditTime: 2022-03-06 17:55:32
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \新建文件夹 (2)\ZhaoZiAng0228\myapp\typings.d.ts
 */
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare module "*.html" {
  const content: string;
  export default content;
}  