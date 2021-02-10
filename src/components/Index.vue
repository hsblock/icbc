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
import {server, version} from "../../config";
import {versionCompare} from "@/utils/develop";

export default {
  name: "Index",
  components: {Settings},
  data() {
    return {
      title: "副场景",
      time: '--/--/--',
      ws: null
    }
  },
  watch: {
    $route(to, from) {
      this.handleRouteChange();
    },
    title(newVal) {
      document.title = `工行-${newVal}`;
    }
  },
  created() {
    this.handleRouteChange();
  },
  mounted() {
    window.setInterval(this.handleTime, 1000);
    this.openWarning();
    this.axios.get('https://api.github.com/repos/hsblock/icbc/releases/latest')
        .then(res => {
          const data = res.data;
          const newVersion = data.name;
          if (versionCompare(newVersion, version) === 1) {
            this.$notify({
              title: '版本过旧',
              message: '请前往<a href="https://github.com/hsblock/icbc/releases" target="_blank">releases</a>下载最新版本使用！'
            })
          }
        })
        .catch(e => {
          console.error(e.message);
        })
  },
  destroyed() {
    window.clearInterval(this.handleTime);
    this.ws && this.ws.close(1000, 'warning destroy');
  },
  methods: {
    handleRouteChange() {
      const path = this.$route.path.toLocaleLowerCase();
      if (path.includes('sub'.toLocaleLowerCase())) {
        this.title = "副场景";
      } else {
        this.title = "主场景";
      }
    },
    handleTime() {
      this.time = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    },
    openWarning() {
      this.ws = new WebSocket(server().ws.warning);
      this.ws.onopen = () => console.log("warning open");
      this.ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.$notify(data['message'])
      };
      this.ws.onerror = (e) => {
        console.log(e);
      };
      this.ws.onclose = () => console.log("warning close");
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