<template>
	<div class="allArticles">
		<el-tabs tab-position="top" style="height: 200px">
			<el-tab-pane label="销售楼盘">
				<BuildingSell />
			</el-tab-pane>
			<el-tab-pane label="房屋租赁">
				<HouseRent />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts">
	import BuildingSell from "../components/houseCom/BuildingSell.vue";
	import HouseRent from "../components/houseCom/HouseRent.vue";
	import { ref, toRefs, defineComponent, reactive } from "vue";
	export default defineComponent({
		components: {
			BuildingSell,
			HouseRent,
		},
		setup() {
			const state = reactive({
				tableData: [
					{
						date: "2016-05-03",
						name: "Tom",
						address: "No. 189, Grove St, Los Angeles",
					},
					{
						date: "2016-05-02",
						name: "Tom",
						address: "No. 189, Grove St, Los Angeles",
					},
					{
						date: "2016-05-04",
						name: "Tom",
						address: "No. 189, Grove St, Los Angeles",
					},
					{
						date: "2016-05-01",
						name: "Tom",
						address: "No. 189, Grove St, Los Angeles",
					},
					{
						date: "2016-05-02",
						name: "Tom",
						address: "No. 189, Grove St, Los Angeles",
					},
					{
						date: "2016-05-04",
						name: "Tom",
						address: "No. 189, Grove St, Los Angeles",
					},
					{
						date: "2016-05-01",
						name: "Tom",
						address: "No. 189, Grove St, Los Angeles",
					},
				],
			});
			return {
				...toRefs(state),
			};
		},
	});
	// import {
	//   getAllArticles,
	//   delArticle,
	//   setArticleStatu
	// } from "../../../api/allArticles";
	// import { ElMessage } from "element-plus";
	// import { toRaw } from "@vue/reactivity";
	// export default {
	//   data() {
	//     return {
	//       search: {
	//         statu: "",
	//         title: "",
	//         state: "",
	//         classify: ""
	//       },
	//       allArticles: [],
	//       //选中项数组
	//       multipleSelection: []
	//     };
	//   },
	//   created() {
	//     this.getAllArticles();
	//   },
	//   methods: {
	//     //多选
	//     handleSelectionChange(val) {
	//       this.multipleSelection = val;
	//     },
	//     //获取所有文章列表
	//     async getAllArticles() {
	//       const res = await getAllArticles();
	//       this.allArticles = res.data.data;
	//     },
	//     //删除
	//     async del(id) {
	//       //判断是否多选
	//       if (id) {
	//         //单选删除
	//         const res = await delArticle({ id });
	//         if (res.data.statu === 200) {
	//           ElMessage.success(res.data.msg);
	//           this.getAllArticles();
	//         }
	//       } else {
	//         //多选删除
	//         const res = await delArticle({
	//           multipleSelection: toRaw(this.multipleSelection)
	//         });
	//         if (res.data.statu === 200) {
	//           ElMessage.success(res.data.msg);
	//           this.getAllArticles();
	//         }
	//       }
	//     },
	//     //多选设置状态
	//     async setArticleStatu(statu) {
	//       const res = await setArticleStatu({
	//         multipleSelection: toRaw(this.multipleSelection),
	//         statu
	//       });
	//       if (res.data.statu === 200) {
	//         ElMessage.success(res.data.msg);
	//         this.getAllArticles();
	//       }
	//     }
	//   }
	// };
</script>
<style lang="scss" scoped>
	//所有文章
	.add {
		width: 100%;
		background: #fff;
		padding: 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		i {
			margin: 0px 20px;
			font-weight: bold;
		}
	}
	.reading {
		color: #fff;
		padding: 0 8px;
		border-radius: 10px;
		background-color: rgb(82, 196, 26);
	}
	.love {
		color: #fff;
		padding: 0 5px;
		border-radius: 10px;
		background-color: rgb(235, 47, 150);
	}
</style>