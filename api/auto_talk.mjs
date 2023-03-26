import axios from "axios";
import fetch from "node-fetch";
const baseurl = 'http://127.0.0.1:5700'
// axios.create({
//     baseURL:'http://127.0.0.1:5700',
//     timeout:15000
// })
const OPENAI_API_KEY = '';

let request = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    }
};
let body = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
}
export default {
    autoReply(word,group,qq){
        console.log(word)
        let msg = ``
        if(qq) msg = `[CQ:at,qq=${qq}] `
        const url = `${baseurl}/send_group_msg?group_id=${group}&message=${msg}${encodeURI(word)}`
        console.log(`final url : ${url}`);
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
    },
    aiRepley(content,group,qq){
        body.messages[0].content = content;
        request.body = JSON.stringify(body);
        fetch('https://openapi.ssiic.com/v1/chat/completions', request)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // const content = data.choices[0].message.content;
                // this.autoReply(content,group,qq)
            })
            .catch(error => console.error(error));    }
}
