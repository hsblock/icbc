<template>
  <div class="index-container">
    <nav class="nav-bar">
      <h1 class="title">
        中国工商银行监控平台
      </h1>
      <div class="router">
        <RouterLink to="/" class="link">
          主界面
        </RouterLink>
        <RouterLink to="/sub" class="link">
          副界面
        </RouterLink>
      </div>
      <div class="time">
        {{ time }}
      </div>
    </nav>
    <settings />
    <router-view />
  </div>
</template>

<script>
import Settings from "@/components/common/Settings";

export default {
  name: "Index",
  components: {Settings},
  data() {
    return {
      title: "副场景",
      link: '/sub',
      time: '--/--/--',
    }
  },
  watch: {
    $route(to, from) {
      this.handleRouteChange();
    }
  },
  created() {
    this.handleRouteChange();
  },
  mounted() {
    window.setInterval(this.handleTime, 1000);
  },
  destroyed() {
    window.clearInterval(this.handleTime)
  },
  methods: {
    handleRouteChange() {
      const path = this.$route.path.toLocaleLowerCase();
      if (path.includes('sub'.toLocaleLowerCase())) {
        this.title = "主场景";
        this.link = "/";
      } else {
        this.title = "副场景";
        this.link = "/sub"
      }
    },
    handleTime() {
      this.time = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    }
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  color: #ffffff;
  border-bottom: 1px solid greenyellow;
  overflow: hidden;
  box-sizing: border-box;
  height: 48px;
}

.nav-bar .title {
  padding: 0.4rem 1rem;
  margin: 0;
}

.nav-bar .router a {
  padding: 0.25rem 1rem 1rem 1rem;
  font-size: 18px;
  text-decoration: none;
}

.nav-bar .time {
  padding: 0.4rem 1rem;
}

.index-container {
  background: #152242;
}

.link {
  color: #4285F4;
}

.router-link-exact-active {
  background: lightgreen;
}
</style>