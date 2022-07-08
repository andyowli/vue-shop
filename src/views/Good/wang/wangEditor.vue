<template>
    <div id="main">
        
    </div>
</template>

<script>
import E from 'wangeditor';
export default {
    data(){
        return {
            editor:''
        }
    },
    mounted(){
        this.editor = new E('#main');
        //关闭自动focus光标
        this.editor.config.focus = false;
        //回调
        this.editor.config.onchange = (newHtml) => {
            console.log(newHtml);
            //获取内容传给父级
            this.$emit('sendEditor',newHtml);
        }
        //触发回调的频率时间,默认200ms
        this.editor.config.onchangeTimeout = 500;
        //设置工具栏，默认是全加载
        this.editor.config.menus = ['bold','head','link','italic','underline'];
        this.editor.create();
    }
}
</script>