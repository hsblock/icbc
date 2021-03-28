<template>
  <div class="manage-container">
    <div class="select">
      <router-link to="/manage/area">
        <el-button>区域划分</el-button>
      </router-link>
      <router-link to="/manage/person">
        <el-button>人员选择</el-button>
      </router-link>
      <router-link to="/manage/setPath">
        <el-button>视频源配置</el-button>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Manage",
  data() {
    return {
      tab: 'areaSelect'
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-container {

  .select {
    position: absolute;
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;

    a {
      & + a {
        margin-top: 20px;
      }

      &.router-link-active .el-button {
        background-color: #409eff;
        border-color: #409eff;
        color: #ffffff;
      }

      .el-button {
        font-size: 18px;
        width: 140px;
      }
    }
  }

  .manager-wrapper {
  }
}
</style>