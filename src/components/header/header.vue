<template>
	<div>
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64"  :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMaps[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="iconfont icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="iconfont icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<div class="detail" v-show="detailShow" transition="fade">
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">商品信息</div>
						<div class="line"></div>
					</div>
					<ul v-if="seller.supports" class="supports">
						<li v-for="item in seller.supports" class="supports-item">
							<span class="icon" :class="classMaps[seller.supports[$index].type]"></span>
							<span class="text">{{seller.supports[$index].description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商品公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">{{seller.bulletin}}</p>
					</div>
				</div>
			</div>
			<div class="detail-close" @click="detailHide">
				<i class="iconfont icon-close"></i>
			</div>
		</div>
	</div>
</template>
<script>
	import star from 'components/stars/stars'

	export default {
		data () {
			return {
				detailShow: false
			}
		},
		props: ['seller'],
		created () {
			this.classMaps = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
		},
		methods: {
			showDetail () {
				this.detailShow = true
			},
			detailHide () {
				this.detailShow = false
			}
		},
		components: {
			star
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin'

	.header
		position: relative
		color:#fff
		background: rgba(7, 17, 27, 0.5)
		overflow: hidden
		.content-wrapper
			position: relative
			padding: 24px 12px 18px 24px
			font-size: 0
			.avatar
				display: inline-block
			img
				border-radius: 4px
			.content
				display: inline-block
				margin-left: 16px
				vertical-align: top
				.title
					margin:2px 0 8px 0
					.brand
						display:inline-block
						vertical-align: top
						width:30px
						height:18px
						bg-image('brand')
						background-size: 30px 18px
						background-repeat: no-repeat
					.name
						margin-left: 6px
						font-size: 16px
						line-height: 18px
						font-weight: bold
				.description
					margin-bottom: 10px
					line-height: 12px
					font-size: 12px
				.support
					.icon
						display: inline-block
						vertical-align: top
						width: 12px
						height: 12px
						margin-right: 4px
						background-size: 12px 12px
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')	
					.text
						font-size: 10px
						line-height: 12px
			.support-count
				position: absolute
				right: 12px
				bottom: 18px
				padding: 0 8px
				height: 24px
				line-height: 24px
				border-radius: 14px
				background: rgba(0, 0, 0, 0.2)
				text-align: center
				.count
					font-size: 10px
					vertical-align: top
				.icon-keyboard_arrow_right
					margin-left: 2px
					line-height: 24px
					font-size: 10px
		.bulletin-wrapper
			height: 28px
			line-height: 28px
			padding: 0 22px 0 12px
			white-space: nowrap
			overflow: hidden
			text-overflow:ellipsis
			position: relative
			background-color: rgba(7, 17, 27, 0.2)
			.bulletin-title
				vertical-align: top
				display: inline-block
				width: 22px
				height: 12px
				bg-image('bulletin')
				margin-top: 8px
				background-size: 22px 12px
				background-repeat: no-repeat
			.bulletin-text
				vertical-align: top
				margin: 0 4px
				font-size: 10px
			.icon-keyboard_arrow_right
				position: absolute
				font-size: 10px
				right: 8px
				top: 7px
		.background
			position: absolute
			left: 0
			top: 0
			width: 100%
			height: 100%
			z-index: -1
			filter:blur(10px)
		.detail
			position: fixed
			top: 0
			left: 0
			z-index: 99
			width: 100%
			height: 100%
			overflow: auto
			transition: 0.3s
			backdrop-filter: blur(8px)
			&.fade-transition
				opacity: 1
				background: rgba(7, 17, 27, 0.8)
			&.fade-enter,&.fade-leave
				opacity: 0
				background: rgba(7, 17, 27, 0)
			.detail-wrapper
				width: 100%
				min-height: 100%
				.detail-main
					margin-top: 64px
					padding-bottom: 64px
					.name
						line-height: 16px
						text-align: center
						font-size: 16px
						font-weight: 700
					.star-wrapper
						margin-top: 18px
						padding: 2px 0
						text-align: center
					.title
						display: flex
						width: 80%
						margin: 28px auto 24px;
						.line
							position: relative
							flex: 1
							top: -6px
							border-bottom: 1px solid rgba(255, 255, 255, 0.2)
						.text
							padding: 0 12px
							font-weight: 800
							font-size: 14px
					.supports
						width: 80%
						margin: 0 auto
						.supports-item
							padding: 0 12px
							margin-bottom: 12px
							font-size: 0
							&:last-child
								margin-bottom: 0
							.icon
								display: inline-block
								width: 16px
								height: 16px
								vertical-align: top
								margin-right: 6px
								background-repeat: no-reapeat
								background-size: 16px 16px
								&.decrease
									bg-image('decrease_2')
								&.discount
									bg-image('discount_2')
								&.guarantee
									bg-image('guarantee_2')
								&.invoice
									bg-image('invoice_2')
								&.special
									bg-image('special_2')
							.text
								vertical-align: top
								line-height: 16px
								font-size: 12px
					.bulletin
						width: 80%
						margin: 0 auto
						.content
							padding: 0 12px
							line-height: 24px
							font-size: 12px			
			.detail-close
				position: relative
				width: 32px
				height: 32px
				margin:-64px auto 0 auto
				clear: both
				font-size: 32px
				
</style>