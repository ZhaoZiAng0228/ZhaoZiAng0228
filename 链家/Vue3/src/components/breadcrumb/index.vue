<!--
 * @Author: your name
 * @Date: 2021-10-13 10:54:19
 * @LastEditTime: 2021-10-15 19:09:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\component\Card\index.vue
-->
<template>
	<div class="header-con">
		<!-- 工作台页头 -->
		<!-- <div class="work_head" v-if="path === '/home/Work'">
			<span>工作台</span>
			<h1>您好,{{ store.state.userInfo.name }}</h1>
			<span
				>您的角色：{{
					store.state.userInfo.role == "0" ? "管理员" : "经纪人"
				}}</span
			>
		</div> -->
		<!-- 其他页面页头（面包屑） -->
		<!-- <el-breadcrumb separator="/" v-else> -->
		<el-breadcrumb separator="/">
			<!-- <el-breadcrumb-item to="/home/Work">工作台</el-breadcrumb-item> -->
			<el-breadcrumb-item v-for="v in crumbs" :key="v">
				{{ v }}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
	import { useStore } from "vuex";
	export default {
		props: ["path", "crumbs"],
		setup() {
			const store = useStore();

			return { store };
		},
	};
</script>

<style lang="scss" scoped></style>

