<template>
	<div class="cartcontrol">
		<div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart($event)" transition="move">
			<span class="inner icon-remove_circle_outline"></span>
		</div>
		<div class="cart-count" v-show="food.count>0" @click.stop="noMean">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
	</div>
</template>
<script>
	import Vue from 'vue'

	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart (ev) {
				if (!ev._constructed) {
					return
				}
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1)
				} else {
					this.food.count++
				}
				this.$dispatch('cart.addCart', ev.target)
			},
			decreaseCart (ev) {
				if (!ev._constructed) {
					return
				}
				if (this.food.count > 0) {
					this.food.count--
				}
			},
			// 阻止冒泡使用的无意义函数
			noMean() {
				return
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		font-size: 0
		.cart-decrease
			display: inline-block
			padding: 6px
			transition: all 0.4s linear
			&.move-transition
				opacity: 1
				transform: translate3D(0 ,0 ,0)
				.inner
					display:inline-block
					line-height: 24px
					font-size: 24px
					color: rgb(0, 120, 220)
					transition: all 0.4s linear
					transform: rotate(0)
			&.move-enter, &.move-leave
				opacity: 0
				transform: translate3D(24px ,0 ,0)
				.inner
					transform: rotate(180deg)
		.cart-count
			display: inline-block
			vertical-align: top
			width: 12px
			padding-top: 6px
			line-height: 24px
			text-align: center
			font-size: 10px
			color: rgb(147, 153, 159)
		.cart-add
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(0, 120, 220)
</style>