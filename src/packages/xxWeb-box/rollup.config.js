import pkg from './package.json';
import cjs from 'rollup-plugin-commonjs';
import url from 'rollup-plugin-url'
import { terser } from 'rollup-plugin-terser'
import vue from "rollup-plugin-vue";
import cssnano from 'cssnano';
import postcss from 'rollup-plugin-postcss'
import postcssUrl from 'postcss-url'
import px2rem from 'postcss-pxtorem'
import less from 'rollup-plugin-less';

function processLess(context, payload) {
    return new Promise(( resolve, reject ) => {
        less.render({
            file: context
        }, function(err, result) {
            if( !err ) {
                resolve(result);
            } else {
                reject(err);
            }
        });

        less.render(context, {})
            .then(function(output) {
                    if( output && output.css ) {
                        resolve(output.css);
                    } else {
                        reject({})
                    }
                },
                function(err) {
                    reject(err)
                });

    })
}

function pgl() {
    return [
        cjs(),
        vue({
            target: 'browser',
            css: true,
            compileTemplate: true
        }),
        url({
            include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif', '**/*.woff', '**/*.woff2'],
            limit: Infinity,
            publicPath: '/icons',
        }),
        postcss({
            process: processLess,
            plugins: [
                cssnano(),
                postcssUrl({
                    url: "inline",
                    maxSize: 100,
                    fallback: "copy"
                }),
                px2rem({
                    rootValue: 16,
                    minPixelValue: 2,
                    propList: ['*']
                })
            ],
            extensions: [ '.css' ],
        }),
        terser()
    ];
}

export default [
    {
        input: './index.js',
        output: {
            name: 'xxWeb-box',
            file: `dist/xxWeb-box.umd.js`,
            format: 'umd'
        },
        plugins: pgl()
    },
    {
        input: './index.js',
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: "dist/index.esm.js", format: 'es' }
        ],
        plugins: pgl()
    }
];
