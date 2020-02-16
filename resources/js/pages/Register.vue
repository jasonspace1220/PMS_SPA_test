<template>

    <div>
        <Row><br></Row>
        <Row>
            <Col :sm="{ span: 12 ,offset:6 }">
            <Card style="width:100%">
                <div style="text-align:center">
                    <h2>歡迎光臨Jason的SPA網站練習</h2>
                    <h3>請註冊登入帳號</h3>
                    <br>

                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="90">
                        <FormItem label="使用者名稱" prop="name">
                            <Input type="text" v-model="formCustom.name"></Input>
                        </FormItem>
                        <FormItem label="信箱:" prop="email">
                            <Input type="text" v-model="formCustom.email"></Input>
                        </FormItem>
                        <FormItem label="密碼:" prop="passwd">
                            <Input type="password" v-model="formCustom.passwd"></Input>
                        </FormItem>
                        <FormItem label="密碼確認:" prop="passwdCheck">
                            <Input type="password" v-model="formCustom.passwdCheck"></Input>
                        </FormItem>
                    </Form>
                    <Button type="success" :loading="loading" @click="login('formCustom')" ghost long>
                        <span v-if="!loading">註冊</span>
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
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('使用者名稱必填'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密碼為必填'));
                } else if (value.length < 6) {
                    callback(new Error('密碼必須大於6碼'));
                } else {
                    callback();
                }
            };
            const validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('信箱帳號為必填欄位'));
                } else if (value.indexOf('@') == -1) {
                    callback(new Error('信箱格式不正確'));
                } else {
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密碼確認不能為空!'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('兩次輸入密碼不相等!'));
                } else {
                    callback();
                }
            }
            return {
                formCustom: {
                    name: '',
                    email: '',
                    passwd: '',
                    passwdCheck: '',
                },
                ruleCustom: {
                    name: [{
                        validator: validateName,
                        trigger: 'blur',
                    }],
                    email: [{
                        validator: validateEmail,
                        trigger: 'blur'
                    }],
                    passwd: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    passwdCheck: [{
                        validator: validatePassCheck,
                        trigger: 'blur'
                    }],
                },
                loading: false,
            }
        },
        methods: {
            register() {
                var app = this.formCustom;
                this.$auth.register({
                    params: {
                        name: app.name,
                        email: app.email,
                        password: app.passwd
                    },
                    success: function () {
                        this.loading = false;
                        this.$Message.success('註冊成功!');
                        this.$router.push('login');
                    },
                    error: function (error) {
                        var that = this;
                        let errorMsgObj = error.response.data.errors;
                        Object.keys(errorMsgObj).map(function (objectKey, index) {
                            var value = errorMsgObj[objectKey];
                            that.errorNotice('註冊失敗',value[0]);
                        });
                        // this.$Message.error('註冊失敗! ');
                        app.email = '';
                        app.passwd = '';
                        this.loading = false;
                    },
                    redirect: null,
                });
            },
            login(name) {
                this.loading = true;

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.register();
                    } else {
                        this.loading = false;
                        // this.$Message.error('請確認所有欄位格是正確!');
                        this.errorNotice('請確認所有欄位格是正確!');
                    }
                })
            },
            errorNotice(title,msg) {
                this.$Notice.error({
                    title: title,
                    desc: msg
                });
            }

        }
    }

</script>
