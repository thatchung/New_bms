<template>
    <div class="login-wrapper">
        <form class="login" @submit.prevent="login" :class="{working: state}">
            <div class="header">
                
            </div>

            <input type="text" autocorrect="off" autocapitalize="none" placeholder="Tên đăng nhập" autofocus
                   v-model="username"/>
            <i class="fa fa-user"></i>

            <input type="password" placeholder="Mật khẩu" v-model="password"/>
            <i class="fa fa-key"></i>

            <button>
                <i class="spinner" v-if="state === 'loading'"></i>
                <i class="icon fa fa-warning" v-if="state === 'error'"></i>
                <span class="text">{{state && text ? text : "Đăng nhập"}}</span>
            </button>
        </form>
    </div>
</template>
<style>
</style>
 
<script>
import ApiService from '../plugins/api.service.js'
    export default {
        name: 'Login',

        data: (router) => ({
            username: null,
            password: null,
            state: null,
            text: null,
        }),

        mounted: function () {
            if (this.$store.state.session !== undefined && this.$store.state.session !== null)
                this.$router.replace(this.$store.state.route.query.redirect ? this.$store.state.route.query.redirect : '/');
        },

        methods: {
            login: async function () {
                if (!this.username || !this.password)
                    return;

                if (this.state) {
                    if (this.state === 'error') {
                        this.state = null;
                        this.text = null;
                    }
                    return;
                }

                this.state = 'loading';
                this.text = 'Đang đăng nhập...';

                let r = await ApiService.request({
                    method: "post",
                    service: "admin",
                    url: 'v1.0/api/user/login',
                    showError: false,
                    data: {
                        email: this.username,
                        password: this.password,
                    }
                });
                if (!r.meta.success) {
                    this.state = 'error';
                    this.text = r.error.message;
                    return;
                }

                if (window.localStorage) {
                  window.localStorage.setItem('session', r.data.token);
                  window.localStorage.setItem('profile', JSON.stringify(r.data));
                } 
                
                this.$router.replace(this.$store.state.route.query.redirect ? this.$store.state.route.query.redirect : '/');
            },
        },
    }
</script>

<style lang="scss" scoped>
    $primary: #d0370f;

    @keyframes spinner {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(359deg);
        }
    }

    * {
        box-sizing: border-box;
    }

    .login-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        min-height: 100vh;
        padding: 20px;
        background: #1e292f;
    }

    .login {
        border-radius: 2px 2px 5px 5px;
        width: 90%;
        max-width: 320px;
        background: #ffffff;
        position: relative;
        padding: 10px 20px 80px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

        &.working {
            button {
                max-height: 100%;
                padding-top: 50px;
                .spinner {
                    opacity: 1;
                    top: 40%;
                }
            }
        }

        input {
            display: block;
            padding: 15px 10px;
            margin-bottom: 10px;
            width: 100%;
            border: 1px solid #ddd;
            transition: border-width 0.2s ease;
            border-radius: 2px;

            & + i.fa {
                color: #fff;
                font-size: 1em;
                position: absolute;
                margin-top: -43px;
                opacity: 0;
                left: 0;
                transition: all 0.1s ease-in;
            }

            &:focus {
                & + i.fa {
                    opacity: 1;
                    left: 33px;
                    transition: all 0.25s ease-out;
                }
                outline: none;
                color: #444;
                border-color: $primary;
                border-left-width: 35px;
            }

        }

        .header {
            text-align: center;
            margin-bottom: 15px;

            .logo {
                width: 100px;
            }
        }

        button {
            width: 100%;
            height: 100%;
            padding: 10px 10px;
            background: $primary;
            color: #fff;
            display: block;
            margin-top: 20px;
            position: absolute;
            left: 0;
            bottom: 0;
            max-height: 60px;
            border: 0 solid rgba(0, 0, 0, 0.1);
            border-radius: 0 0 2px 2px;
            transform: rotateZ(0deg);
            transition: all 0.1s ease-out;
            border-bottom-width: 7px;

            .spinner {
                display: block;
                width: 40px;
                height: 40px;
                position: absolute;
                border: 4px solid #ffffff;
                border-top-color: rgba(255, 255, 255, 0.3);
                border-radius: 100%;
                left: 50%;
                top: 30px;
                opacity: 0;
                margin-left: -20px;
                margin-top: -20px;
                animation: spinner 0.6s infinite linear;
                transition: top 0.3s 0.3s ease,
                opacity 0.3s 0.3s ease,
                border-radius 0.3s ease;
                box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
            }

            .icon {
                display: block;
                width: 40px;
                height: 40px;
                position: absolute;
                font-size: 40px;
                left: 50%;
                top: 40%;
                margin-left: -20px;
                margin-top: -20px;
            }

        }

        &:not(.working) button:hover {
            box-shadow: 0 1px 3px $primary;
        }
        &:not(.working) button:focus {
            border-bottom-width: 4px;
        }

    }

    footer {
        display: block;
        padding-top: 50px;
        text-align: center;
        color: #ddd;
        font-weight: normal;
        text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.2);
        font-size: 0.8em;
        a, a:link {
            color: #fff;
            text-decoration: none;
        }
    }
</style>