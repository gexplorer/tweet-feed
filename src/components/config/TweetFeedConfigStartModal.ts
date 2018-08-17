import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class TweetFeedConfigStartModal extends Vue {
    @Prop({ default: 10 }) public max!: number;
    @Prop({ default: 10000 }) public delay!: number;

    public maxValue: number;
    public delayValue: number;

    constructor() {
        super();
        this.maxValue = this.max;
        this.delayValue = this.delay / 1000;
    }

    get disabled() {
        return this.maxValue < 5 || this.delayValue < 1;
    }

    public ok() {
        this.$emit('ok', {
            max: this.maxValue,
            delay: this.delayValue * 1000,
        });
    }

    public close() {
        this.$emit('close');
    }
}
