<template>
	<div class="ratings" v-el:ratings>
		<div class="ratings-content">
			<div class="over-view">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore" class="star"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore" class="star"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery-time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
			<div class="ratings-wrapper">
				<ul v-show="ratings && ratings.length">
					<li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="username">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score" class="star"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<i class="icon-thumb_up"></i>
								<span class="item" v-for="text in rating.recommend">{{text}}</span>
							</div>
							<span class="time">{{rating.rateTime |farmatDate}}</span>
						</div>
					</li>
				</ul>
				<div class="no-ratings" v-show="!ratings || !ratings.length">当前商品无评价</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import {formateDate} from 'common/js/date'
	import star from 'components/stars/stars'
	import split from 'components/split/split'
	import ratingselect from 'components/ratingSelect/ratingSelect'

	const ALL = 2
	const ERR_OK = 0

	export default {
		props: {
			seller: {
				type: Object,
				default () {
					return {}
				}
			},
			ratings: {
				type: Array,
				default () {
					return []
				}
			}
		},
		created() {
			this.$http.get('ratings.json').then((response) => {
				response = response.body
				if (response.errno === ERR_OK) {
					this.ratings = response.data
					this.$nextTick(() => {
						this.ratingScroll = new BScroll(this.$els.ratings, {
							click: true
						})
					})
				}
			})
		},
		methods: {
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return
				}
				if (this.selectType === 2) {
					return true
				} else {
					return type === this.selectType
				}
			}
		},
		data() {
			return {
				selectType: ALL,
				onlyContent: true
			}
		},
		components: {
			star,
			split,
			ratingselect
		},
		filters: {
			farmatDate(time) {
				let date = new Date(time)
				return formateDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		events: {
			'ratingtype.select' (type) {
				this.selectType = type
				this.$nextTick(() => {
					this.ratingScroll.refresh()
				})
			},
			'content.toggle' (onlyContent) {
				this.onlyContent = onlyContent
				this.$nextTick(() => {
					this.ratingScroll.refresh()
				})
			}
		}

	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin'

	.ratings
		position: absolute
		top: 174px
		bottom: 0
		left: 0
		width: 100%
		overflow: hidden
		.over-view
			display: flex
			padding: 18px 0
			.overview-left
				padding: 6px 0
				flex: 0 0 137px
				width: 137px
				border-right: 1px solid rgba(7, 17, 27, 0.1)
				text-align: center
				@media only screen and (max-width:320px)
					flex: 0 0 120px
					width: 120px
				.score
					margin-bottom: 6px
					line-height: 28px
					font-size: 24px
					color: rgb(255, 153, 0)
				.title
					margin-bottom: 8px
					line-height: 12px
					font-size: 12px
					color: rgb(7, 17, 27)
				.rank
					line-height: 10px
					font-size: 10px
					color: rgb(147, 153, 159)
			.overview-right
				flex: 1
				padding: 6px 0 6px 24px
				@media only screen and (max-width:320px)
					padding-left: 6px
				.score-wrapper
					margin-bottom: 8px
					font-size: 0
					.title
						display: inline-block
						vertical-align: top
						line-height: 18px
						font-size: 12px
						color: rgb(7, 17, 27)
					.star
						display: inline-block
						vertical-align: top
						margin: 0 12px
					.score
						display: inline-block
						vertical-align: top
						line-height: 18px
						font-size: 12px
						color: rgb(255, 153, 0)
				.delivery-wrapper
					font-size: 0
					.title
						vertical-align: top
						font-size: 12px
						color: rgb(7, 17, 27)
					.delivery-time
						margin-left: 12px
						font-size: 12px
						color: rgb(147, 153, 159)
		.ratings-wrapper
			padding: 0 18px
			.rating-item
				display: flex
				padding: 18px 0
				border-1px(rgba(7, 17, 27,0.1))
				.avatar
					margin-right: 12px
					flex: 0 0 28px
					width: 28px
					img
						border-radius: 50%
				.content
					position: relative
					flex: 1
					.username
						margin-bottom: 4px
						line-height: 12px
						font-size: 10px
						color: rgb(7, 17, 27)
					.star-wrapper
						margin-bottom: 6px
						font-size: 0
						.star
							display: inline-block
							vertical-align: top
							margin-right: 6px
						.delivery
							display: inline-block
							vertical-align: top
							line-height: 12px
							font-size: 10px
							color: rgb(147, 153, 159)
					.text
						margin-bottom: 8px
						line-height: 18px
						font-size: 12px
						color: rgb(7, 17, 27)
					.recommend
						line-height: 16px
						font-size: 0
						.icon-thumb_up,.item
							display: inline-block
							margin:0 8px 4px 0
							font-size: 9px
						.icon-thumb_up
							color: rgb(0, 160, 220)
						.item
							padding: 0 6px
							border: 1px solid rgba(7, 17, 27, 0.1)
							border-radius: 1px
							color: rgb(147, 153, 159)
							background: #fff
					.time
						position: absolute
						top: 0
						right: 0
						color: rgb(147, 153, 159)
						font-size: 12px
</style>