<template>
    <div>
        <Breadcrumb></Breadcrumb>

        <contract></contract>
        
        <div class="invoice">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>卡片名称</span>
                            <el-button style="float: right; padding: 3px 0;" type="text" @click="download()">下载发票</el-button>
                        </div>
                        <div class="text item">
                            <img :src="imgUrl" style="max-width:100%;">
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>卡片名称</span>
                            <el-button style="float: right; padding: 3px 0" type="text">下载发票</el-button>
                        </div>
                        <div class="text item">
                            <img src="../../assets/img/fapiao.jpg" style="max-width:100%;">
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>卡片名称</span>
                            <el-button style="float: right; padding: 3px 0" type="text">下载发票</el-button>
                        </div>
                        <div class="text item">
                            <img src="../../assets/img/fapiao.jpg" style="max-width:100%;">
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div>
            <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                >
                </el-table-column>
                <el-table-column
                prop="ContractTime"
                label="签约年限"
                >
                </el-table-column>
                <el-table-column
                prop="money"
                label="金额"
                >
                </el-table-column>
                <el-table-column
                prop="Signing"
                label="签约状态"
                width="100"
                :filters="[{ text: '已签约', value: '已签约' }, { text: '待签约', value: '待签约' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                    :type="scope.row.Signing === '已签约' ? 'success' : 'danger'"
                    disable-transitions>{{scope.row.Signing}}</el-tag>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import contract from './contract.vue';
import img from '../../assets/img/fapiao.jpg';
import Breadcrumb from '../../components/Breadcrumb.vue';
export default {
    components:{
        contract,
        Breadcrumb
    },
    mounted(){
        
    },
    data(){
        return {
            imgUrl:img,
            tableData: [{
                date: '2018-05-02',
                name: '王先生',
                ContractTime:'2年',
                money:'23800',
                Signing: '已签约'
            },{
                date: '2019-06-09',
                name: '李先生',
                ContractTime:'1年',
                money:'9800',
                Signing: '已签约'
            },{
                date: '2018-05-02',
                name: '张女士',
                ContractTime:'2年',
                money:'23800',
                Signing: '待签约'
            }]
        }
    },
    methods:{
        //签约状态筛选
        filterTag(value, row) {
            return row.Signing === value;
        },
        //发票下载
        download(){
            var alink = document.createElement('a');
            alink.href = this.imgUrl;
            alink.download = "pic"
            alink.click();
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
    .box-card{
        margin: 10px 0;
    }
    .el-button--text{
        color: #409EFF !important;
    }

    // ::v-deep td{
    //     color: #67c23a;
    // }

    // @media screen and (max-width:980px){
    //     img{
    //         width: 302px !important;
    //     }
    // }

    // @media screen and (max-width:768px){
    //     .box{
    //         width: 400px !important;
    //     }
    // }
</style>