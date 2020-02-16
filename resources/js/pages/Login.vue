<template>

    <div>
        <Row><br></Row>
        <Row>
            <Col :sm="{ span: 12 ,offset:6 }">
            <Card style="width:100%">
                <div style="text-align:center">
                    <h3>歡迎光臨Jason的SPA網站練習</h3>
                    <br>

                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="90">
                        <FormItem label="信箱帳號:" prop="email">
                            <Input type="text" v-model="formCustom.email"></Input>
                        </FormItem>
                        <FormItem label="密碼:" prop="passwd">
                            <Input type="password" v-model="formCustom.passwd"></Input>
                        </FormItem>
                    </Form>
                    <Button type="success" :loading="loading" @click="log" ghost long>
                        <span v-if="!loading">登入</span>
                        <span v-else>登入中...</span>
                    </Button>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密碼為必填'));
                } else {
                    callback();
                }
            };
            const validateEmail = (rule, value, callback) => {
                if (value === '' || value.indexOf('@') == -1) {
                    callback(new Error('信箱帳號為必填欄位'));
                } else {
                    callback();
                }
            };
            return {
                formCustom: {
                    email: '',
                    passwd: '',
                },
                ruleCustom: {
                    email: [{
                        validator: validateEmail,
                        trigger: 'blur'
                    }],
                    passwd: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                },
                loading: false,
            }
        },
        methods: {
            log() {
                this.login();
            },
            login() {
                this.loading = true;
                var app = this.formCustom;
                this.$auth.login({
                    params: {
                        email: app.email,
                        password: app.passwd
                    },
                    success: function () {
                        this.loading = false;

                    },
                    error: function () {
                        // this.error = true;
                        this.$Message.error('登入失敗! 信箱帳號或密碼錯誤! ');
                        app.email = '';
                        app.passwd = '';
                        this.loading = false;

                    },
                    rememberMe: true,
                    redirect: '/dashboard',
                    fetchUser: true,
                });
            },
        }
    }

</script>
