<template>
    <div>
        <Button type="info">新增群組</Button>
        <br>
        <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
        <Table :loading="loading" :columns="columns1" :data="data1" size="small" no-data-text="無資料">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)">修改</Button>
                <Button type="error" size="small" @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                columns1: [{
                        title: '群組ID',
                        key: 'id',
                        width: 80,
                    },
                    {
                        title: '群組名稱',
                        key: 'name'
                    },
                    {
                        title : '建立時間',
                        key : 'created_at',
                        tooltip:true
                    },
                    {
                        title : '修改時間',
                        key:'updated_at',
                        tooltip:true
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data1: []
            }
        },
        created() {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.loading = true;
                var that = this;
                axios.get('/group')
                    .then((res) => {
                        console.table(res.data)
                        console.log(res.data);

                        that.data1 = res.data.data;

                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    .finally(() => {
                        /* 不論失敗成功皆會執行 */
                        this.loading = false;

                    })

            }
        }
    }

</script>
