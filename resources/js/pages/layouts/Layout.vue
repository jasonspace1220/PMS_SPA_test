<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100vh;
    }

    .ivu-layout.ivu-layout-has-sider {
        height: 100vh;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }

    .menu-icon {
        transition: all .3s;
    }

    .rotate-icon {
        transform: rotate(-90deg);
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .collapsed-menu a,
    .ivu-menu-vertical .ivu-menu-item {
        padding: 9px 9px;

    }

    .bg {
        background: #ffffff;
    }

</style>
<template>
    <div class="layout">
        <Layout>
            <Sider class="bg" breakpoint="md" ref="side1" hide-trigger collapsible :collapsed-width="50"
                v-model="isCollapsed">
                <Menu active-name="activeName" theme="primary" width="auto" :class="menuitemClasses">
                    <MenuItem :to="{ name: 'login' }" name="login" v-if="!$auth.check()">
                    <Icon type="ios-log-in"></Icon>
                    <span>登入</span>
                    </MenuItem>

                    <MenuItem name="register" :to="{ name: 'register' }" v-if="!$auth.check()">
                    <Icon type="ios-add" />
                    <span>註冊</span>
                    </MenuItem>

                    <MenuItem name="dashboard" v-if="$auth.check()" :to="{ name: 'dashboard' }">
                    <i class="fas fa-home"></i>
                    <span>首頁</span>
                    </MenuItem>

                    <MenuItem name="group" v-if="$auth.check()" :to="{ name: 'group' }">
                    <i class="fas fa-layer-group"></i>
                    <span>群組管理</span>
                    </MenuItem>
                    <!-- <MenuItem name="1-3" v-if="$auth.check()" @click.native="$auth.logout()">
                    <Icon type="ios-log-out"></Icon>
                    <span>登出</span>
                    </MenuItem> -->

                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Row type="flex" justify="start">

                        <i-col :xs="4" :sm="3" :md="2">
                            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}"
                                type="md-menu" size="24"></Icon>
                        </i-col>
                        <i-col :xs="4" :sm="3" :md="2">
                            <router-link :to="{name:'dashboard'}">
                                <h1>PWS</h1>
                            </router-link>
                        </i-col>
                        <i-col span="20" :xs="16" :sm="18" :md="20">
                            <Row type="flex" justify="end" class="code-row-bg">
                                <i-col :xs="{span:14,offset:2}" :sm="{span:4,offset:10}">
                                    <UserDropDown></UserDropDown>

                                </i-col>
                            </Row>
                        </i-col>
                    </Row>

                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import UserDropDown from '../../components/header/UserDropDown.vue';
    export default {
        data() {
            return {
                isCollapsed: true,
                activeName: '',
            }
        },
        computed: {
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            // getCurrentcAtive() {
            //     console.log(this.$router.currentRoute.name);
            //     return this.$router.currentRoute.name;
            // }

        },
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
        },
        watch: {
            $route(to, from) {
                this.activeName = to.name
            }
        },
        components: {
            'UserDropDown': UserDropDown
        }
    }

</script>
