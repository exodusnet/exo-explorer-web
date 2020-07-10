<template>
    <div class="message_block container">
        <div class="title clearfix">
            <img src="@/assets/img/message.png" alt="">
            <span class="word color2">{{$t('message.Message')}}</span>
            <div class="select">
                <a href="javascript:;" class="item" :class="{active:item.type==currentType}" v-for="item in types" @click="changeType(item.type)">
                    {{$t(item.name)}}
                </a>
            </div>
        </div>
        <div class="cont clearfix">
            <div v-for="(unit,index) in dataList">
                <div class="item jy container" v-if="unit.type == 1">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="word">
                                <img src="@/assets/img/jy.png" alt="">
                                <a href="javascript:;" class="color3" @click="goToDetail(unit.type,unit.hash)">{{unit.hash}}</a>
                            </div>
                            <div class="sub clearfix">
                                <div class="subitem left">
                                    <span class="color9">{{$t('message.From')}}：</span>
                                    <a href="javascript:;" class="color306" @click="goToAddress(unit.addressFrom)">{{unit.addressFrom}}</a>
                                </div>
                                <div class="subitem right">
                                    <span class="color9">{{$t('message.To')}}：</span>
                                    <a href="javascript:;" class="color306" @click="goToAddress(unit.addressTo)">{{unit.addressTo}}</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="rightbox">
                                <div class="time colorA8B">
                                    <span>{{Number(unit.creation_date) | fomatTime}}</span>
                                </div>
                                <div class="money">
                                    <span class="color9 s">{{$t('message.Amount')}}：</span>
                                    <span>{{unit.amount }} </span>
                                    <span class="color9 s">EXO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item hy container" v-if="unit.type == 2">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="word">
                                <img src="@/assets/img/hy.png" alt="">
                                <a href="javascript:;" class="color3" @click="goToDetail(unit.type,unit.hash)">{{unit.hash}}</a>
                            </div>
                            <div class="sub clearfix">
                                <div class="subitem left">
                                    <span class="color9">{{$t('message.ContractContent')}}：</span>
                                    <span>{{unit.data}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="rightbox">
                                <div class="time colorA8B">
                                    <span>{{Number(unit.creation_date) | fomatTime}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item wb container" v-if="unit.type == 4">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="word">
                                <img src="@/assets/img/wb.png" alt="">
                                <a href="javascript:;" class="color3" @click="goToDetail(unit.type,unit.hash)">{{unit.hash}}</a>
                            </div>
                            <div class="sub clearfix">
                                <div class="subitem left">
                                    <span class="color9">{{$t('message.Contex')}}：</span>
                                    <span>{{deCode(unit.context).toString()}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="rightbox">
                                <div class="time colorA8B">
                                    <span>{{Number(unit.creation_date) | fomatTime}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item kz container" v-if="unit.type == 3">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="word">
                                <img src="@/assets/img/kz.png" alt="">
                                <a href="javascript:;" class="color3" @click="goToDetail(unit.type,unit.hash)">{{unit.hash}}</a>
                            </div>
                            <div class="sub clearfix">
                                <div class="subitem left">
                                    <span class="color9">{{$t('message.SnapshotVersion')}}：</span>
                                    <span>{{unit.snapVersion}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="rightbox">
                                <div class="time colorA8B">
                                    <span>{{Number(unit.creation_date) | fomatTime}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pg">
                <Pagenation v-bind:total="total" v-on:changgPage="pageChange" ref="pg" />
            </div>
        </div>
    </div>
</template>
<script>
import Pagenation from '@/app/components/pagenation.vue'
let Base64 = require('js-base64').Base64;
export default {
    components: {
        Pagenation
    },
    data: function() {
        return {
            types: [{
                    name: 'message.All',
                    type: 0
                },
                {
                    name: 'message.Transaction',
                    type: 1
                },
                {
                    name: 'message.Contract',
                    type: 2
                },
                {
                    name: 'message.Text',
                    type: 4
                },
                {
                    name: 'message.Snapshot',
                    type: 3
                }
            ],
            currentType: 0,
            dataList: [],
            total: 1,
            page: 1,
            pageSize: 10
        }
    },
    methods: {
        pageChange(index) {
            this.page = index;
            this.getData();
        },
        changeType(type) {
            this.currentType = type;
            this.page = 1;
            this.getData(type);
        },
        getData(type = this.currentType) {
            let formdata = new FormData();
            formdata.append("pageSize", this.pageSize);
            formdata.append("page", this.page);
            if (type != 0) {
                formdata.append("type", type);
            }
            this.axios.post('messageslist', formdata).then((res) => {
                // console.log(res.data.page.list)
                this.dataList = res.data.data.list;
                if (res.data.data.list.length == 0) {
                    this.total = 1;
                } else {
                    this.total = res.data.data.totalPage;
                }
            })
        },
        xunhuan() {
            // setTimeout(this.getData,5000);
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
        },
        deCode(context){
            return Base64.decode(context)
        }
    },
    created: function() {

    },
    mounted: function() {
        this.getData();
    },
    beforeRouteLeave(to, from, next) {
        next()
    },

}
</script>
<style scoped lang="scss">
$width-mobile: 768px; // 移动端适配宽度
.message_block {
    font-size: 20px;
    background-color: #fff;
    margin-top: 20px;
    /*height: 142px;*/
    padding: 14px 0 0 0;
    .w20 {
        width: 20%;
    }
    .title {
        padding: 0 60px 0 22px;
        height: 50px;
        border-bottom: 1px solid #F0F5FF;
        img {
            margin-right: .4em;
            display: inline-block;
            transform: translateY(3px);
            vertical-align: baseline;
        }
        .word {
            font-size: 16px;
            margin-right: .7em;
            vertical-align: baseline;
        }
        .select {
            float: right;
            .item {
                &.active,
                &:hover {
                    color: #3065C5;
                    &:before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        top: 41px;
                        background-color: #005AFF;
                    }
                }

                display: inline-block;
                position:relative;
                font-size: 14px;
                color:#808EA7;
                margin-right:1.7em;
            }
            .item:last-child {
                margin-right: 0;
            }
        }
    }
    .cont {
        .item {
            padding: 0 60px 0 22px;
            padding-bottom: 1em;
            padding-top: 1em;
            border-bottom: 1px solid #F0F5FF;
        }

        .word {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            img {
                vertical-align: baseline;
            }
            a {
                font-size: 16px;
            }
            a:hover {
                color: #005AFF;
            }
        }
        .sub {
            font-size: 12px;
            margin-top: 1em;
            .subitem {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                a:hover {
                    color: #005AFF;
                }
            }
        }
        .time {
            font-size: 12px;
            line-height: 28px;
            text-align: right;
        }
        .money {
            margin-top: .5em;
            font-size: 14px;
            line-height: 28px;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .s {
                font-size: 12px;
            }
        }
        .jy {
            border-left: 4px solid #FFD387;
            .sub {
                .subitem {
                    width: 45%;
                }
            }
        }
        .hy {
            border-left: 4px solid #9BDDB5;
        }
        .wb {
            border-left: 4px solid #87DEFF;
        }
        .kz {
            border-left: 4px solid #D2ACFD;
        }
        .pg {
            position: relative;
            height: 110px;
        }
    }
    @media screen and (max-width: $width-mobile) {
        & {
            margin: 20px 10px;
            padding: 8px 0 0 0;
        }
        .w20 {
            width: 50%;
        }
        .title {
            padding: 0 20px 0 20px;
            height: 60px;
            .select {
                float: none;
                .item {
                    &.active,
                    &:hover {
                        &:before {
                            top: 23px;
                        }
                    }
                }
            }
        }
        .cont {
            .item {
                padding: 14px 20px 14px 20px;
                .rightbox {
                    margin-top: 14px;
                }
            }
            .jy {

                .money {
                    margin-top: 0;
                    float: left;
                    text-align: left;
                    width: 65%;
                    /*overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;*/
                }
                .time {
                    float: right;
                    width: 35%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
