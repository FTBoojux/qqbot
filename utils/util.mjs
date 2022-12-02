import path from 'path'
import { createClient } from 'redis';
import auto_talk from '../api/auto_talk.mjs';
const redisClient = createClient(6380,'127.0.0.1')
const __dirname = path.resolve().replaceAll("\\","/")
const dirname = "file:///"+__dirname+"/assets/pic/"
const dir_audio = "file:///"+__dirname+"/assets/audio/"
const word_dict = new Map([
    ['早上好',['早上好~',`[CQ:image,file=${dirname}gdmn.jpg]`]],
    ['中午好',['中午好喵~','吃饭时间到了喵~']],
    ['下午好',['下午好喵~']],
    ['晚上好',[`[CQ:image,file=${dirname}gdevn.jpg]`,
        `[CQ:image,file=${dirname}gdevn2.jpg]`,
        `[CQ:image,file=${dirname}sleep.png]`
    ]],
    ['贴贴',['不要贴贴，不要贴贴，贴贴危险，会变密接',]],
    ['小恋贴贴',[`[CQ:image,file=${dirname}tietie.jpg]`,
        `[CQ:image,file=${dirname}tietie2.jpg]`
    ]],
    ['抽我',[`[CQ:image,file=${dirname}pia.jpg]`]],
    ['抽诚老板',[`[CQ:image,file=${dirname}pia.jpg]`]],
    ['我好菜',[`[CQ:image,file=${dirname}chaofen.jpg]`]],
    ['摸鱼',[`[CQ:image,file=${dirname}donttf.jpg]`]],
    ['[CQ:face,id=285]',[`[CQ:image,file=${dirname}donttf.jpg]`]],
    ['给我点赞',[`[CQ:image,file=${dirname}givemelike.gif]`]],
    ['好家伙',['[CQ:image,file=37a2f4da54394cbfd2e7423bb1e0fd76.image,subType=7,url=https://gchat.qpic.cn/gchatpic_new/3343774878/659978686-2555895331-37A2F4DA54394CBFD2E7423BB1E0FD76/0?term=3]'
        ,`[CQ:image,file=${dirname}hjh.gif]`]],
    ['[CQ:at,qq=1394541281] 自爆',[`[CQ:image,file=${dirname}zibao.jpg]`]],
    ['[CQ:at,qq=1394541281] 跳舞',[`[CQ:image,file=${dirname}dance.gif]`]],
    ['[CQ:at,qq=1394541281] 抱抱',[`[CQ:image,file=${dirname}dishp.jpg]`]],
    ['笨蛋机器人',[`💔`,
        `[CQ:image,file=${dirname}gokill.gif]`,
        `[CQ:record,file=${dir_audio}wulusai-v2.mp3]`,
        `[CQ:image,file=${dirname}cry.jpg]`,
    ]]

])
const reg_dict = new Map([
    [/^想要(天雷|彩)+/,[`[CQ:image,file=${dirname}nocai.jpg]`]],
    [/^(爬|爪巴)/,[`[CQ:image,file=87c153389336846cad77f0b61c8c80bd.image,subType=1,url=https://gchat.qpic.cn/gchatpic_new/3343774878/659978686-2280177252-87C153389336846CAD77F0B61C8C80BD/0?term=3]`]],
    [/^(\?|？)/,[`[CQ:image,file=${dirname}wenhao.jpg]`,
        `[CQ:image,file=${dirname}wenhao2.jpg]`
    ]],
    [/^可恶/,[`[CQ:image,file=${dirname}kewu.jpg]`]],
    [/^(牛(啊|哇|蛙))|厉害/,[`[CQ:image,file=${dirname}niua.jpg]`]],
    [/(去你妈|qnm|cnm)/,[`[CQ:image,file=${dirname}qnmd.jpg]`]],
    [/(难过|不开心)/,[`[CQ:image,file=${dirname}nanguo.jpg]`,`[CQ:image,file=${dirname}bao.gif]`]],
    [/^[1-9]$/,['1','2','3','4','5','6','7','8','9']],
    [/^\[CQ:at,qq=1394541281] 摸(摸|头)/,[`[CQ:image,file=${dirname}dishp2.png]`,
        `[CQ:image,file=${dirname}dishp3.jpg]`,
        `[CQ:image,file=${dirname}dishp4.jpg]`,
        `[CQ:record,file=${dir_audio}nya.mp3]`
    ]],
    [/^\[CQ:at,qq=1394541281] (吃我一拳|给你一拳)/,[`[CQ:image,file=${dirname}ez.jpg]`]],
    [/^爱你/,[`[CQ:image,file=${dirname}love.jpg]`,
        `[CQ:image,file=${dirname}haixiu.jpg]`,
        `[CQ:image,file=${dirname}haixiu2.png]`
    ]]
])
// file:///F:/myCode/frontend/qqbot/assets/donttf.jpg
const lightPoor = [
    ["圣地亚哥‌","蒙彼利埃‌","黛朵‌","确捷‌","雪风","奸商","Z46‌","阿芙乐尔‌","凯旋‌","恶毒‌","茳江风","艾伦·萨姆纳"],
    ["莫里‌","马拉尼‌","拉菲‌","圣路易斯‌","小海伦娜‌","丹佛‌","小克利夫兰‌","比洛克西‌","克利夫兰(μ兵装)","标枪‌","无敌‌","欧若拉‌","谢菲尔德‌","格罗斯特‌","小贝法‌","黑太子‌","桐‌","柚‌","猨‌","狻‌","Z23","长春‌","太原‌","逸仙‌","桸‌","楛‌","榵‌","苌‌","文琴佐·焦","贝蒂‌","应瑞‌","肇和‌","佩内洛珀‌","史蒂芬·波特‌","伯明翰"],
    ["哈曼‌","弗莱彻‌","贝奇‌","金伯利‌","斯坦利‌","斯莫利‌","哈尔西·鲍威尔‌","霍比‌","科尔克‌","康克德‌","布鲁克林‌","菲尼克斯‌","亚特兰大‌","朱诺‌","女将‌","阿卡司塔‌","热心‌","丘比特‌","泽西‌","库拉索‌","杓鹬‌","阿基里斯‌","阿贾克斯‌","南安普顿‌","格拉斯哥‌","牙买加‌","榊‌","棡‌","樋‌","梅‌","楉‌","棭‌","荙‌","槆‌","柉‌","栭‌","Z19","棈‌","莱比锡‌","福尔班‌","勒马尔‌","橗‌","棹‌","樇‌","豻"],
    ["卡辛","唐斯","克雷文","麦考尔","富特","斯彭斯","奥利克","奥马哈","罗利","小猎兔犬‌","大斗犬‌","彗星‌","新月‌","小天鹅‌","狐提‌","利安得‌","睦月","如月","卯月","长良","柯尼斯堡","卡尔斯鲁厄","科隆"]
]
const weightPoor = [
    ["明尼阿波利斯‌","北卡罗来纳‌","华盛顿‌","胡德‌","厌战‌","高雄","欧根亲王‌","让·巴尔‌","马萨诸塞‌","长萌","天城","加贺BB‌","土佐","俾斯麦‌","英王乔治五世‌","加斯科涅(μ兵装)‌","波拉‌","扎拉‌","利托里奥‌","巴尔的摩‌","阿拉巴马"],
    ["休斯敦‌","印第安纳波利斯‌","亚利桑那‌","伦敦‌","多塞特郡‌","约克‌","足柄","声望‌","伊丽莎白女王‌","纳尔逊‌","黑暗界‌","恐怖‌","阿贝克隆比‌","雾岛","德意志‌","希佩尔海军上将‌","希佩尔海军上将(μ兵装)‌","小比叡","敦刻尔克‌","铃谷","比叡","朱利奥·凯撒"],
    ["北安普敦","芝加哥","宾夕法尼亚","田纳西","加利福尼亚","什罗普郡","苏塞克斯","肯特","萨福克","诺福克","反击","伊势"],
    ["彭萨科拉","内华达","俄克拉荷马","青叶","衣笠"]
]
const specialPoor = [
    ["企业","埃塞克斯","半人马","胜利","翔鹤","瑞鹤","伊19","明石","U-81","U-47","U-101","伊168","香格里拉","伊13","U-96","赤城(μ兵装)","可畏"],
    ["休斯敦‌","印第安纳波利斯‌","列克星敦‌","萨拉托加‌","约克城‌","大黄蜂‌","女灶神‌","伦敦‌","多塞特郡‌","独角兽‌","追赶者‌","光荣‌","伊29","伊58","U-557‌","小赤城","小齐柏林‌","絮库夫‌","伊25","U-522","伊56","U-556‌","U-73"],
    ["北安普敦","芝加哥","长岛","什罗普郡","肯特","萨福克","诺福克"],
    ["彭萨科拉","博格","兰利","突击者","竞技神"]
]
export default {
    lookupdict(keyword){
        const words = word_dict.get(keyword);
        if(words){
            return  words[Math.floor(Math.random()*words.length)]
        }
        for(let key of reg_dict.keys()){
            // if(keyword.match(key)){
            //     return reg_dict.get(key)
            // }
            if(key.exec(keyword)){
                return reg_dict.get(key)[randint(0,reg_dict.get(key).length)]
            }
        }
    },
    setReply(key,word){
        console.log(`${key}:${word}`);
        redisClient.set(key,word)
        auto_talk.autoReply('成功喵')
    },
    getCustomized(key){
        redisClient.get(key,(err,value)=>{
            if(err){
                console.log(err);
            }else{
                return value
            }
        })
    },
    chouka(type){
            const number = randint(0,100);
        if(type === 1){
            // let res = ''
            if(number >=0 && number < 7){
                return "ssr:" + lightPoor[0][randint(0,lightPoor[0].length)] + "\r\n"
            }else if(number >=7 && number < 19 ){
                return "sr:" + lightPoor[1][randint(0,lightPoor[1].length)] + "\r\n"
            }else if(number >= 19 && number < 45){
                return "r:" + lightPoor[2][randint(0,lightPoor[2].length)] + "\r\n"
            }else{
                return "n:" + lightPoor[3][randint(0,lightPoor[3].length)] + "\r\n"
            }
        }else if(type === 2){
            // const number = randint(0,100);
            // let res = ''
            if(number >=0 && number < 7){
                return "ssr:" + weightPoor[0][randint(0,weightPoor[0].length)] + "\r\n"
            }else if(number >=7 && number < 19 ){
                return "sr:" + weightPoor[1][randint(0,weightPoor[1].length)] + "\r\n"
            }else if(number >= 19 && number < 70){
                return "r:" + weightPoor[2][randint(0,weightPoor[2].length)] + "\r\n"
            }else{
                return "n:" + weightPoor[3][randint(0,weightPoor[3].length)] + "\r\n"
            }
        }else if(type === 3){
            if(number >=0 && number < 7){
                return "ssr:" + specialPoor[0][randint(0,specialPoor[0].length)] + "\r\n"
            }else if(number >=7 && number < 19 ){
                return "sr:" + specialPoor[1][randint(0,specialPoor[1].length)] + "\r\n"
            }else if(number >= 19 && number < 70){
                return "r:" + specialPoor[2][randint(0,specialPoor[2].length)] + "\r\n"
            }else{
                return "n:" + specialPoor[3][randint(0,specialPoor[3].length)] + "\r\n"
            }
        }
    }
}

function randint(min,max){
    return Math.floor(Math.random()*max+min)
}