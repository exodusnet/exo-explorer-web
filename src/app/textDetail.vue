<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <div class="index ">
        <div class="ttDetail_block container">
            <div class="title">
                <div class="word">
                    <span class="word1 color2">{{$t('text.TEXT')}}</span>
                    <span class="word2 color3">#{{pageData.hash}}</span>
                </div>
                <a href="javascript:;" class="copy"
                        v-clipboard:copy="pageData.hash"
                        v-clipboard:success="onCopy">
                    <img src="@/assets/img/copy.png" alt="">
                    <div class="copymsg" v-show="isCopy">
                        <span class="colorfff">{{$t('last.Copied')}}</span>
                    </div>
                </a>
            </div>
            <div class="cont">
                <div class="item">
                    <p class="conttitle color9"><span>{{$t('text.Status')}}：</span></p>
                    <p class="text color3">{{pageData.result =='good' ? $t('text.Confirmed'): $t('text.Unconfirmed')}}</p>
                </div>
                <div class="item">
                    <p class="conttitle color9"><span>{{$t('snapshot.Time')}}：</span></p>
                    <p class="text color3">{{pageData.creation_date | fomatTime}} ({{pageData.creation_date | parseTime}})</p>
                </div>
                <div class="item">
                    <p class="conttitle color9"><span>{{$t('text.From')}}：</span></p>
                    <p class="text color3">
                        <a href="javascript:;" class="color3" @click="goToAddress(pageData.addressFrom)">{{pageData.addressFrom}}</a>
                    </p>
                </div>
                <!--<div class="item">-->
                    <!--<p class="conttitle color9"><span>{{$t('text.To')}}：</span></p>-->
                    <!--<p class="text color3">-->
                        <!--<a href="javascript:;" class="color3" @click="goToAddress(pageData.toAddress)">{{pageData.toAddress}}</a>-->
                    <!--</p>-->
                <!--</div>-->
                <div class="item">
                    <p class="conttitle color9"><span>{{$t('text.Text')}}：</span></p>
                    <p class="text color3">{{pageData.context}}</p>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    let Base64 = require('js-base64').Base64;
export default {
    data: function() {
        return {
            pageData:{
                hash:""
            },
            isCopy:false,
            isShowing:null
        }
    },
    methods: {
        onCopy(e){
            this.isCopy = true;
            clearTimeout(this.isShowing);
            this.isShowing = setTimeout(()=>{
                this.isCopy = false;
            },1500)
        },
        getData(hash){
            let formdata = new FormData();
            formdata.append("hash", hash);
            this.axios.post('messagesinfo', formdata).then((res) => {
                 console.log(JSON.parse(res.data.data.message).message);
                let data = Base64.decode(JSON.parse(JSON.parse(res.data.data.message).message).context).toString();
                // this.dataList = res.data.page.list;
                if (res.data.code == 200) {

                   this.pageData = res.data.data;
                    console.log(this.pageData)
                    this.pageData.context = data;
                }

            })
        },
        goToDetail(type, hash) {
            if (type == 1) {
                this.$router.push({
                    path: "/deal",
                    query: {
                        hash: hash
                    }
                })
            }
            if (type == 2) {
                this.$router.push({
                    path: "/treaty",
                    query: {
                        hash: hash
                    }
                })
            }
            if (type == 3) {
                this.$router.push({
                    path: "/snapshot",
                    query: {
                        hash: hash
                    }
                })
            }
            if (type == 4) {
                this.$router.push({
                    path: "/text",
                    query: {
                        hash: hash
                    }
                })
            }
        },
        goToAddress(addr){
            this.$router.push({
                path: "/account",
                query: {
                    addr: addr
                }
            })
        }
    },
    created: function() {

    },
    mounted: function() {
        this.getData(this.$route.query.hash);
    },
    beforeRouteLeave(to, from, next) {
        next()
    }
}
</script>
<style scoped lang="scss">
$width-mobile: 768px; // 移动端适配宽度
.ttDetail_block {
    font-size: 20px;
    margin-top: 20px;
    padding: 25px 36px 40px;
    background-color: #fff;
    .title {
        padding-bottom: 1em;
        .word {
            display: inline-block;
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .word1 {
                font-size: 16px;
            }
            .word2 {
                font-size: 14px;
            }
        }
        .copy {
            display: inline-block;
            position: relative;
            img {
                vertical-align: text-top;
            }
            .copymsg{
                position: absolute;
                font-size: 12px;
                text-align: center;
                width:112px;
                padding:11px 0;
                background-color: rgba(0,0,0,.6);
                border-radius: 4px;
                left:-45px;
                &:before{
                    content:' ';
                    position: absolute;
                    width:0;
                    height: 0;
                    top:-14px;
                    left:45px;
                    border-top:7px solid transparent;
                      border-bottom:7px solid rgba(0,0,0,.6);
                      border-right:7px solid transparent;
                      border-left:7px solid transparent;

                }
            }
        }
    }
    .cont {
        border-top: 1px solid #F0F5FF;
        padding-top: 1.45em;
        .item {
            vertical-align: top;
            & * {
                display: inline-block;
            }
            .conttitle {
                width: 80px;
                font-size: 14px;
                text-align: left;
            }
            .text {
                word-break: break-all;
                font-size: 12px;
                text-align: left;

            }
        }
    }
    @media screen and (max-width: $width-mobile) {
        .cont{
            .item{
                .text{
                    width: 65%;
                }
            }
        }
    }
}
</style>
