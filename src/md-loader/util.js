function stripScript(content) {
    const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
    return result && result[2] ? result[2].trim() : '';
}

function stripStyle(content) {
    const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
    return result && result[2] ? result[2].trim() : '';
}

function stripTemplate(content) {
    content = content.trim();
    if (!content) {
        return content;
    }
    return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

function pad(source) {
    return source
        .split(/\r?\n/)
        .map(line => `  ${line}`)
        .join('\n');
}

function getPascalByPackageName (name = '') {
    return name
        // 将非字母转为 --
        .replace(/[^a-zA-Z]/g, '--')
        // 将所有重复的 - 转为单个
        .replace(/-+/g, '-')
        // 将 -字母 转为 大写字母
        .replace(/-([a-zA-Z]{1})/g, (s, s1) => s1.toUpperCase())
        // 将首字母转为大写
        .replace(/^([a-zA-Z]{1})/, (s, s1) => s1.toUpperCase())
}

function safeStringToObj(script) {
    script = script.trim();
    if(script){
        script = script.replace(/export\s+default/, '')
    }else{
        script = '{}';
    }
    return eval('('+script+')');
}

export {
    stripScript,
    stripStyle,
    stripTemplate,
    safeStringToObj
};