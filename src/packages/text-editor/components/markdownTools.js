import {regExpList} from './regExpList.js'

/**
 * Insert matching strings such as ~, **, ', etc. into both sides of the selected text to change the style
 * For code, bold, italic, and hyphen styles
 * 将匹配字符串如：~、**、`等插入选中文本两边以达到改变样式的效果
 * 用于代码，粗体，斜体和中划线样式
 * @param {Object} cm codemirror实例
 * @param {String} matchStr 匹配字符串
 */
export function handleTextStyle (cm, matchStr) {
    /**
     * 已经选中文本
     * --- 获取选中的文本和前后光标位置
     * --- 判断文本前后是否有匹配字符串
     * --- 有匹配字符串
     * ------ 删除匹配字符串
     * --- 没有匹配字符串
     * ------ 插入匹配字符串
     * 没有选中文本
     * --- 获取光标位置
     * --- 判断光标前后是否有匹配字符串，处理如上
     */
    const changePos = matchStr.length
    let [preExist, aftExist] = [false, false]
    if (cm.somethingSelected()) {
        const selectInfo = cm.listSelections()[0]
        let { head, anchor } = judgePreOrAft(selectInfo)
        let { line: preLine, ch: prePos } = head
        let { line: aftLine, ch: aftPos } = anchor
        cm.getRange({ line: preLine, ch: prePos - changePos }, head) === matchStr && (preExist = true)
        cm.getRange(anchor, { line: aftLine, ch: aftPos + changePos }) === matchStr && (aftExist = true)
        let preStr = preExist ? '' : matchStr
        let aftStr = aftExist ? '' : matchStr
        prePos -= preExist ? changePos : 0
        aftPos += aftExist ? changePos : 0
        const selectStr = cm.getSelection()
        cm.replaceRange(`${preStr}${selectStr}${aftStr}`, { line: preLine, ch: prePos }, { line: aftLine, ch: aftPos })
    }
    cm.focus()
}

/**
 * Adding an Ordered List
 * 添加有序列表
 * @param {Object} cm codemirror实例
 */
export function handleOrderList (cm) {
    /**
     * 已经选中文本
     * --- 获取选中的文本和前后光标位置
     * --- 选中了多行文本
     * ------ 在每行前加上数字列表
     * --- 选中单行文本
     * ------ 检查文本前是否含有tab缩进
     * ------ 检查文本是否已‘数字.’开头
     * ------ 在开头加上数字列表
     * 没有选中文本
     * --- 获取光标位置
     * --- 检查文本前是否含有tab缩进
     * --- 检查文本是否已‘数字.’开头
     * --- 在开头加上数字列表
     */
    if (cm.somethingSelected()) {
        const selectInfo = cm.listSelections()[0]
        let { head, anchor } = judgePreOrAft(selectInfo)
        let preLine = head.line
        let aftLine = anchor.line
        if (preLine !== aftLine) {
            let preNumber = 0
            let pos = 0
            for (let i = preLine;i <= aftLine;i++) {
                cm.setCursor({ line: i, ch: 0 })
                const replaceStr = `${++preNumber}. `
                cm.replaceSelection(replaceStr)
                if (i === aftLine) {
                    pos += (replaceStr + cm.getLine(i)).length
                }
            }
            cm.setCursor({ line: aftLine, ch: pos })
        } else {
            const selectVal = cm.getSelection()
            let replaceStr = `1. ${selectVal}`
            cm.replaceSelection(replaceStr)
            cm.setCursor({ line: preLine + 1, ch: replaceStr.length })
        }
    } else {
        const cursor = cm.getCursor()
        const curLine = cursor.line
        cm.setCursor({line:curLine,ch:0})
        let replaceStr = `1. `
        cm.replaceSelection(replaceStr)
        cm.setCursor({ line: curLine, ch: cm.getLine(curLine).length})
    }
    cm.focus()
}

/**
 * Add references and unordered lists
 * 添加所有前置关键字
 * @param {Object} cm codemirror实例
 * @param {String} matchStr 匹配字符串
 */
export function handlePrefixList (cm, matchStr) {
    /**
     * 已经选中文本
     * --- 获取选中的文本和前后光标位置
     * --- 选中了多行文本
     * ------ 在每行前加上匹配字符
     * --- 选中单行文本
     * ------ 检测开头是否有匹配的字符串，有就将其删除，否则插入匹配字符
     * 没有选中文本
     * --- 获取光标位置
     * --- 检查文本前是否含有tab缩进
     * --- 检查文本是否已‘数字.’开头
     * --- 插入匹配字符
     */
    if (cm.somethingSelected()) {
        const selectInfo = cm.listSelections()[0]
        let { head, anchor } = judgePreOrAft(selectInfo)
        let preLine = head.line
        let aftLine = anchor.line
        if (preLine !== aftLine) {
            let pos = matchStr.length
            for (let i = preLine;i <= aftLine;i++) {
                cm.setCursor({ line: i, ch: 0 })
                cm.replaceSelection(matchStr)
                i === aftLine && (pos += cm.getLine(i).length)
            }
            cm.setCursor({ line: aftLine, ch: pos })
        } else {
            const preStr = cm.getRange({ line: preLine, ch: 0 }, head)
            if (preStr === matchStr) {
                cm.replaceRange('', { line: preLine, ch: 0 }, head)
            } else {
                const selectVal = cm.getSelection()
                let replaceStr = `${matchStr}${selectVal}`
                cm.replaceSelection(replaceStr)
                cm.setCursor({ line: preLine + 2, ch: (matchStr + selectVal).length })
            }
        }
    } else {
        const cursor = cm.getCursor()
        let { line: curLine, ch: curPos } = cursor
        cm.setCursor({ line: curLine, ch: 0 })
        cm.replaceSelection(matchStr)
        cm.setCursor({ line: curLine, ch: cm.getLine(curLine).length })
    }
    cm.focus()
}

/**
 * Add a horizontal or dividing line
 * 添加横线/分割线
 * @param {Object} cm codemirror实例
 */
export function handleLine (cm) {
    /**
     * 已经选中文本
     * --- 获取选中的文本和前后光标位置
     * --- 插入横线
     * 没有选中文本
     * --- 获取光标位置
     * --- 插入横线
     */
    if (cm.somethingSelected()) {
        const selectInfo = cm.listSelections()[0]
        let head = judgePreOrAft(selectInfo).head
        let { line: preLine, ch: prePos } = head
        let replaceStr = '\n---\n'
        cm.replaceSelection(replaceStr)
        cm.setCursor({ line: preLine, ch: prePos })
    } else {
        const cursor = cm.getCursor()
        let { line: curLine, ch: curPos } = cursor
        let replaceStr = '\n---\n'
        cm.replaceSelection(replaceStr)
        cm.setCursor({ line: curLine, ch: cm.getLine(curLine).length })
    }
    cm.focus()
}

/**
 * Insert image or normal link
 * 插入图片或普通链接
 * @param {Object} cm codemirror实例
 * @param {Boolean} isPicture 是否为图片链接
 */
export function handleLink (cm, isPicture = false) {
    /**
     * 已经选中文本
     * --- 获取选中的文本和前后光标位置
     * --- 选中多行文本
     * ------ 退出
     * --- 选中单行文本
     * ------ 链接是否满足格式要求
     * ------ 是否为图片链接
     * ------ 插入链接格式
     * 没有选中文本
     * --- 是否为图片链接
     * --- 插入链接格式
     */
    if (cm.somethingSelected()) {
        const selectInfo = cm.listSelections()[0]
        const selectVal = cm.getSelection()
        let { head, anchor } = judgePreOrAft(selectInfo)
        let { line: preLine, ch: prePos } = head
        let aftLine = anchor.line
        if (preLine !== aftLine) return void 0
        const isLinkStr = regExpList.httpUrl.test(selectVal)
        let replaceStr = isLinkStr ? `[](${selectVal})` : `[${selectVal}]()`
        prePos += isLinkStr ? 1 : selectVal.length + 3
        if (isPicture) {
            prePos += 1
            replaceStr = '!' + replaceStr
        }
        cm.replaceSelection(replaceStr)
        cm.setCursor({ line: preLine, ch: prePos })
    } else {
        const cursor = cm.getCursor()
        let { line: curLine, ch: curPos } = cursor
        let replaceStr = `[]()`
        curPos += 3
        isPicture && (replaceStr = '!' + replaceStr) && (curPos += 1)
        cm.replaceSelection(replaceStr)
        cm.setCursor({ line: curLine, ch: curPos })
    }
    cm.focus()
}

/**
 * Determine whether the cursor of the selected text is at the beginning or the end of the text
 * 判断选中文本的光标是在文本开头还是结尾
 * @param {Object} selectInfo
 * @returns {Object}
 */
export function judgePreOrAft (selectInfo) {
    let { head, anchor } = selectInfo
    ; (head.line > anchor.line || (head.line === anchor.line && head.ch > anchor.ch)) && ([head, anchor] = [anchor, head])
    return { head, anchor }
}

/**
 * Convert html to pdf
 * 将html转换成pdf
 * @param {HTMLDocument} iframe
 */
export function htmlToPDF (iframe) {
    const window = iframe.contentWindow
    window.focus()
    window.print()
}


export function handleInsertWord (cm, matchStr) {
    /**
     * 已经选中文本
     * --- 获取选中的文本和前后光标位置
     * --- 选中多行文本
     * ------ 退出
     * --- 选中单行文本
     * ------ 链接是否满足格式要求
     * ------ 是否为图片链接
     * ------ 插入链接格式
     * 没有选中文本
     * --- 是否为图片链接
     * --- 插入链接格式
     */
    if (cm.somethingSelected()) {

    } else {
        cm.replaceSelection(matchStr)
    }
    cm.focus()
}

