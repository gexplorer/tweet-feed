import { Component, Vue } from 'vue-property-decorator';
import { SimpleTweet } from '../../SimpleTweet';
import TweetFeedSlideShowItem from './TweetFeedSlideShowItem';
import io from 'socket.io-client';
import { Application, Service  } from '@feathersjs/feathers';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

@Component({
    components: {
        TweetFeedSlideShowItem,
    },
})
export default class TweetFeedSlideShow extends Vue {
    public currentTweet: SimpleTweet | null = null;

    private socket: any = io.connect(':3030');
    private app: Application = feathers();
    private tweetService: Service<SimpleTweet>;

    constructor() {
        super();
        this.app.configure(socketio(this.socket));
        this.tweetService = this.app.service('tweets');
    }

    public mounted() {
        this.tweetService.on('selected', (tweet: SimpleTweet) => {
            this.currentTweet = tweet;
        });
    }

}
