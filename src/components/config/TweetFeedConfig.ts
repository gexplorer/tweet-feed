import { Component, Vue } from 'vue-property-decorator';
import { SimpleTweet } from '../../SimpleTweet';
import TweetFeedConfigItem from './TweetFeedConfigItem';
import TweetFeedConfigMenu from './TweetFeedConfigMenu';
import TweetFeedConfigInputModal from './TweetFeedConfigInputModal';
import TweetFeedConfigStartModal from './TweetFeedConfigStartModal';

import io from 'socket.io-client';
import { Application, Service  } from '@feathersjs/feathers';

import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

@Component({
    components: {
        TweetFeedConfigItem,
        TweetFeedConfigMenu,
        TweetFeedConfigInputModal,
        TweetFeedConfigStartModal,
    },
})
export default class TweetFeedConfig extends Vue {
    public online: boolean = false;
    public active: boolean = false;
    public simpleTweets: SimpleTweet[] = [];
    public max: number = 10;
    public delay: number = 10000;
    private starting: boolean = false;
    private adding: boolean = false;

    private socket: any = io.connect(':3030');
    private app: Application = feathers();

    private tweetService: Service<SimpleTweet>;
    private controlService: Service<any>;
    private statusService: Service<any>;

    constructor() {
        super();
        this.app.configure(socketio(this.socket));
        this.tweetService = this.app.service('tweets');
        this.controlService = this.app.service('control');
        this.statusService = this.app.service('status');
    }

    public mounted() {
        this.tweetService
            .on('created', (tweet: SimpleTweet) => {
                this.simpleTweets.push(tweet);
            });

        this.tweetService
            .on('patched', (tweet: SimpleTweet) => {
                const index = this.simpleTweets.findIndex((t) => t._id === tweet._id);
                if (index >= 0) {
                    this.$set(this.simpleTweets[index], 'blocked', tweet.blocked);
                    this.$set(this.simpleTweets[index], 'selected', tweet.selected);
                    this.$set(this.simpleTweets[index], 'starred', tweet.starred);
                }
            });

        this.statusService.on('created', () => {
            this.starting = false;
            this.active = true;
        });

        this.statusService.on('removed', () => {
            this.active = false;
        });

        this.tweetService
            .find({
                query: {
                    $sort: {
                        starred: -1,
                        date: -1,
                    },
                },
            })
            .then((tweets) => {
                this.simpleTweets = tweets as SimpleTweet[];
            });

        this.socket.on('connect', () => {
            this.online = true;
        });

        this.socket.on('disconnect', () => {
            this.online = false;
        });
    }

    get blockedTweets(): SimpleTweet[] {
        return this.simpleTweets
            .filter((tweet) => tweet.blocked);
    }

    get activeTweets(): SimpleTweet[] {
        return this.simpleTweets
            .filter((tweet) => !tweet.blocked)
            .sort((a, b) => {
                if (a.starred && !b.starred) {
                    return -1;
                }
                if (!a.starred && b.starred) {
                    return 1;
                }
                return a.date > b.date ? -1 : 1;
            })
            .slice(0, this.max);
    }

    get selectedTweet(): SimpleTweet {
        return this.simpleTweets.filter((tweet) => tweet.selected)[0];
    }

    get selectedIndex(): number {
        let selectedIndex = this.activeTweets.indexOf(this.selectedTweet);
        if (selectedIndex < 0) {
            selectedIndex = 0;
        }
        return selectedIndex;
    }

    get nextTweets(): SimpleTweet[] {
        return this.activeTweets
            .slice(0, this.selectedIndex)
            .reverse();
    }

    get prevTweets(): SimpleTweet[] {
        return this.activeTweets
            .slice(this.selectedIndex + 1);
    }

    get modalClass(): string {
        return this.starting ? 'show' : '';
    }

    get inputClass(): string {
        return this.adding ? 'show' : '';
    }

    public updateMax(value: number) {
        this.max = value;
    }

    public updateDelay(value: number) {
        this.delay = value;
    }

    public openAddModal() {
        this.adding = true;
    }

    public closeAddModal() {
        this.adding = false;
    }

    public add(text: string) {
        this.closeAddModal();
        this.tweetService.create({text});
    }

    public openStartModal() {
        this.starting = true;
        this.active = false;
    }

    public closeStartModal() {
        this.starting = false;
    }

    public start( {max, delay}: {max: number, delay: number}) {
        this.closeStartModal();
        this.max = max;
        this.delay = delay;

        this.statusService
            .create({}, {query: {
                max: this.max,
                delay: this.delay,
            }});
    }

    public stop() {
        this.statusService
            .remove(null);
    }

    public prevTweet() {
        this.controlService
            .remove(null, {query: {max: this.max}})
            .then((tweet: SimpleTweet) => this.select(tweet));
    }

    public nextTweet() {
        this.controlService
            .create({}, {query: {max: this.max}})
            .then((tweet: SimpleTweet) => this.select(tweet));
    }

    public pinTweet(tweet: SimpleTweet) {
        this.stop();
        this.select(tweet);
    }

    public select(tweet: SimpleTweet) {
        this.tweetService
            .patch(tweet._id, {
                selected: !tweet.selected,
            });
    }

    public blockTweet(tweet: SimpleTweet) {
        this.tweetService
            .patch(tweet._id, {
                blocked: !tweet.blocked,
            });
    }

    public starTweet(tweet: SimpleTweet) {
        this.tweetService
            .patch(tweet._id, {
                starred: !tweet.starred,
            });
    }
}
