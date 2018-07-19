import { Component, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';
import TweetFeedConfig from './components/config/TweetFeedConfig';
import TweetFeedSlideShow from './components/slideshow/TweetFeedSlideShow';

Vue.use(VueRouter);

const routes = [
    {
        path: '/config',
        component: TweetFeedConfig,
    },
    {
        path: '/slideshow',
        component: TweetFeedSlideShow,
    },
    {
        path: '*',
        redirect: '/config',
    },
];

const router = new VueRouter({
    routes,
});

@Component({
    components: {
        TweetFeedConfig,
    },
    router,
})
export default class App extends Vue {
}
