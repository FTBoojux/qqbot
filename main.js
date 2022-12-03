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
    }else if(text === '[CQ:image,file=d2a61f1cd5af2d5a53fc6a08119658f9.image,subType=1,url=https://gchat.qpic.cn/gchatpic_new/1049595786/659978686-3173809172-D2A61F1CD5AF2D5A53FC6A08119658F9/0?term=3]'){
        let qq = context.context.sender.user_id
        console.log("banned:"+context.context.sender.nickname)
        auto_talk.banByQQ(qq)
    }
    // console.log(dict.get(context.context.message))
    const s = util.lookupdict(context.context.message);
    console.log("lookup:"+s)
    let mes = context.context.message
    let check = mes.substring(0,6)
    let input = mes.substring(7)
    console.log('check',check);
    if(s){
        auto_talk.autoReply(s,context.context.group_id)
    }else if(check === '/小恋-设置'){
        console.log(`设置关键词:${input}`);
        let pos = input.indexOf(' ')
        let key = input.substring(0,pos)
        let word = input.substring(pos+1)
        let cqCode = word.substring(6,11)
        console.log(`cqCode:${cqCode}`);
        if(cqCode === 'image'){
            let start = word.indexOf('url')
            word = word.substring(start+4)
            let end = word.indexOf('&')
            word = word.substring(0,)
            // [CQ:image,file=${dirname}pia.jpg
            word = `[CQ:image,file=1,url=${word}]`
        }
        console.log(`key:${key}`);
        console.log(`word:${word}`);
        util.setReply(key,word,context.context.group_id)
    }else if(check === '/小恋-移除'){
        let pos = input.indexOf(' ')
        // let key = input.substring(0,pos)
        console.log(`移除key:${input}`);
        util.remove(input)
        auto_talk.autoReply('已移除',context.context.group_id)
    }else{
        console.log('redis check');
        util.getCustomized(mes,context.context.group_id)
    }
    // else if(text === '抽轻型池'){
    //     let qq = context.context.sender.user_id
    //     let res = `[CQ:at,qq=${qq}] 你的抽卡结果是---\r\n`
    //     for(let i = 0;i<10;i++){
    //         let chouka = util.chouka(1);
    //         res +=chouka
    //     }
    //     auto_talk.autoReply(res)
    // }else if(text === '抽重型池'){
    //     let qq = context.context.sender.user_id
    //     let res = `[CQ:at,qq=${qq}] 你的抽卡结果是---\r\n`
    //     for(let i = 0;i<10;i++){
    //         let chouka = util.chouka(2);
    //         res +=chouka
    //     }
    //     auto_talk.autoReply(res)
    // }else if(text === '抽特型池'){
    //     let qq = context.context.sender.user_id
    //     let res = `[CQ:at,qq=${qq}] 你的抽卡结果是---\r\n`
    //     for(let i = 0;i<10;i++){
    //         let chouka = util.chouka(3);
    //         res +=chouka
    //     }
    //     auto_talk.autoReply(res)
    // }
})
bot.on('socket.open',context=>{
    console.log('open')
})
bot.connect()