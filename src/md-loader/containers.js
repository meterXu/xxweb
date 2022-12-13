import mdContainer from 'markdown-it-container'
import {stripTemplate} from './util'

export default options => {
    const {component = 'DemoBlock'} = options;
    const componentName = component;
    return md => {
        md.renderer.rules.table_open = function(tokens, idx) {
            return '<table class="el-table__header demo-table">';
        };
        md.use(mdContainer, 'demo', {
            validate(params) {
                return params.trim().match(/^demo\s*(.*)$/);
            },
            render(tokens, idx) {
                const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                if (tokens[idx].nesting === 1) {
                    const description = m && m.length > 1 ? m[1] : '';
                    const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
                    const template = stripTemplate(content)
                    return `<${componentName}>
            <template slot="demo">${template}</template>
            ${description ? `<div slot="description">${md.render(description).html}</div>` : ''}
            <template slot="source">`;
                }
                return `</template></${componentName}>`;
            }
        });
    };
}