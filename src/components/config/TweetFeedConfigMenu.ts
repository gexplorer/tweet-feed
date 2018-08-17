import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TweetFeedConfigMenu extends Vue {
    @Prop() public active!: boolean;

    public add() {
        this.$emit('add');
    }

    public start() {
        this.$emit('start');
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
