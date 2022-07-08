<template>
    <div class="params">
        <!-- 面包屑导航
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/params' }">规格参数</el-breadcrumb-item>
                <el-breadcrumb-item>规格包装</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <Breadcrumb></Breadcrumb>

        <!-- 搜索框 -->
        <div class="header">
            <el-input v-model="inp" placeholder="请输入规格名称"></el-input>
            <el-button type="primary" @click="search">查看</el-button>
            <el-button type="primary" @click="dialogVisible = true">添加</el-button>
        </div>

        <!-- 表格 -->
        <div>
            <el-table :data="indexResultsTable" class="my-table">
                <el-table-column prop="specifId" label="规格参数ID" width="180"></el-table-column>
                <el-table-column prop="categoryId" label="类目ID" width="180"></el-table-column>
                <el-table-column prop="name" label="规格名称"></el-table-column>
                <el-table-column prop="parameters" label="规格描述" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <div class="contain">
            <el-pagination 
            v-if="pageshow" 
            background 
            layout="total,prev, pager, next,jumper" 
            :current-page="currentPage"
            :total="total" 
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"></el-pagination>
        </div>

        <!-- 弹窗 -->
        <!-- <div v-show="dialogVisible"> -->
            <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            >
                <el-tree :data="data" @node-click="handleNodeClick"></el-tree>
                <span slot="footer" class="dialog-footer">
                    <el-button  type="warning" @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="innerVisible = true" :disabled="isDisabled">确定添加分组</el-button>
                </span>
                <!-- 内弹框 -->
                <el-dialog
                width="45%"
                title="参数配置"
                :visible.sync="innerVisible"
                append-to-body>

                    <div class="title">当前选中的商品:{{treeData.label}}</div>
                    <el-button type="primary" @click="addDomain">新增规格列表</el-button>
                    <hr/>

                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px" class="demo-dynamic">
                        
                        <el-form-item
                            v-for="(item, index) in dynamicValidateForm.domains"
                            :label="item.title"
                            :key="index"
                            :prop="item.title"
                            :rules="{
                            required: true, message: '域名不能为空', trigger: 'blur'
                            }"
                        >
                            <div class="item">
                                <el-input v-model="item.title" placeholder="请输入主体" id="parent"></el-input>
                                <el-button type="primary" @click.prevent="addChildren(index)">添加子组</el-button>
                                <el-button type="danger" @click.prevent="removeDomain(index)">删除</el-button>
                            </div>
                            <!-- 子组 -->
                            <el-form-item
                            v-for="(ele, i) in item.children"
                            :label="ele.title"
                            :key="i"
                            :prop="ele.title"
                            :rules="{
                            required: true, message: '域名不能为空', trigger: 'blur'
                            }">
                                <div class="item">
                                    <el-input v-model="ele.title" placeholder="请输入子组" id="chrild"></el-input>
                                    <el-button  type="danger" @click.prevent="removeChildren(index,i)">删除</el-button>
                                </div>
                            </el-form-item>

                        </el-form-item>
                    </el-form>

                    <span slot="footer" class="dialog-footer">
                        <el-button  type="primary" @click="submitForm('dynamicValidateForm')">确定</el-button>
                        <el-button type="warning" @click="resetForm()">重置</el-button>
                    </span> 
                </el-dialog>
            </el-dialog>
        <!-- </div> -->
    </div>
</template>

<script>
import Breadcrumb from '../../../components/Breadcrumb.vue';
export default {
    components:{
        Breadcrumb
    },
    data(){
        return {
            pageshow:true,
            inp:'',
            currentPage:1, //初始页
            total:10,
            pageSize:3, //每页的数据
            listQuery:[],
            indexResultsTable:[], //保存分页数据的空数组
            dialogVisible: false, //控制添加的弹框
            innerVisible:false, //添加的弹框中的内弹框
            isDisabled:true, //弹框按钮状态
            treeData:{},
            tableData:[{
                specifId:1,
                categoryId:10,
                name:'洗衣机',
                parameters:'标准程序耗水量:54L,产品尺寸:深600mm；宽595mm；高850mm,产品重量:71kg'
            },{
                specifId:2,
                categoryId:10,
                name:'洗衣机',
                parameters:'标准程序耗水量:54L,产品尺寸:深600mm；宽595mm；高850mm,产品重量:71kg'
            },{
                specifId:3,
                categoryId:10,
                name:'洗衣机',
                parameters:'标准程序耗水量:54L,产品尺寸:深600mm；宽595mm；高850mm,产品重量:71kg'
            },{
                specifId:4,
                categoryId:10,
                name:'洗衣机',
                parameters:'标准程序耗水量:54L,产品尺寸:深600mm；宽595mm；高850mm,产品重量:71kg'
            },{
                specifId:5,
                categoryId:10,
                name:'洗衣机',
                parameters:'标准程序耗水量:54L,产品尺寸:深600mm；宽595mm；高850mm,产品重量:71kg'
            },{
                specifId:6,
                categoryId:20,
                name:'空调',
                parameters:'内机净重:9kg,外机净重:26kg,外机尺寸:802mm；高555mm；深350mm,内机机身尺寸:宽825mm；高293mm；深196mm'
            }],
            data: [{
                label: '家用电器',
                children: [{
                    label: '冰箱'
                }]
            },{
                label: '厨房用具',
                children: [{
                    label: '刀具'
                },{
                    label: '锅'
                }]
            }],
            dynamicValidateForm: {
                domains: []
            }
        }
    },
    mounted(){
        this.getList();
    },
    methods:{
        handleSizeChange(size){
            console.log(size)
            this.pageSize = size;
            this.getList();
        },
        handleCurrentChange(page){
            console.log(page)
            this.currentPage = page;
            this.getList();
            if(this.indexResultsTable.length === 1){
                this.currentPage = 1;
            }
        },
        //前端自己分页
        getList() {
            // es6过滤得到满足搜索条件的展示数据list
            let list = this.tableData.filter((item, index) =>
                item.name.includes(this.inp)
            )
            this.indexResultsTable = list.filter((item, index) =>
                index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1)
            )
            this.total = list.length
        },
        //搜索按钮事件
        search() {
            this.page = 1
            this.getList()
        },
        //删除表格行数据
        handleDelete(index,row) {
            //删除
            this.indexResultsTable.splice(index,1);
        },
        cancel(){
            this.dialogVisible = false;
            this.isDisabled = true;
        },
        submitForm() {
            this.$refs.dynamicValidateForm.validate((valid) => {
            if (valid) {
                console.log('提交参数',this.dynamicValidateForm.domains);
                document.getElementById('parent').value = '';
                document.getElementById('chrild').value = '';
                this.dialogVisible = false;
                this.innerVisible = false;
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        //重置
        resetForm() {
            document.getElementById('parent').value = '';
            document.getElementById('chrild').value = '';
        },
        //Tree数据获取方法
        handleNodeClick(data) {
            console.log(data);
            this.treeData = data;
            this.isDisabled = false;
        },
        //  resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // },
        //删除创建的规格组
        removeDomain(index) {
            this.dynamicValidateForm.domains.splice(index, 1);
        },
        //新增列表
        addDomain() {
            this.dynamicValidateForm.domains.push({
                title:'',
                value: '',
                children:[]
            });
        },
        //删除子组
        removeChildren(index,i){
            this.dynamicValidateForm.domains[index].children.splice(i, 1);
        },
        //添加子组
        addChildren(index){
             this.dynamicValidateForm.domains[index].children.push({
                value:'',
                title:''
             })
        }
    },
    computed:{
        //1.搜索功能，使用filter，return的是一个Boolean，运用match返回。
        //2.同时数据展示的v-for需要给filteredUser，而不是数据的数组。
        //indexResultsTable是保存分页数据处理的数组
        // filteredUser(){
        //     return this.indexResultsTable.filter((data) =>{
        //         this.currentPage = 1;
        //         this.getResultsTable();
        //         this.$nextTick(() => {
        //             this.pageshow = true
        //         })
        //         return data.name.match(this.inp);
        //     })
        // }
    },
    
}
</script>

<style lang="scss" scoped>
    .nav{
        padding: 10px;
        background: #fff;
        border: 1px solid #eee;
        margin-bottom: 20px;
    }
    .header{
        display: flex;
        button{
            margin-left: 20px;
        }
    }
    .my-table{
        margin-top: 20px;
    }
    .item{
        display: flex;
        margin-top: 10px;
        button{
            margin-left: 10px;
        }
    }
    .el-form-item__label{
        margin-top: 10px;
    }
    .contain{
        text-align: center;
        margin-top: 20px;
    }
</style>