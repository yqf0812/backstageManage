
<template>
  <div class="emenu">
    <template v-for="(item) in menuList">
      <el-menu-item v-if="!item.childList"
                    :index="`${item.route}`"
                    :key="item.id">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu v-if="item.childList && item.childList.length > 0"
                  :key="item.id"
                  :index="`${item.id}`">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <e-menu :menuList="item.childList"></e-menu>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'EMenu',
  props: {
    menuList: {
      type: Array,
      default: function () { return [] }
    }
  },
  created () {  
  }
 
}
</script>

<style>

</style>