import { Component, Vue } from 'vue-property-decorator';
import { SimpleTweet } from '../../SimpleTweet';
import TweetFeedSlideShowItem from './TweetFeedSlideShowItem';
import io from 'socket.io-client';


@Component({
    components: {
        TweetFeedSlideShowItem,
    },
})
export default class TweetFeedSlideShow extends Vue {
    public currentTweet: SimpleTweet | null = null;

    private socket: any = io.connect('localhost:3000');

    public mounted() {
        this.socket.on('selectTweet', (tweet: SimpleTweet) => this.currentTweet = tweet);
    }

}
