<template>
    <div class="header ">
        <div class="headerbox container">
            <a href="javascript:;" @click="goHome()" class="logo left">
                <img class="pclogo" src="@/assets/img/logo.png" alt="">
                <img class="mblogo" src="@/assets/img/moblielogo.png" alt="">
            </a>
            <a href="javascript:;" class="lan right" @click="changeLang()">
                <span v-show="lang == 'zh-CN'">EN</span>
                <span v-show="lang == 'en'">中文</span>
            </a>
            <div class="search right">
                <input type="text" :placeholder="$t('header.SearchMore')" v-model="searchValue">
                <a href="javascript:;" class="searchBtn" @click="goSearch">{{$t('header.Search')}}</a>
            </div>
        </div>
        <Prompt :title="promptTitle" ref="prompt"></Prompt>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                searchValue: '',
                promptTitle: 'test',
                lang: localStorage.getItem('lang') || "zh-CN"
            }
        },
        methods: {
            /**
             * 点击logo路由选择，如果当前页就是首页则重新刷新该页面，否则就是正常跳转
             * @return {[type]} [description]
             */
            goHome: function () {
                if (this.$route.name == "index") {
                    this.$router.go(0)
                } else {
                    this.$router.push({
                        path: '/'
                    })
                }
            },
            changeLang() {
                // console.log(this.lang)
                if (this.lang == "zh-CN") {
                    this.$i18n.locale = "en";
                    localStorage.setItem("lang", 'en');
                    this.lang = 'en'
                } else if (this.lang == "en") {
                    this.$i18n.locale = "zh-CN";
                    localStorage.setItem("lang", 'zh-CN');
                    this.lang = "zh-CN"
                }
            },
            selectType(type) {
                if (type == 1) {
                    this.$router.push({
                        path: "/deal",
                        query: {
                            hash: this.searchValue
                        }
                    })
                }
                if (type == 2) {
                    this.$router.push({
                        path: "/treaty",
                        query: {
                            hash: this.searchValue
                        }
                    })
                }
                if (type == 3) {
                    this.$router.push({
                        path: "/snapshot",
                        query: {
                            hash: this.searchValue
                        }
                    })
                }
                if (type == 4) {
                    this.$router.push({
                        path: "/text",
                        query: {
                            hash: this.searchValue
                        }
                    })
                }
                if (type == 5) {
                    this.$router.replace({
                        path: "/account",
                        query: {
                            addr: this.searchValue
                        }
                    })
                }
            },
            //通过输入内容的长度判读传什么值
            goSearch() {
                if (this.searchValue && this.searchValue.length == 90) {
                    let formdatahash = new FormData();
                    formdatahash.append("hash", this.searchValue);
                    this.axios.post('messagesinfo', formdatahash).then((res) => {
                        if (res.data.code == 200) {
                            this.selectType(res.data.data.type);
                        } else {
                            this.promptTitle = "没有找到该条记录";
                            this.$refs.prompt.showEl();
                        }
                    })
                } else if (this.searchValue && this.searchValue.length == 32) {
                    let formdataaddr = new FormData();
                    formdataaddr.append("address", this.searchValue);
                    this.axios.post('messagesinfo', formdataaddr).then((res) => {
                        // console.log(res)
                        if (res.data.code == 200) {
                            if (res.data.data.list.length != 200) {
                                this.selectType(5);
                            } else {
                                this.promptTitle = "没有找到该条记录";
                                this.$refs.prompt.showEl();
                            }
                        }
                    })
                } else {
                    this.promptTitle = "输入地址有误";
                    this.$refs.prompt.showEl();
                }

            }
        },
        mounted: function () {

        }
    }
</script>
<style scoped lang="scss">
    $width-mobile: 768px; // 移动端适配宽度
    .header {
        position: fixed;
        width: 100%;
        height: 72px;
        background: rgb(255, 255, 255);
        box-shadow: 0px 4px 10px 0px rgba(5, 25, 89, 0.27);
        z-index: 5;

        .headerbox {
            /*max-width: 1200px;*/
            .logo {
                display: block;
                margin-top: 10px;
                margin-left: -15px;

                .pclogo {
                    width: 164px;
                }

                .mblogo {
                    display: none;
                    margin-top: 10px;
                }
            }

            .search {
                position: relative;
                margin-top: 18px;
                width: 70%;
                max-width: 426px;

                input {
                    /*border: none;*/
                    resize: both;
                    outline: black;
                    border-radius: 4px 0 0 4px;
                    height: 36px;
                    width: 70%;
                    max-width: 336px;
                    box-sizing: border-box;
                    padding-left: 15px;
                    font-size: 14px;
                }

                .searchBtn {
                    display: inline-block;
                    position: absolute;
                    right: 10%;
                    top: -1px;
                    vertical-align: top;
                    height: 38px;
                    line-height: 36px;
                    width: 30%;
                    max-width: 90px;
                    color: #FEFEFF;
                    background-color: #003D9E;
                    font-size: 14px;
                    text-align: center;
                    border-radius: 0 4px 4px 0;
                }
            }

            .lan {
                display: inline-block;
                vertical-align: middle;
                font-size: 14px;
                color: black;
                margin-top: 26px;
                margin-left: 30px;
                margin-right: -15px;
            }
        }

        @media screen and (max-width: $width-mobile) {
            .headerbox {
                .logo {

                    margin-left: 0;

                    .pclogo {
                        display: none;
                    }

                    .mblogo {
                        display: block;
                        height: 38px;
                    }
                }

                .lan {
                    margin-right: 0;
                    margin-left: 0;
                }
            }
        }
    }
</style>
