<template>
    <div :class="hasImageClass"
         v-if="tweet"
         class="tweet-slideshow-item position-absolute w-100 p-5">
        <div class="card h-100 rounded-5 p-4">
            <div class="card-body">
                <img :src="tweet.avatar"
                     alt="Avatar"
                     class="rounded-circle float-left mr-3">
                <h5 class="card-title">@{{tweet.username}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{tweet.date | formatDate}}</h6>
                <p :class="textClass" class="card-text">{{tweet.text}}</p>
            </div>
            <div class="h-100 tweet-media"
                 :style="imageStyle"></div>
        </div>
    </div>
</template>

<script lang="ts" src="./TweetFeedSlideShowItem.ts">
</script>

<style lang="scss" src="./TweetFeedSlideShowItem.scss">
</style>
