<template>
    <div>
        <div class="btn-case">
            <span>签约合同内容:</span>
            <el-button type="primary" @click="dialogVisible = true">查看合同</el-button>
        </div>
        <!-- <el-button type="primary" @click="dialogVisible = true">查看合同</el-button> -->

        <el-dialog
        title="合同详情"
        :visible.sync="dialogVisible"
        width="36%"
        >
            <div style="margin-bottom:20px;">
                <el-button type="primary" @click="previousPage">上一页</el-button>
                &nbsp;&nbsp;{{currentPage}} / {{pageCount}}
                <el-button type="primary" @click="nextPage">下一页</el-button>
            </div>
            <pdf 
            :src="src" 
            :page="num"
            ref="mypdf"
            @num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"></pdf>

            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="print()">打印</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>

<script>
import pdf from 'vue-pdf';
var loadingTask = pdf.createLoadingTask('./guanggao.pdf');
export default {
    components: {
        pdf
    },
    data() {
      return {
        src: loadingTask,
        numPages: undefined,
        dialogVisible: false,
        num:1, //控制页数变量
        currentPage:0, //pdf当前页
        pageCount:0 //pdf总页数
      };
    },
    methods: {
        previousPage(){
            this.num--;
            if(this.currentPage == 1){
                this.num = 1;
            }
        },
        nextPage(){
            this.num++;
            if(this.currentPage == this.pageCount){
                this.num = this.pageCount;
            }
        },
        //打印
        print(){
            this.$refs.mypdf.print();
        }
    }
}
</script>

<style lang="scss" scoped>
 .btn-case{
    padding: 10px;
    background: #fff;

    span{
        padding-right: 10px;
    }
 }
 ::v-deep .el-message-box__btns:nth-child(1) span{
    background-color: pink;
 }
</style>