<template>
    <nav class="navbar navbar-dark bg-primary d-flex">
        <span class="navbar-brand mb-0 h1"><font-awesome-icon icon="hashtag"/>TweetFeed</span>
        <form class="form-inline">
            <div class="input-group mr-2">
                <div class="input-group-prepend">
                    <span class="input-group-text"><font-awesome-icon icon="list-ol"/></span>
                </div>
                <input type="number"
                       min="1"
                       class="form-control form-control-sm"
                       :value="max"
                       @blur="updateMax"
                       :disabled="active"
                       placeholder="Max">
            </div>

            <div class="input-group mr-2">
                <div class="input-group-prepend">
                    <span class="input-group-text"><font-awesome-icon icon="clock"/></span>
                </div>
                <input type="number"
                       min="1000"
                       step="1000"
                       class="form-control form-control-sm"
                       :value="delay"
                       @blur="updateDelay"
                       :disabled="active"
                       placeholder="Delay">
            </div>

            <div class="btn-group btn-group-sm" role="group">
                <button
                        class="btn"
                        type="button"
                        @click="prevTweet">
                    <font-awesome-icon icon="backward"/>
                </button>
                <button
                        v-if="!active"
                        class="btn btn-success"
                        type="button"
                        @click="start">
                    <font-awesome-icon icon="play"/>
                </button>
                <button
                        v-else
                        class="btn btn-danger"
                        type="button"
                        @click="stop">
                    <font-awesome-icon icon="stop"/>
                </button>
                <button
                        class="btn"
                        type="button"
                        @click="nextTweet">
                  <font-awesome-icon icon="forward"/>
                </button>
            </div>
        </form>
    </nav>
</template>

<script lang="ts" src="./TweetFeedConfigMenu.ts">
</script>

<style>
</style>
