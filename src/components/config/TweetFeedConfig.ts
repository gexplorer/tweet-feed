import { Component, Vue } from 'vue-property-decorator';
import { SimpleTweet } from '../../SimpleTweet';
import TweetFeedConfigItem from './TweetFeedConfigItem';
import TweetFeedConfigMenu from './TweetFeedConfigMenu';
import io from 'socket.io-client';

@Component({
    components: {
        TweetFeedConfigItem,
        TweetFeedConfigMenu,
    },
})
export default class TweetFeedConfig extends Vue {
    public online: boolean = false;
    public timer: number = 0;
    public active: boolean = false;
    public tweets: SimpleTweet[] = [];
    public max: number = 50;
    public delay: number = 10000;
    public selectedTweet: SimpleTweet | null = null;
    public blacklist: string[] = [];
    private socket: any = io.connect('localhost:3000');

    public mounted() {
        this.stop();
        this.socket.on('addTweet', (tweet: SimpleTweet) => this.tweets.unshift(tweet));
        this.socket.on('selectTweet', (tweet: SimpleTweet) => this.selectedTweet = tweet);
        this.socket.on('updateBlacklist', (blacklist: string[]) => this.blacklist = blacklist);
        this.socket.on('connect', () => {
            this.online = true;
        });

        this.socket.on('disconnect', () => {
            this.online = false;
        });
    }

    get blockedTweets(): SimpleTweet[] {
        return this.tweets
            .filter((tweet) => this.blacklist.indexOf(tweet.username) >= 0);
    }

    get activeTweets(): SimpleTweet[] {
        return this.tweets
            .filter((tweet) => this.blacklist.indexOf(tweet.username) < 0)
            .slice(0, this.max);
    }

    get selectedId() {
        return this.selectedTweet && this.selectedTweet.id;
    }

    get selectedIndex(): number {
        return this.activeTweets.findIndex((tweet) => tweet.id === this.selectedId);
    }

    get prevIndex(): number {
        const prevIndex = this.selectedIndex + 1;
        return prevIndex < this.activeTweets.length ? prevIndex : 0;
    }

    get nextIndex(): number {
        const nextIndex = this.selectedIndex - 1;
        return nextIndex >= 0 ? nextIndex : this.activeTweets.length - 1;
    }

    get nextTweets(): SimpleTweet[] {
        let currentIndex = this.selectedIndex;
        if (currentIndex < 0) {
            currentIndex = 9999;
        }
        return this.activeTweets
            .filter((item, index) => index < currentIndex)
            .sort((a, b) => a.date >= b.date ? 1 : -1);
    }

    get prevTweets(): SimpleTweet[] {
        if (this.selectedIndex < 0) {
            return [];
        }
        return this.activeTweets
            .filter((item, index) => index > this.selectedIndex);
    }

    public updateMax(value: number) {
        this.max = value;
    }

    public updateDelay(value: number) {
        this.delay = value;
    }

    public start() {
        this.active = true;
        this.nextTweet();
        this.timer = window.setInterval(() => {
            if (this.active) {
                this.nextTweet();
            }
        }, this.delay);
    }

    public stop() {
        this.active = false;
        window.clearInterval(this.timer);
    }

    public prevTweet() {
        const tweet = this.activeTweets[this.prevIndex];
        this.selectTweet(tweet);
    }

    public nextTweet() {
        const tweet = this.activeTweets[this.nextIndex];
        this.selectTweet(tweet);
    }

    public pinTweet(tweet: SimpleTweet) {
        this.stop();
        this.selectTweet(tweet);
    }

    public selectTweet(tweet: SimpleTweet) {
        // this.selectedTweet = tweet;
        this.socket.emit('selectTweet', tweet);
    }

    public blockUser(username: string) {
        // this.blacklist.push(username);
        this.socket.emit('blockUser', username);
    }

    public unblockUser(username: string) {
        this.socket.emit('unblockUser', username);
    }
}
