<template>
<main id="tweet-feed" class="bg-light">
  <tweet-feed-config-menu
    :active="active"
    @add="openAddModal"
    @start="openStartModal"
    @stop="stop"
    @prevTweet="prevTweet"
    @nextTweet="nextTweet"/>
  <div class="container-fluid mt-2">
    <transition name="slide">
      <div class="alert alert-danger" v-if="!online" role="alert">
        Couldn't connect to the server!
      </div>
    </transition>
    
    <div class="row">
      <div class="col" style="min-height: 300px">
        <h5>Current</h5>
        <transition name="morph" xmode="out-in">
          <tweet-feed-config-item
            v-if="selectedTweet"
            :tweet="selectedTweet"
            :key="selectedTweet._id"
            class="mb-3 d-inline-block"></tweet-feed-config-item>
        </transition>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-7">
        <h5>Next</h5>
        <tweet-feed-config-item
          v-for="tweet in nextTweets"
          :key="tweet._id"
          :tweet="tweet"
          :block="true"
          @block="blockTweet(tweet)"
          :pin="true"
          @pin="pinTweet(tweet)"
          @star="starTweet(tweet)"
          class="mb-3"></tweet-feed-config-item>
      </div>
      
      <div class="col-md-5">
        <h5>Previous</h5>
        <tweet-feed-config-item
          v-for="tweet in prevTweets"
          :key="tweet._id"
          :tweet="tweet"
          :block="true"
          @block="blockTweet(tweet)"
          :pin="true"
          @pin="pinTweet(tweet)"
          @star="starTweet(tweet)"
          class="mb-3"></tweet-feed-config-item>
      </div>
    </div>
    
        <h5>Blocked</h5>
    <div class="row">
      <div class="col-md-4" v-for="tweet in blockedTweets">
        <tweet-feed-config-item
          
          :key="tweet._id"
          :tweet="tweet"
          :block="true"
          @block="blockTweet(tweet)"
          class="mb-3"></tweet-feed-config-item>
      </div>
    </div>
  </div>
</div>

<tweet-feed-config-start-modal v-if="starting"
                               @ok="start"
                               @close="closeStartModal">
</tweet-feed-config-start-modal>

<tweet-feed-config-input-modal v-if="adding"
                               @ok="add"
                               @close="closeAddModal">
</tweet-feed-config-input-modal>

</main>
</template>

<script lang="typescript" src="./TweetFeedConfig.ts">
</script>

<style lang="scss" src="./TweetFeedConfig.scss">
</style>
