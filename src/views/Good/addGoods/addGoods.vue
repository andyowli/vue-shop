<template>
    <div class="add-goods">
        <!-- 面包屑导航 -->
       <Breadcrumb></Breadcrumb>

        <!-- 表单内容 -->
        <div class="myForm">
            <el-form :rules="rules" ref="ruleForm" :model="ruleForm" label-width="80px">
                <el-form-item label="类目选择" prop="category">
                    <el-button type="primary" @click="innerVisible = true">类目选择</el-button>
                    <span class="label">{{dataTree}}</span>
                </el-form-item>
                <el-form-item label="商品名称" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                 <el-form-item label="商品价格" prop="price">
                    <el-input v-model="ruleForm.price"></el-input>
                </el-form-item>
                 <el-form-item label="商品数量" prop="number">
                    <el-input v-model="ruleForm.number"></el-input>
                </el-form-item>
                <el-form-item label="商品卖点" prop="sellPoint">
                    <el-input v-model="ruleForm.sellPoint"></el-input>
                </el-form-item>
                <el-form-item label="商品图片" prop="image">
                    <el-button type="primary" @click="innerImg = true">上传图片</el-button>
                </el-form-item>
                <el-form-item label="商品描述" prop="descs">
                    <wangeditor @sendEditor="sendEditor"></wangeditor>
                </el-form-item>
                
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm">立即创建</el-button>
                    <el-button type="warning">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-dialog
            width="30%"
            title="类目选择"
            :visible.sync="innerVisible"
            append-to-body>
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                 <span slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = false" type="warning">取 消</el-button>
                    <el-button type="primary" @click="ok">确 定</el-button>
                </span>
               
            </el-dialog>
        </div>

        <div>
            <el-dialog
            width="30%"
            title="类目选择"
            :visible.sync="innerImg"
            append-to-body>
                <upload></upload>
                 <span slot="footer" class="dialog-footer">
                    <el-button @click="innerImg = false" type="warning">取 消</el-button>
                    <el-button type="primary" @click="innerImg = false">确 定</el-button>
                </span>
               
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '../../../components/Breadcrumb.vue';
import Upload from '../upLoad/upLoadimg.vue';
import wangeditor from '../wang/wangEditor.vue';
  export default {
    components:{
        Breadcrumb,
        Upload,
        wangeditor
    },
    data() {
        return {
            dataTree:'', //确认保存Tree
            //children	指定子树为节点对象的某个属性值
            //label	指定节点标签为节点对象的某个属性值
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            //Tree数据
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
            innerVisible: false, //控制Tree弹窗
            innerImg:false, //控制upLoadImg弹窗
            ruleForm: {
                title: '',
                price: '', //商品价格
                number: '',
                sellPoint: '',
                image:'',
                descs:'',
                category:'' //商品类目
            },
            props: {
                label: 'name',
                children: 'data1',
                isLeaf: 'leaf'
            },
            //表单验证规则
            rules: {
                title: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请选择价格', trigger: 'blur' }
                ],
                number: [
                    { type: 'date', required: true, message: '请选择数量', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //接收富文本内容数据
        sendEditor(val){
            this.ruleForm.descs = val;
        },
        onSubmit() {
            console.log('submit!');
        },
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
            if (valid) {
                console.log('输入内容');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //获取Tree数据
        handleNodeClick(data) {
            // console.log(data);
            this.ruleForm.category = data.label;
            console.log(this.ruleForm.category);
        },
        ok(){
            this.dataTree = this.ruleForm.category;
            this.innerVisible = false;
        }
    }
  }
</script>

<style lang="scss" scoped>
    .add-goods{
        .title{
            padding: 10px;
            background: #fff;
            border: 1px solid #eee;
            margin-bottom: 20px;
        }
        .myForm{
            background: #fff;
            padding: 10px;
            padding-right: 30px;
        }
        .label{
            color: #e6a23c;
            font-size: 16px;
            margin-left: 10px;
        }
    }
    ::v-deep .el-form-item__content{
        z-index: 1;
    }
</style>