import Vue from 'vue'
import goods from 'components/goods/goods.vue'
import seller from 'components/seller/seller.vue'
import ratings from 'components/ratings/ratings.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
	'/goods': {
		component: goods
	},
	'/seller': {
		component: seller
	},
	'/ratings': {
		component: ratings
	},
	'/': {
		component: goods
	}
})

export default router
