<template>
  <div class="xxweb-editor-code">
    <div class="toolbar">
      <div class="btn-toolbar" role="toolbar" aria-label="Editor toolbar">
        <div class="btn-group" role="group">
          <a id="makeBold" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Bold">
            <i class="fa fa-bold fa-fw"></i>
          </a>
          <a id="makeItalic" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Italic">
            <i class="fa fa-italic fa-fw"></i>
          </a>
          <a id="makeStrike" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Strikethrough">
            <i class="fa fa-strikethrough fa-fw"></i>
          </a>
          <a id="makeHeader" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Heading">
            <i class="fa fa-h1 fa-fw">H</i>
          </a>
          <a id="makeCode" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Code">
            <i class="fa fa-code fa-fw"></i>
          </a>
          <a id="makeQuote" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Quote">
            <i class="fa fa-quote-right fa-fw"></i>
          </a>
          <a id="makeGenericList" class="btn btn-sm text-uppercase" data-toggle="dropdown"
             role="button" aria-haspopup="true" aria-expanded="false" title="List">
            <i class="fa fa-list fa-fw"></i>
          </a>
          <a id="makeOrderedList" class="btn btn-sm text-uppercase" data-toggle="dropdown"
             role="button" aria-haspopup="true" aria-expanded="false" title="Numbered List">
            <i class="fa fa-list-ol fa-fw"></i>
          </a>
          <a id="makeCheckList" class="btn btn-sm text-uppercase" data-toggle="dropdown"
             role="button" aria-haspopup="true" aria-expanded="false" title="Check List">
            <i class="fa fa-check-square fa-fw"></i>
          </a>
          <a id="makeLink" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Link"> <i class="fa fa-link fa-fw"></i>
          </a>
          <a id="makeImage" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="true" title="Image">
            <i class="fa fa-image fa-fw"></i>
          </a>
          <a id="makeTable" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Table"> <i class="fa fa-table fa-fw"></i> </a>
          <a id="makeLine" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Line">
            <i class="fa fa-minus fa-fw"></i>
          </a>
          <span class="separator">|</span>
          <a id="makeSquare" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Line">
            <i class="fa fa-square-o fa-fw"></i>
          </a>
          <a id="markMath" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="line">
            <i class="fa fa-superscript fa-fw"></i>
          </a>
        </div>
        <div class="btn-group table-tools hidden-xs">
          <span>Row</span>
          <a id="insertRow" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Insert Row">
            <i class="fa fa-plus-circle fa-fw"></i>
          </a>
          <a id="deleteRow" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Delete Row">
            <i class="fa fa-minus-circle fa-fw"></i>
          </a>
          <a id="moveRowUp" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Move Row Up">
            <i class="fa fa-long-arrow-up fa-fw"></i>
          </a>
          <a id="moveRowDown" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Move Row Down">
            <i class="fa fa-long-arrow-down fa-fw"></i> </a>
          <span>Column</span>
          <a id="insertColumn" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Insert Column">
            <i class="fa fa-plus-circle fa-fw"></i>
          </a>
          <a id="deleteColumn" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Delete Column">
            <i class="fa fa-minus-circle fa-fw"></i>
          </a>
          <a id="moveColumnLeft" class="btn btn-sm text-uppercase" data-toggle="dropdown"
             role="button" aria-haspopup="true" aria-expanded="false" title="Move Column Left">
            <i class="fa fa-long-arrow-left fa-fw"></i>
          </a>
          <a id="moveColumnRight" class="btn btn-sm text-uppercase" data-toggle="dropdown"
             role="button" aria-haspopup="true" aria-expanded="false" title="Move Column Right"> <i
              class="fa fa-long-arrow-right fa-fw"></i>
          </a>
          <span>Alignment</span>
          <a id="alignLeft" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Align Left">
            <i class="fa fa-align-left fa-fw"></i>
          </a>
          <a id="alignCenter" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Align Center">
            <i class="fa fa-align-center fa-fw"></i>
          </a>
          <a id="alignRight" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Align Right">
            <i class="fa fa-align-right fa-fw"></i>
          </a>
          <a id="alignNone" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="Align None">
            <i class="fa fa-ban fa-fw"></i>
          </a>
        </div>
        <div class="btn-group shortcut-tools">
          <a id="popover-symbols" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="常用符号">
            <i class="icon-latex icon-latex-symbols"></i>
          </a>
          <a id="popover-greek" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="希腊字母">
            <i class="icon-latex icon-latex-greek"></i>
          </a>
          <a id="popover-frac" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="希腊字母">
            <i class="icon-latex icon-latex-frac"></i>
          </a>
          <a id="popover-integral" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="希腊字母">
            <i class="icon-latex icon-latex-integral"></i>
          </a>
          <a id="popover-limit" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="希腊字母">
            <i class="icon-latex icon-latex-limit"></i>
          </a>
          <a id="popover-matrix" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="希腊字母">
            <i class="icon-latex icon-latex-matrix"></i>
          </a>
          <a id="popover-sqrt" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="希腊字母">
            <i class="icon-latex icon-latex-sqrt"></i>
          </a>
          <a id="popover-sum" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="希腊字母">
            <i class="icon-latex icon-latex-sum"></i>
          </a>
          <a id="popover-trig" class="btn btn-sm text-uppercase" data-toggle="dropdown" role="button"
             aria-haspopup="true" aria-expanded="false" title="希腊字母">
            <i class="icon-latex icon-latex-trig"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="codemirror-editor">
      <textarea ref="codemirror-editor-textarea" class="codemirror-editor-textarea"></textarea>
    </div>
  </div>
</template>
<script>
import {
  handleTextStyle,
  handleLink,
  handleOrderList,
  handleLine,
  handlePrefixList,
  handleInsertWord
} from './markdownTools.js'
import CodeMirror from 'codemirror'
import codemirror from "codemirror/lib/codemirror";
export default {
  name: "TextEditor",
  data() {
    return {
      myCodeMirror:null,

    }
  },
  methods: {
    setEditorHeight() {
      let editorHeight = document.getElementsByClassName('codemirror-editor')[0]
      let codeMirror = document.getElementsByClassName('CodeMirror')[0]
      codeMirror.style.height = editorHeight.clientHeight + 'px'
    }
  },
  mounted() {
    this.myCodeMirror = CodeMirror.fromTextArea(this.$refs['codemirror-editor-textarea'], {
      lineNumbers: true,
      mode:  "markdown",
      scrollbarStyle: 'simple',
      lineWrapping: true
    });
    this.setEditorHeight()
  }
}
</script>
<style scoped>

</style>
