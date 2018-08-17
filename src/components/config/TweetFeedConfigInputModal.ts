import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class TweetFeedConfigInputModal extends Vue {
    public text: string = '';

    get disabled() {
        return this.text.trim() === '';
    }

    public ok() {
        this.$emit('ok', this.text);
    }

    public close() {
        this.$emit('close');
    }
}
