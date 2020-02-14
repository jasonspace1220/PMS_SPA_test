<template>
    <div>
        <div class="alert alert-danger" v-if="error">
            <p>出错了，请检查邮箱/密码是否正确</p>
        </div>
        <form autocomplete="off" @submit.prevent="login" method="post">
            <div class="form-group">
                <label for="email">邮箱</label>
                <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email"
                    required>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" class="form-control" v-model="password" required>
            </div>
            <Button type="success" ghost @click="log">登入</Button>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                email: null,
                password: null,
                error: false
            }
        },
        methods: {
            log() {

                this.login();
            },
            login() {
                var app = this
                this.$auth.login({
                    params: {
                        email: app.email,
                        password: app.password
                    },
                    success: function () {},
                    error: function () {},
                    rememberMe: true,
                    redirect: '/dashboard',
                    fetchUser: true,
                });
            },
        }
    }

</script>
