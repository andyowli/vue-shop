<template>
    <div>
        <Breadcrumb v-if="show"></Breadcrumb>

        <!-- 数量 -->
        <div>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="1" v-for="(item,index) in amount" :key="index">
                    <div class="amount-contiar">
                        <div class="box" :class="sstt[index]">
                            <div class="Upper">
                                <h4>{{item.title}}</h4>
                                <span class="number">{{item.num}}</span>
                            </div>
                            <div class="Lower">
                                <span class="Lower-cont">{{item.cont}}</span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        
        <!-- 数据表 -->
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="1">
                <div class="echarts-cont">
                    <div id="main"></div>
                </div>
                
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="1">
                <div class="echarts-cont">
                    <div id="bing"></div>
                </div>
            </el-col>
        </el-row>

       <!-- 订单 -->
        <div>
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="11" :xl="1">
                    <div class="order-moudle">
                        <div class="order">
                            <div class="order-title">
                                <table>
                                    <tr>
                                        <th colspan="1" rowspan="1">
                                            <div>订单号</div>
                                        </th>
                                        <th colspan="1" rowspan="1">价格</th>
                                        <th colspan="1" rowspan="1">交易</th>
                                    </tr>
                                    <tr v-for="(list,con) in orderList" :key="con">
                                        <th>{{list.orderNum}}</th>
                                        <th>¥{{list.money}}</th>
                                        <th>{{list.state}}</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="13" :xl="1">
                    <div id="line"></div>
                </el-col>
            </el-row>
        </div>

        <!-- <div class="order-moudle">
            <div class="order">
                <div class="order-title">
                    <table>
                        <tr>
                            <th colspan="1" rowspan="1">
                                <div>订单号</div>
                            </th>
                            <th colspan="1" rowspan="1">价格</th>
                            <th colspan="1" rowspan="1">交易</th>
                        </tr>
                        <tr v-for="(list,con) in orderList" :key="con">
                            <th>{{list.orderNum}}</th>
                            <th>¥{{list.money}}</th>
                            <th>{{list.state}}</th>
                        </tr>
                    </table>
                </div>
            </div>

            <div id="line"></div>
        </div> -->
    </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb.vue';
export default {
    components:{
        Breadcrumb
    },
    data(){
        return {
            show:false,
            amount:[
                {title:'总销售额',num:1000,cont:'今日销售额:431'},
                {title:'访问量',num:639960,cont:'今日销售额:431'},
                {title:'支付总量',num:181161,cont:'今日支付额:1772'},
                {title:'收藏量',num:686170,cont:'今日收藏量:431'},
            ],
            sstt: [
                "ss1",
                "ss2",
                "ss3",
                "ss4"
            ],
            orderList:[
                {orderNum:'dcfaDF69-d8CB-405B-c713-6c3fa3',money:'7,163',state:'成功'},
                {orderNum:'D8Dd0ecf-DFB8-d32f-e6bc-fC5B38',money:'10,335.1',state:'待办的'},
                {orderNum:'b9dcAAEe-B46d-BE9E-a1E7-674f76',money:'7,833.2',state:'成功'},
                {orderNum:'92f22B4b-BA33-cE7b-2082-Ba8EFA',money:'12,954',state:'成功'},
            ]
        }
    },
    methods:{
        pie(){
            var pieDom = document.getElementById('bing');
            var pie = this.$echarts.init(pieDom);
            window.addEventListener("resize", () => { pie.resize();});

            var pieData;

            pieData = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 735, name: '3c数码' },
                            { value: 1048, name: '衣帽服饰' },
                            { value: 580, name: '家居生活' },
                            { value: 484, name: '精品零食' },
                            { value: 300, name: '厨房用品' }
                        ],
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            pieData && pie.setOption(pieData);
        },
        line(){
            var myChartLine = this.$echarts.init(document.getElementById('line'));
            window.addEventListener("resize", () => { myChartLine.resize();});
            
            var option;

            option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['成功', '失败', '待办']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '失败',
                        type: 'line',
                        stack: 'Total',
                        data:  [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '成功',
                        type: 'line',
                        stack: 'Total',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '待办',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    }
                ]
            };

            option && myChartLine.setOption(option);
        }
    },    
    mounted(){
        this.pie();
        var chartDom = document.getElementById('main');
        var myChart = this.$echarts.init(chartDom);
        window.addEventListener("resize", () => { myChart.resize();});
        
        var option;

        option = {
            xAxis: {
                type: 'category',
                data: ['连衣裙', 'T恤', '衬衫', '休闲裤', '牛仔裤', '半身裙', '外套']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }
            ]
        };

        option && myChart.setOption(option);

        this.line();
    }
}
</script>

<style lang="scss" scoped>
    .amount-contiar{
        .box{
            width: 100%;
            height: 120px;
            border-radius: 10px;
            margin: 10px 0;

            .Upper,.Lower,.order{
                color: #fff;
            }
            .number,.Lower-cont{
                padding-left: 8px;
            }

            .Upper,.Lower{
                // width: calc(100% - 10px);
                padding: 10px;
            }

            .Upper{
                border-bottom: 1px solid #fff;

                h4{
                    margin-bottom: 10px;
                }

                .number{
                    font-size: 24px;
                }
            }
        }
    }

    .ss1{
        background: #d08170;
    }
    .ss2{
        background: #358be5;
    }
    .ss3 {
        background: #a7579c;
    }
    .ss4{
        background: #18a9d3;
    }

    .echarts-cont{
        #main{
            height: 400px;
        }   
        #bing{
            height: 380px;
            padding: 10px;
        }
        #main,#bing{
            margin-top: 10px;
        }
    }

    #main,#bing,.order,#line{
        background: #fff;
    }

    .order-moudle{
        margin: 10px 0;
        
        table{
            width: 100%;

            th{
                text-align: left;
                height: 40px;
                color: #606266;
                border-bottom: 1px dashed #dfe6ec;

            }
        }
        
    }

    .order,#line{
        max-width:100%;
        height: 200px;
        padding: 17px;
        margin-top: 20px;
    }
</style>