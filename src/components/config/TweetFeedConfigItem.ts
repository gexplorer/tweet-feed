import { Component, Prop, Vue } from 'vue-property-decorator';
import { SimpleTweet } from '../../SimpleTweet';

@Component
export default class TweetFeedConfigItem extends Vue {
    @Prop() public tweet!: SimpleTweet;
    @Prop({ default: false }) public block!: boolean;
    @Prop({ default: false }) public pin!: boolean;

    get starredIcon() {
        return {
            prefix: this.tweet.starred ? 'fas' : 'far',
            iconName: 'star',
        };
    }

    get hasImage() {
        return this.tweet.photo;
    }

    get imageStyle() {
        return {
            backgroundImage: `url('${this.tweet.photo}')`,
        };
    }

    public starTweet() {
        this.$emit('star', {
            tweet: this.tweet,
        });
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
