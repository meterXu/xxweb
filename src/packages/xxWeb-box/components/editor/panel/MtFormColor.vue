<template>
  <div class="mt-lj-color">
    <el-row>
      <el-col :span="fItem.hasInput ? (fItem.colorSpan || 4) : 24" class='text-col-twice'>
        <el-color-picker color-format="hex" v-model="color" size="mini" :predefine="formatPredefine"
          @active-change='activeChange' @change='changeColor'></el-color-picker>
      </el-col>
      <el-col :span='fItem.inputSpan || 12' v-if='fItem.hasInput && !fItem.hideColor' class='text-col-twice'>
        <el-input v-model='color' size='mini'></el-input>
      </el-col>
      <el-col :span='fItem.opcSpan || 8' v-if='fItem.hasInput && !fItem.hideOpacity' class='prepend-percent'>
        <el-input v-model='opacity' size='mini' @input='changeColor'>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['fItem', 'modelPro', 'predefine'],
  data() {
    return {
      // 颜色的HEX
      color: '',
      // 颜色的opacity
      opacity: '',
      formatPredefine: []
    }
  },
  watch: {
    // 解决同类型控件切换，value视图不更新的问题
    'modelPro.obj': {
      handler(val) {
        let changeColor = 'transparent';
        if (val[this.modelPro.key] && val[this.modelPro.key].length === 9) {
          changeColor = val[this.modelPro.key].slice(0, -2)
        }
        if (changeColor && (changeColor !== this.color)) {
          this.updateColor()
        }
      },
      immediate: true,
      deep:true
    }
  },
  methods: {
    activeChange(val) {
      const color = this.colorToHex(val).slice(0, -2)
      this.color = color.toUpperCase()
      this.changeColor()
    },
    updateColor() {
      const color = this.colorToHex(this.modelPro.obj[this.modelPro.key])
      this.color = color ? color.slice(0, -2) : null
      this.opacity = color ? parseInt(parseInt(color.slice(-2), 16) / 255 * 100) : 100
      if (this.predefine.length) {
        this.formatPredefine = []
        this.predefine.map(val => {
          this.formatPredefine.push(this.colorToHex(val.replaceAll(' ', '')))
        })
      }
    },
    changeColor(val) {
      if (val && val > 100) {
        this.opacity = 100
      }
      let color = this.color + this.to16(this.opacity)
      if (!this.color) {
        color = 'transparent'
      }
      this.$emit('change', color)
    },
    // 十进制转16进制
    to16(val) {
      if (val) {
        if (val === '0') {
          return '00'
        }
        if (val > 100) {
          val = 100
        }
        const newVal = Math.round((val / 100 * 255)).toString(16)
        return newVal.length === 1 ? '0' + newVal : newVal
      } else {
        return 'FF'
      }
    },
    colorToHex(color) {
      // 判断数据格式的正确性
      if (typeof color !== 'string') {
        return null;
      }
      if (color === 'transparent' || color === '') {
        return null
      }

      // 判断颜色类型
      if (color.startsWith('rgba(')) {
        let rgba = color.slice(5, -1).split(',');
        let r = parseInt(rgba[0]);
        let g = parseInt(rgba[1]);
        let b = parseInt(rgba[2]);
        let a = Math.round(parseFloat(rgba[3]) * 255);
        // 转换为带有透明度的hex格式
        return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') + a.toString(16).padStart(2, '0');
      } else if (color.startsWith('rgb(')) {
        let rgb = color.slice(4, -1).split(',');
        let r = parseInt(rgb[0]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2]);
        // 转换为hex格式
        return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') + 'ff';
      } else if (color.startsWith('hsl(')) {
        let hsl = color.slice(4, -1).split(',');
        let h = parseInt(hsl[0]);
        let s = parseInt(hsl[1].slice(0, -1));
        let l = parseInt(hsl[2].slice(0, -1));
        // 转换为hex格式
        return '#' + this.hslToRgb(h, s, l).toString(16).padStart(6, '0') + 'ff';
      } else if (color.startsWith('hsla(')) {
        let hsla = color.slice(5, -1).split(',');
        let h = parseInt(hsla[0]);
        let s = parseInt(hsla[1].slice(0, -1));
        let l = parseInt(hsla[2].slice(0, -1));
        let a = Math.round(parseFloat(hsla[3]) * 255);
        // 转换为带有透明度的hex格式
        return '#' + this.hslToRgb(h, s, l).toString(16).padStart(6, '0') + a.toString(16).padStart(2, '0');
      } else if (color.startsWith('hsv(')) {
        let hsv = color.slice(4, -1).split(',');
        let h = parseInt(hsv[0]);
        let s = parseInt(hsv[1].slice(0, -1));
        let v = parseInt(hsv[2].slice(0, -1));
        // 转换为hex格式
        return '#' + this.hsvToRgb(h, s, v).toString(16).padStart(6, '0') + 'ff';
      } else if (color.startsWith('#')) {
        let hex = color.slice(1);
        // 转换为hex格式
        if (hex.length === 8) {
          return `#${hex}`
        }
        return hex.length === 3 ? '#' + hex.repeat(2) + 'ff' : '#' + hex + 'ff';
      } else {
        return null;
      }
    },
    hslToRgb(h, s, l) {
      let r, g, b;

      if (s === 0) {
        r = g = b = l; // achromatic 非彩色
      } else {
        let hue2rgb = function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h / 360 + 1 / 3);
        g = hue2rgb(p, q, h / 360);
        b = hue2rgb(p, q, h / 360 - 1 / 3);
      }

      return (r << 16) | (g << 8) | b;
    },
    hsvToRgb(h, s, v) {
      let r, g, b;

      let i = Math.floor(h / 60) % 6;
      let f = h / 60 - i;
      let p = v * (1 - s);
      let q = v * (1 - f * s);
      let t = v * (1 - (1 - f) * s);

      switch (i) {
        case 0:
          r = v, g = t, b = p;
          break;
        case 1:
          r = q, g = v, b = p;
          break;
        case 2:
          r = p, g = v, b = t;
          break;
        case 3:
          r = p, g = q, b = v;
          break;
        case 4:
          r = t, g = p, b = v;
          break;
        case 5:
          r = v, g = p, b = q;
          break;
      }

      return (r << 16) | (g << 8) | b;
    },
    // 随机生成color
    randomColor() {
      let random = Math.random()
      if (random === 0) {
        return this.randomColor()
      }
      return '#' + random.toString(16).substring(2, 8)
    }
  },
  mounted() {
    this.updateColor()
  }
}
</script>
<style lang="less" scoped>
/deep/.el-input-group__append {
  padding: 4px;
  background: #fff;
  border-left: none;
}

.prepend-percent {
  /deep/.el-input__inner {
    padding: 0 2px;
    padding-left: 2px !important;
    padding-right: 20px !important;
    text-align: center;
    position: relative;
  }

  /deep/.el-input::after {
    position: absolute;
    right: 4px;
    top: 0;
    content: '%';
    color: #666666;
    opacity: 0.5;
    line-height: 26px;
  }
}
.mt-lj-color{
  .text-col-twice+.prepend-percent{
    padding-left: 10px
  }
  .text-col-twice {
    line-height: 28px;
    height: 28px;
    height: 28px;
  }
}
</style>