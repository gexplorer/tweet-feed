<template>
    <div id="tweet-slideshow"
         class="bg-primary tweet-slideshow fixed-top h-100">
        <transition name="fade" v-if="currentTweet">
            <tweet-feed-slide-show-item :tweet="currentTweet"
                                        :key="currentTweet.id"></tweet-feed-slide-show-item>
        </transition>
    </div>
</template>

<script lang="ts" src="./TweetFeedSlideShow.ts">
</script>

<style lang="scss" src="./TweetFeedSlideShow.scss">
</style>
