import Vue from 'vue';
import App from './App';
import FormatDateFilter from './filters/FormatDateFilter';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faForward,
    faBackward,
    faStop,
    faPlay,
    faClock,
    faListOl,
    faHashtag,
    faStar,
    faTrash,
    faThumbtack,
    faPlus,
    faDesktop,
    faCommentAlt,
} from '@fortawesome/free-solid-svg-icons';

import {
    faStar as faStarRegular,
} from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
    faForward,
    faBackward,
    faStop,
    faPlay,
    faClock,
    faListOl,
    faHashtag,
    faStar,
    faStarRegular,
    faThumbtack,
    faTrash,
    faPlus,
    faDesktop,
    faCommentAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.filter('formatDate', FormatDateFilter);

declare module 'vue/types/vue' {
    interface VueConstructor {
        formatDate: any;
    }
}

new Vue({
    render: (h) => h(App),
}).$mount('#app');
