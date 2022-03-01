<template>
	<keep-alive>
		<router-view />
	</keep-alive>
</template>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		list-style: none;
		text-decoration: none;
		user-select: none;
		box-sizing: border-box;
	}
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
	}
	::-webkit-scrollbar {
		width: 0 !important;
		height: 0;
	}

	.statu-icon {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		margin-right: 5px;
	}
	.true {
		background: #52c41a;
	}
	.false {
		background: #faad14;
	}
</style>
