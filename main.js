import axios from "axios";
import {CQWebSocket} from "go-cqwebsocket";
import util from "./utils/util.mjs";
import auto_talk from "./api/auto_talk.mjs";
let bot = new CQWebSocket()
const dirname = "file:///F:/myCode/frontend/qqbot/assets/"

axios.create({
    baseURL:'http://127.0.0.1:5700',
    timeout:15000
})

bot.on('message.group',(context)=>{
    // console.log(context)
    // console.log(context.context)
    // const {context} = context.context
    const text = context.context.message
    console.log(text)
    // if(text === '1'){
    //     axios.get(`http://localhost:5700/send_group_msg?group_id=659978686&message=[CQ:at,qq=3077835709] ${encodeURI('诚老板别狗叫') }`)
    //         .then(r => {})
    //         .catch(err=>console.log(err))
    // }
    if(text === '骂我' ){
        auto_talk.maren(context.context.sender.user_id)
    }else if(text === '抽轻型池'){
        let qq = context.context.sender.user_id
        let res = `[CQ:at,qq=${qq}] 你的抽卡结果是---\r\n`
        for(let i = 0;i<10;i++){
            let chouka = util.chouka(1);
            res +=chouka
        }
        auto_talk.autoReply(res)
    }else if(text === '抽重型池'){
        let qq = context.context.sender.user_id
        let res = `[CQ:at,qq=${qq}] 你的抽卡结果是---\r\n`
        for(let i = 0;i<10;i++){
            let chouka = util.chouka(2);
            res +=chouka
        }
        auto_talk.autoReply(res)
    }else if(text === '抽特型池'){
        let qq = context.context.sender.user_id
        let res = `[CQ:at,qq=${qq}] 你的抽卡结果是---\r\n`
        for(let i = 0;i<10;i++){
            let chouka = util.chouka(3);
            res +=chouka
        }
        auto_talk.autoReply(res)
    }else if(text === '[CQ:image,file=d2a61f1cd5af2d5a53fc6a08119658f9.image,subType=1,url=https://gchat.qpic.cn/gchatpic_new/1049595786/659978686-3173809172-D2A61F1CD5AF2D5A53FC6A08119658F9/0?term=3]'){
        let qq = context.context.sender.user_id
        console.log("banned:"+context.context.sender.nickname)
        auto_talk.banByQQ(qq)
    }
    // console.log(dict.get(context.context.message))
    const s = util.lookupdict(context.context.message);
    console.log("lookup:"+s)
    if(s) auto_talk.autoReply(s)

})
bot.on('socket.open',context=>{
    console.log('open')
})
bot.connect()