<template>
    <div>
        <!-- 面包屑导航 -->
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="v.path" v-for="(v,i) in list" :key="i">{{v.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    created(){
        console.log("user 组件被创建");
        // console.log(this.$route.metched);
        this.list = this.$route.matched;
        // this.list = this.$route.path;
        // console.log(this.list);
    },
    watch:{
        $route(to,from){
            console.log(to);
            let matched = to.matched;
            this.list = matched;
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav{
        padding: 10px;
        background: #fff;
        border: 1px solid #eee;
        margin-bottom: 20px;
    }
</style>