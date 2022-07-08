<template>
    <div>
        <Breadcrumb></Breadcrumb>

        <!-- 头部搜索 -->
        <div class="header">
            <el-input v-model="input" placeholder="请输入商品名称"></el-input>
             <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="exportData">导出表格</el-button>
            <el-button type="primary">
                <router-link to="/addGoods">添加</router-link>
            </el-button>
        </div>

        <!-- 表格数据 -->
        <div class="wrapper">
            <el-table
            border
            :data="indexResultsTable"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
            style="width: 100%"
            >
            <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
                <el-table-column prop="title" label="商品名称" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="price" label="商品价格" width="100"></el-table-column>
                <el-table-column prop="number" label="商品数量" width="100"></el-table-column>
                <el-table-column prop="category" label="商品类目" width="100"></el-table-column>
                <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <img :src="scope.row.image" min-width="70" height="70"/>
                    </template>
                </el-table-column>
                <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip></el-table-column>
                <el-table-column prop="descs" label="商品描述" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="Edit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="margin-top:20px">
                <el-button type="primary" @click="delArray()">选择删除</el-button>
                <el-button type="primary" @click="clear()">选择清空</el-button>
            </div>
        </div>

        <!-- 编辑 -->
        <div>
            <el-dialog
            title="修改商品信息"
            :visible.sync="dialogVisible"
            width="30%"
                :before-close="handleClose">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="商品ID">
                        <el-input v-model="form.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品类目">
                        <el-input v-model="form.category"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片">
                        <el-input v-model="form.image"></el-input>
                    </el-form-item>
                    <el-form-item label="商品卖点">
                        <el-input v-model="form.sellPoint"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <el-input v-model="form.descs"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="warning" @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <!-- 分页 -->
        <div class="contain">
            <el-pagination 
            background 
            layout="total,prev, pager, next,jumper" 
            :current-page="currentPage"
            :total="total" 
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb.vue';
export default {
    data(){
        return {
            dialogVisible: false,
            bookType:'xlsx',
            input:'',
            currentPage:1, //初始页
            total:10,
            pageSize:4, //每页的数据　
            indexResultsTable:[], //保存分页数据的空数组
            tableDataAmount: [],
            form:[],
            tableData:[{
                id:1,
                title:'平底锅',
                price:110,
                number:13,
                category:'厨具',
                image:require('../../assets/img/guo.png'),
                sellPoint:'不粘,无油烟',
                descs:'卡罗特麦饭石不粘锅平底锅,煎牛排、鸡蛋，性价比高，轻巧锅身'
            },
            {
                id:2,
                title:'空调',
                price:110,
                number:13,
                category:'家电',
                image:require('../../assets/img/kongtiao.png'),
                sellPoint:'智能调节,自清洁,独立除湿',
                descs:'一级能效,变频节能低噪'
            },{
                id:3,
                title:'洗衣机',
                price:2299,
                number:32,
                category:'家电',
                image:require('../../assets/img/xiyiji.png'),
                sellPoint:'滚筒，变频，一级能效',
                descs:'除菌除螨，除菌'
            },
            {
                id:4,
                title:'联想拯救者',
                price:7299,
                number:21,
                category:'数码',
                image:require('../../assets/img/computer.png'),
                sellPoint:'独立显卡，165Hz',
                descs:'酷睿i5，15.6英寸接口丰富'
            },
            {
                id:5,
                title:'Redmi K50',
                price:2499,
                number:21,
                category:'数码',
                image:require('../../assets/img/k50.png'),
                sellPoint:'天玑8100,2K柔性直屏,OIS光学防抖,67W快充,5500mAh大电量',
                descs:'天玑8100,4800万像素,12GB'
            },
            {
                id:6,
                title:'联想小新pro16',
                price:6299,
                number:21,
                category:'数码',
                image:require('../../assets/img/pro16.png'),
                sellPoint:'独立显卡，165Hz',
                descs:'酷睿i5，15.6英寸接口丰富'
            },
            {
                id:7,
                title:'电脑',
                price:7299,
                number:21,
                category:'数码',
                image:require('../../assets/img/computer.png'),
                sellPoint:'独立显卡，165Hz',
                descs:'酷睿i5，15.6英寸接口丰富'
            },{
                id:8,
                title:'电脑',
                price:7299,
                number:21,
                category:'数码',
                image:require('../../assets/img/computer.png'),
                sellPoint:'独立显卡，165Hz',
                descs:'酷睿i5，15.6英寸接口丰富'
            }]
        }
    },
    components:{
        Breadcrumb
    },
    mounted(){
        this.getList();
    },
    methods:{
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        Edit(row,index){
            this.dialogVisible = true;
            console.log(index);
            this.form = index;
        },
        //得到选中的数据
        handleSelectionChange (val) {
        this.tableDataAmount = val
        },
        //批量删除
        delArray(){
            this.tableDataAmount.forEach((value,index) => {
                this.indexResultsTable.forEach((v,i) => {
                    if(value.id == v.id){
                        this.indexResultsTable.splice(i,1);
                    }
                })
            })
        },
        clear(){
            // 清除选中状态
            this.$refs.multipleTable.clearSelection()
        },
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
                item.title.includes(this.input)
            )
            this.indexResultsTable = list.filter((item, index) =>
                index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1)
            )
            this.total = list.length;
        },
         //搜索按钮事件
        search() {
            this.page = 1
            this.getList()
        },
        //删除表格行数据
        Delete(index,row) {
            //删除
            this.indexResultsTable.splice(index,1);
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "id") {  //此处如没有要格式化的列，可以不用此判断
                        // return parseTime(v[j])
                        return v[j];
                    } else {
                        return v[j];
                    }
                })
            );
        },
        //表格导出
        exportData(){
            import("../excel/Export2Excel").then(excel => {
                //tHeader是定义的头部字段
                const tHeader = ["商品ID", "商品名称", "商品价格", "商品数量", "商品类目","商品图片","商品卖点","商品描述"];
                //filterVal是定义的表格tableData数据字段
                const filterVal = [
                    "id",
                    "title",
                    "price",
                    "number",
                    "category",
                    "image",
                    "sellPoint",
                    "descs"
                ];
                const data = this.formatJson(filterVal, this.tableData)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "table-list",  //导出文件的名，自定义就好
                    bookType: this.bookType
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .header{
        display: flex;
        button{
            margin-left: 20px;
        }
    }
    .wrapper{
        margin-top: 20px;
    }
    .contain{
        text-align: center;
        margin-top: 20px;
    }
</style>