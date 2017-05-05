import Vue from 'vue'
import RueResource from 'vue-resource'
import Router from './config/router.config.js'
import 'common/stylus/index.styl'
import App from './App'

Vue.use(RueResource)

Router.start(App, '#app')

Router.redirect({
	'/': '/goods'
})

/* eslint-disable no-new */
new Vue({
	el: 'body',
	components: {
		App
	}
})
