<template>
  <div class="menu-search-box" :style="{ width: expandSearch ? '180px' : '18px' }">
    <i class="el-icon-search" @click="handleShowSearch"></i>
    <Autocomplete class="menu-search" size="small" placeholder="请输入菜单" v-model:value="text" :fetch-suggestions="querySearch" @select="handleSelect" clearable>
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
import { $on, $off, $once, $emit } from '../../../utils/gogocodeTransfer'
import mixin from '../../../mixin/mixin'
import { ElAutocomplete as Autocomplete } from 'element-plus'
import DynamicIcon from '../../common/DynamicIcon'
import { isExternal } from '../../../utils'
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
      $emit(this.$bus, 'searchMenuItemSelect', item.path)
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
  },
  emits: ['searchMenuItemSelect']
}
</script>
