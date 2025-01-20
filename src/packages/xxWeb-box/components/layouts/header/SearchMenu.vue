<template>
  <div class="menu-search-box" :style="{ width: expandSearch ? '180px' : '18px' }">
    <el-icon class="menu-search-icon"><Search @click="handleShowSearch" /></el-icon>
    <Autocomplete class="menu-search" size="small" placeholder="请输入菜单" v-model="text" :fetch-suggestions="querySearch" @select="handleSelect" :clearable="true">
      <template v-slot="{ item }">
        <div>
          <DynamicIcon :meta="item" />
          {{ item.title }}
        </div>
      </template>
    </Autocomplete>
  </div>
</template>

<script>
import mixin from '../../../mixin/mixin.js'
import { ElAutocomplete as Autocomplete } from 'element-plus'
import DynamicIcon from '../../common/DynamicIcon.vue'
import { isExternal } from '../../../utils/util.js'
export default {
  components: {
    Autocomplete,
    DynamicIcon
  },
  name: 'SearchMenu',
  mixins: [mixin],
  data() {
    return {
      text: null,
      expandSearch: false
    }
  },
  methods: {
    handleShowSearch() {
      this.expandSearch = !this.expandSearch
    },
    querySearch(queryString, cb) {
      let results = []
      this.treeDataFilter(this.app.permission, queryString, results)
      cb(results)
    },
    handleSelect(item) {
      this.text = item.title
      if (isExternal(item.path)) {
        window.open(item.path, '_blank')
      } else if (this.$route.path !== item.path) {
        this.$router.push({ path: item.path })
      }
      this.$bus.$emit('searchMenuItemSelect', item.path)
    },
    treeDataFilter(data, queryString, results) {
      data.forEach(p => {
        if (p.hasOwnProperty('children')) {
          this.treeDataFilter(p.children, queryString, results)
        } else if (p.hasOwnProperty('meta') && p.meta.title.includes(queryString)) {
          results.push({ path: p.path, title: p.meta.title, icon: p.meta.icon })
        }
      })
    }
  }
}
</script>
