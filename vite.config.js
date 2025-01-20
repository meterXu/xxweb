import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from "vite-plugin-compression";
import vueJsx from "@vitejs/plugin-vue-jsx"
const project = require("./src/project")
import copyPlugin from 'vite-copy-plugin'
const path = require('path')
const fs = require("fs")
export default defineConfig(({command,mode})=>{
    fs.writeFileSync("./project.js","window.project="+JSON.stringify(project(mode),null,2),{"flag":"w"})
    return {
        plugins: [vue(),
            viteCompression(),
            vueJsx(),
            copyPlugin([
                {from:'project.js',to:''}
            ])],
        server:{
            host:'0.0.0.0'
        },
        resolve: {
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        }
    }
})
