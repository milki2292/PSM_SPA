import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHamburger, faSearch, faSignOutAlt, faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faYahoo, faGoogle} from '@fortawesome/free-brands-svg-icons'
import { faThumbsUp as faThumbsUpRegular} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHamburger, faSearch, faSignOutAlt, faFacebook, faGithub, faYahoo, faGoogle, faThumbsUp, faThumbsUpRegular)
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
