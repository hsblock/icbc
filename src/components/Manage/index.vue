<template>
  <div class="manage-container">
    <div class="select">
      <router-link to="/manage/area">
        <el-button>区域划分</el-button>
      </router-link>
      <router-link to="/manage/person">
        <el-button>人员选择</el-button>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import AreaSelect from "@/components/Manage/AreaSelect";
import PersonSelect from "@/components/Manage/PersonSelect";
export default {
  name: "Manage",
  components: {PersonSelect, AreaSelect},
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
        font-size: 20px;
      }
    }
  }

  .manager-wrapper {
  }
}
</style>