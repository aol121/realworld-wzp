<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">拉钩教育-1</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'your_feed' }" :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed',
                  },
                }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }">Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tag: tag,
                      tab: 'tag',
                    },
                  }">#{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
                <img :src="article.author.image"/>
              </nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }" >{{article.author.username}}</nuxt-link>
                <span class="date">{{article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button :class="{ active: article.favorited }"
                      :disabled="article.favoriteDisabled"
                      class="btn btn-outline-primary btn-sm pull-xs-right"
                      @click="onFavorite(article)">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
              params: {
                slug: article.slug,
              }
            }" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <nav>
            <ul class="pagination">
              <li :class="{ active: page === item }"
                  class="page-item"
                  v-for="item in totalPage"
                  :key="item">
                <nuxt-link class="page-link" :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: tab,
                  },
                }">{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag',
                  },
                }" class="tag-pill tag-default">{{item}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '@/api/articles';
import { getTags } from '@/api/tags';
import { mapState } from 'vuex';

export default {
  name: 'HomeIndex',
  computed: {
    totalPage () {
      return  Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState(['user']),
  },
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ query,  store }) {
    const page = +query.page || 1;
    const limit = 20;
    const { tag } = query;
    const tab = query.tab || 'global_feed';
    const loadArticles = store.state.user && tab === 'your_feed'
      ? getFeedArticles
      : getArticles
    const [{ data }, { data: tagData }] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ])
    const { articles, articlesCount } = data;
    articles.forEach(article => article.favoriteDisabled = false)
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags: tagData.tags.slice(0, 20),
      tag,
      tab,
    }
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    }
  }
};
</script>

<style></style>
