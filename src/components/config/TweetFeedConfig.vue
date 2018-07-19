<template>
    <main id="tweet-feed" class="bg-light">
        <tweet-feed-config-menu
                :active="active"
                :max="max"
                @updateMax="updateMax"
                @updateDelay="updateDelay"
                :delay="delay"
                @start="start"
                @stop="stop"
                @prevTweet="prevTweet"
                @nextTweet="nextTweet"/>
        <br>
        <div class="container-fluid">
            <transition name="slide">
                <div class="alert alert-danger" v-if="!online" role="alert">
                    Couldn't connect to the server!
                </div>
            </transition>
            <div class="row">
                <div class="col">
                    <h3>Current</h3>
                    <tweet-feed-config-item
                            v-if="selectedTweet"
                            :tweet="selectedTweet"
                            :key="selectedTweet.id"
                            :block="true"
                            @block="blockUser(selectedTweet.username)"
                            class="mb-3 d-inline-block"></tweet-feed-config-item>
                </div>
            </div>
            <div class="row">
                <div class="col-md-7">
                    <h4>Next</h4>
                    <transition-group name="slide">
                        <tweet-feed-config-item
                                v-for="tweet in nextTweets"
                                :key="tweet.id"
                                :tweet="tweet"
                                :block="true"
                                @block="blockUser(tweet.username)"
                                :pin="true"
                                @pin="pinTweet(tweet)"
                                class="mb-3"></tweet-feed-config-item>
                    </transition-group>
                </div>
                <div class="col-md-5">
                    <h4>Previous</h4>
                    <transition-group name="slide">
                        <tweet-feed-config-item
                                v-for="tweet in prevTweets"
                                :key="tweet.id"
                                :tweet="tweet"
                                :block="true"
                                @block="blockUser(tweet.username)"
                                :pin="true"
                                @pin="pinTweet(tweet)"
                                class="mb-3"></tweet-feed-config-item>
                    </transition-group>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <h4>Blocked</h4>
                    <transition-group name="slide">
                        <tweet-feed-config-item
                                v-for="tweet in blockedTweets"
                                :key="tweet.id"
                                :tweet="tweet"
                                :block="true"
                                @block="blockUser(tweet.username)"
                                class="mb-3"></tweet-feed-config-item>
                    </transition-group>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="typescript" src="./TweetFeedConfig.ts">
</script>

<style lang="scss" src="./TweetFeedConfig.scss">
</style>
