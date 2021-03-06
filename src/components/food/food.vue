<template>
	<div class="food" v-show="showFlag" transition="move" v-el:food>
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image">
				<div class="back" @click="close">
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
				</div>
					<div class="cartcontrol-wrapper">
				<cartcontrol :food="food"></cartcontrol>
				</div>
				<div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst($event)" transition="fade">加入购物车</div>
			</div>
			<split v-show="food.info"></split>
			<div class="info" v-show="food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
				<div class="ratings-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li v-for="rating in food.ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar" class="avatar" width="12" height="12">
							</div>
							<div class="time">{{rating.rateTime | farmatDate}}</div>
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
								{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="no-ratings" v-show="!food.ratings || !food.ratings.length">当前商品无评价</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import Vue from 'vue'
	import {formateDate} from 'common/js/date'
	import cartcontrol from 'components/cartcontrol/cartcontrol'
	import split from 'components/split/split'
	import ratingselect from 'components/ratingSelect/ratingSelect'

	// const POSITIVE = 0
	// const NEGATIVE = 1
	const ALL = 2

	export default {
		data () {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			show() {
				this.selectType = ALL
				this.onlyContent = false
				this.showFlag = true
				this.$nextTick(() => {
					if (!this.foodScroll) {
						this.foodScroll = new BScroll(this.$els.food, {
							click: true
						})
					} else {
						this.foodScroll.refresh()
					}
				})
			},
			close() {
				this.showFlag = false
			},
			addFirst(ev) {
				if (!ev._constructed) {
					return
				}
				this.$dispatch('cart.addCart', ev.target)
				Vue.set(this.food, 'count', 1)
			},
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return false
				}
				if (this.selectType === ALL) {
					return true
				} else {
					return this.selectType === type
				}
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		},
		events: {
			'ratingtype.select' (type) {
				this.selectType = type
				this.$nextTick(() => {
					this.foodScroll.refresh()
				})
			},
			'content.toggle' (content) {
				this.onlyContent = content
				this.$nextTick(() => {
					this.foodScroll.refresh()
				})
			}
		},
		filters: {
			farmatDate(time) {
				let date = new Date(time)
				return formateDate(date, 'yyyy-MM-dd hh:mm')
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin'

	.food
		position: fixed
		top: 0
		bottom: 48px
		left: 0
		z-index: 30
		overflow: hidden
		width: 100%
		background: #fff
		&.move-transition
			transition: all 0.2s linear
			transform: translate3d(0,0,0)
		&.move-enter,&.move-leave
			transform: translate3d(100%,0,0)
		.image-header
			position: relative
			width: 100%
			height: 0
			// 黑魔法 设置与宽相等100%的高度
			padding-top: 100%
			img
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
			.back
				position: absolute
				top: 10px
				left: 0
				.icon-arrow_lift
					display: block
					padding: 10px
					font-size: 18px
					color: #fff
		.content
			position: relative
			padding: 18px
			.title
				margin-bottom: 8px
				line-height: 14px
				font-size: 14px
				font-weight: 700
				color: rgb(7, 17, 27)
			.detail
				margin-bottom: 18px
				height: 10px
				line-height: 10px
				font-size: 0
				.sell-count,.rating
					font-size: 10px
					color: rgb(147, 153, 159)
				.sell-count
					padding-right: 12px
			.price
				font-weight: 700
				line-height: 24px
				.now
					margin-right: 8px
					font-size: 14px
					color: rgb(240, 20, 20)
				.old
					text-decoration: line-through
					font-size: 10px
					color: rgb(147, 153, 159)
			.cartcontrol-wrapper
				position: absolute
				right: 12px
				bottom: 12px
			.buy
				position: absolute
				right: 18px
				bottom: 18px
				z-index: 10
				height: 24px
				line-height: 24px
				padding: 0 12px
				box-sizing: border-box
				font-size: 10px
				border-radius: 12px
				color: #fff
				background: rgb(0, 120, 220)
				&.fade-transition
					transition: all 0.2s
					opacity: 1
				&.fade-enter,&.fade-leave
					opacity: 0
		.info
			padding: 18px
			.title
				line-height: 14px
				margin-bottom: 6px
				font-size: 14px
				color: rgb(7, 17, 27)
			.text
				line-height: 24px
				padding: 0 8px
				font-size: 12px
				color: rgb(77, 85, 93)
		.rating
			padding-top: 18px
			.title
				line-height: 14px
				margin-left: 18px
				font-size: 14px
				color: rgb(7, 17, 27)
			.ratings-wrapper
				padding: 0 18px
				.rating-item
					position: relative
					padding: 16px 0
					border-1px(rgba(7, 17, 27, 0.1))
					.user
						position: absolute
						right: 0
						top: 16px
						line-height: 12px
						font-size: 0
						.name
							display: inline-block
							vertical-align: top
							margin-right: 6px
							font-size: 10px
							color: rgb(147, 153, 159)
						.avatar
							display: inline-block
							border-radius: 50%
					.time
						margin-bottom: 6px
						line-height: 12px
						font-size: 10px
						color: rgb(147, 153, 159)
					.text
						line-height: 16px
						font-size: 12px
						color: rgb(7, 17, 27)
						.icon-thumb_up,.icon-thumb_down
							vertical-align: middle
							margin-right: 4px
							line-height: 16px
							font-size: 12px
						.icon-thumb_up
							color: rgb(0, 160, 220)
						.icon-thumb_down
							color: rgb(147, 153, 159)
				.no-ratings
					padding: 12px 0
					color: rgb(147, 153, 159)
					font-size: 12px
</style>