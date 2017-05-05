<template>
  <div>
    <v-header :seller="seller" class="header"></v-header>
    <div class="tab border-1px">
        <div class="tab-item">
            <a v-link="{path:'/goods',activeClass:'active'}" :class="v-link-active">商品</a>
        </div>
        <div class="tab-item">
             <a v-link="{path:'/ratings',activeClass:'active'}">评论</a>
        </div>
        <div class="tab-item">
            <a v-link="{path:'/seller',activeClass:'active'}">商家</a>
        </div>
    </div>
    <div>
        <router-view :seller="seller" keep-alive></router-view>
    </div>
  </div>
</template>

<script>
import {parseUrl} from 'common/js/util.js'
import header from 'components/header/header.vue'

const ERR_OK = 0

export default {
    data () {
        return {
                seller: {
                    id: (() => {
                        let queryParam = parseUrl()
                        return queryParam.id
                    })()
                }
        }
    },
    created() {
        this.$http.get('./seller.json').then((response) => {
            response = response.body
            if (response.errno === ERR_OK) {
                this.seller = Object.assign({}, this.seller, response.data)
            }
        })
    },
    components: {
        'v-header': header
    }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './common/stylus/mixin.styl'
    
    .tab
        display:flex
        width: 100%
        height:40px
        line-height:40px
        border-1px(rgba(7, 17, 27, 0.1))
        .tab-item
            flex:1
            text-align:center 
            & > a
                display:block
                font-size: 14px
                color:rgb(77, 85, 93)
                &.active
                    color:rgb(240, 20, 20) 
           
</style>
