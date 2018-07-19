import { Component, Prop, Vue } from 'vue-property-decorator';
import { SimpleTweet } from '../../SimpleTweet';

@Component
export default class TweetFeedSlideShowItem extends Vue {
    @Prop() public tweet!: SimpleTweet;

    get hasImage() {
        return this.tweet.photo;
    }

    get hasImageClass() {
        return {
            'h-100': this.hasImage,
        };
    }

    get imageStyle() {
        return {
            backgroundImage: `url('${this.tweet.photo}')`,
        };
    }

    get textClass() {
        let fontSize;
        if (this.tweet.text.length < 50) {
            fontSize = 1;
        } else if (this.tweet.text.length < 100) {
            fontSize = 2;
        } else if (this.tweet.text.length < 125) {
            fontSize = 3;
        } else {
            fontSize = 4;
        }
        return this.hasImage ? '' : `display-${fontSize}`;
    }
}
