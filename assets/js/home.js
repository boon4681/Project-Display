let b = new boon();
let o = new b.events();
let y = new b.events();
let h = new b.create.handler.http("https://raw.githubusercontent.com/boon4681/data/master/pages/datapack/code_view.json")
o.add(
    b.create.window("load",function(){
        h.get((e)=>{
            if(e!="ERROR"){
                let data = JSON.parse(e)
                let keys = Object.keys(data);
                let d = b.get(document,".list")[0]
                for (let i = 0; i < keys.length; i++) {
                    const element = keys[i];
                    let div = document.createElement("div")
                    div.innerHTML += '<div class="head"><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m21.25 24h-17.5c-1.517 0-2.75-1.233-2.75-2.75v-18.5c0-1.517 1.233-2.75 2.75-2.75h15.5c.414 0 .75.336.75.75v3.25h1.25c.414 0 .75.336.75.75v18.5c0 .414-.336.75-.75.75zm-18.75-18.801v16.051c0 .689.561 1.25 1.25 1.25h16.75v-17h-16.75c-.45 0-.875-.108-1.25-.301zm1.25-3.699c-.689 0-1.25.561-1.25 1.25s.561 1.25 1.25 1.25h14.75v-2.5z"/><path fill="currentColor" d="m12.25 19c-.137 0-.272-.037-.394-.111l-2.856-1.758-2.856 1.758c-.232.143-.521.148-.76.016-.238-.133-.384-.384-.384-.655v-13.5h1.5v12.158l2.106-1.296c.242-.148.545-.148.787 0l2.106 1.296v-12.158h1.501v13.5c0 .271-.146.522-.384.655-.114.063-.24.095-.366.095z"/></svg></span><span class="text" path="'+element+'">'+element+'</span></div>'
                    div.innerHTML += '<div class="end"><span class="circle"></span><span>'+data[element]+'</span></div>'
                    d.appendChild(div)
                }
                if(keys.length>4){
                    d.classList.remove("bottom-200px")
                }
                y.add(
                    b.create.listener("[path]","click",function(e,s){
                        window.location.href = "code.html"+"?project="+b.attr(s,"path")
                    })
                )
                y.run()
            }else{
                k.get(document,"body")[0].innerHTML = "<div class=\"center f-100\">NETWORK ERROR</div>"
            }
        })
    }),
    b.create.listener("[link]","click",function(e,s){
        window.location.href = b.attr(s,"link")
    })
)
o.run()