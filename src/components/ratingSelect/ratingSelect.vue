<template>
	<div class="rating-select">
		<div class="rating-type border-1px">
			<span class="block positive" @click="select(2,$event)" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" @click="select(0,$event)" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives}}</span></span>
			<span class="block negative" @click="select(1,$event)" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives}}</span></span>
		</div>
		<div class="switch border-1px" :class="{'on':onlyContent}" @click="toggleContent($event)">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
	const POSITIVE = 0
	const NEGATIVE = 1
	const ALL = 2

	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE
				}).length
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE
				}).length
			}
		},
		methods: {
			select(type, ev) {
				if (!ev._constructed) {
					return
				}
				console.log(1)
				this.selectType = type
				this.$dispatch('ratingtype.select', type)
			},
			toggleContent(ev) {
				if (!ev._constructed) {
					return
				}
				this.onlyContent = !this.onlyContent
				this.$dispatch('content.toggle', this.onlyContent)
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin'
	
	.rating-select
		.rating-type
			padding: 18px 0
			margin: 0 18px
			border-1px(rgba(7, 17, 27, 0.1))
			font-size: 0
			.block
				display: inline-block
				padding: 8px 12px
				border-radius: 1px
				margin-right: 8px
				line-height: 16px
				color: rgb(77, 85, 93)
				font-size: 12px
				&.active
					color: #fff
				.count
					font-size: 8px
					margin-left: 2px
				&.positive
					background: rgba(0, 160, 220, 0.2)
					&.active
						background: rgb(0, 160, 220)
				&.negative
					background: rgba(77, 85, 93, 0.2)
					&.active
						background: rgb(77, 85, 93)
		.switch
			padding: 12px 18px
			line-height: 24px
			border-1px(rgba(7, 17, 27, 0.1))
			color: rgb(147, 153, 159)
			font-size: 0	
			&.on
				.icon-check_circle
					color: #00c850
			.icon-check_circle
				display: inline-block
				vertical-align: top
				margin-right: 4px
				font-size: 24px
			.text
				display: inline-block
				font-size: 12px
</style> 