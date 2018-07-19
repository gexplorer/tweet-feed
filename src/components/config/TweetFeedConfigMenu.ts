import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TweetFeedConfigMenu extends Vue {
    @Prop() public active!: boolean;
    @Prop() public max!: number;
    @Prop() public delay!: number;

    public updateDelay($event: any) {
        this.$emit('updateDelay', $event.target.value);
    }

    public updateMax($event: any) {
        this.$emit('updateMax', $event.target.value);
    }

    public start() {
        this.$emit('start', {
            max: this.max,
            delay: this.delay,
        });
    }

    public stop() {
        this.$emit('stop');
    }

    public prevTweet() {
        this.$emit('prevTweet');
    }

    public nextTweet() {
        this.$emit('nextTweet');
    }
}
