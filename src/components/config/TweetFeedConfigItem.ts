import { Component, Prop, Vue } from 'vue-property-decorator';
import { SimpleTweet } from '../../SimpleTweet';

@Component
export default class TweetFeedConfigItem extends Vue {
    @Prop() public tweet!: SimpleTweet;
    @Prop({ default: false }) public selected!: boolean;
    @Prop({ default: false }) public blocked!: boolean;
    @Prop({ default: false }) public block!: boolean;
    @Prop({ default: false }) public pin!: boolean;

    constructor() {
        super();
    }

    get hasImage() {
        return this.tweet.photo;
    }

    get imageStyle() {
        return {
            backgroundImage: `url('${this.tweet.photo}')`,
        };
    }

    public blockTweet() {
        this.$emit('block', {
            tweet: this.tweet,
        });
    }

    public pinTweet() {
        this.$emit('pin', {
            tweet: this.tweet,
        });
    }
}
