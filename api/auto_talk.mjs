import axios from "axios";
const baseurl = 'http://127.0.0.1:5700'
// axios.create({
//     baseURL:'http://127.0.0.1:5700',
//     timeout:15000
// })
const OPENAI_API_KEY = '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';

let request = {
    method: 'POST',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    data: {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Hello!"}]
    }
};
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
        request.data.messages[0].content = content;
        axios(request)
            .then(response => {
                const content = response.data.choices[0].message.content;
                this.autoReply(content,group,qq)
            })
            .catch(error => console.error(error));
    }
}
