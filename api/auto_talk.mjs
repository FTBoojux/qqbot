import axios from "axios";
const baseurl = 'http://127.0.0.1:5700'
// axios.create({
//     baseURL:'http://127.0.0.1:5700',
//     timeout:15000
// })
export default {
    autoReply(word,qq){
        console.log(word)
        let msg = ``
        if(qq) msg = `[CQ:at,qq=${qq}] `
        const url = `${baseurl}/send_group_msg?group_id=659978686&message=${msg}${encodeURI(word)}`
        axios
            .get(url)
            .then(res=>{})
            .catch(err=>{
                console.log(err)
            })
    },
    maren(qq){
        const url = `${baseurl}/send_group_msg?group_id=659978686&message=[CQ:at,qq=${qq}] ${encodeURI("敲你妈")}`
        axios.get(url)
            .then(r=>{})
            .catch(err=>{
                console.log(err)
            })
    },
    banByQQ(qq){
        const url = `${baseurl}//set_group_ban?group_id=659978686&user_id = ${qq}&duration=600}`
        axios
            .get(url)
            .then(r=>{})
            .catch(err=>{
                console.log(err)
            })
    }
}