let b = new boon();
let h = new b.create.handler.http("https://raw.githubusercontent.com/boon4681/data/master/database/datapack/"+b.getQ().project+".bmc")
let token = new b.token();
let token1 = new b.token();
let token2 = new b.token();
let token3 = new b.token();
token1.add(token.make("BRACKET",/[\[}{\]()]*[\[}{\]()]/),token.make("SYMBOLS",/[+*\\|:;.,=<>&^%$!_~()-]/),token.make("CHAR",/[A-Za-z@/"'#]/),token.make("DIGIT",/[0-9]/),token.make("NEWLINE",/\n/),token.make("SPACE",/\s/g),token.make("unknown",null))
token2.add(token.make("ENTITIES",/@a|@r|@s|@e|@p/i),token.make("MAIN",/advancement|bossbar|clear|clone|data|datapack|debug|defaultgamemode|difficulty|effect|enchant|execute|fill|function|gamemode|gamerule|give|help|kick|kill|list|locate|loot|me|msg|tell|particle|playsound|recipe|reload|replaceitem|say|schedule|scoreboard|seed|setblock|setworldspawn|spawnpoint|spectate|spreadplayers|stopsound|summon|tag|team|teleport|tp|tellraw|time|trigger|weather|worldborder|experience|xp|\.\./g),token.make("SUBFUNC",/if|store|score|entity|run|objects|as|at|get|players|storage|success|result|set/i),token.make("EQUAL",/=|>|</),token.make("BRACKET",/[\[}{\]()]*[\[}{\]()]|[\[}{\]()]/),token.make("NUMBER",/[0-9]/),token.make("NEWLINE",/\n/),token.make("SPACE",/\s/g),token.make("TEXT",/|/))
token3.add(token.make("START",/###/),token.make("STOP",/##STOP##/),token.make("MORE",/#@#/),token.make("TEXT",/|/))
async function makeZIP(a){
    var zip = new JSZip();
    for (let i = 0; i < a.length; i++) {
        if(a[i].path!=undefined){
            zip.file(a[i].path, a[i].value);
        }
    }
    let name = ""
    for (let i = 0; i < a.length; i++) {
        const e = a[i];
        if(e.HEAD=="PROJECT"){
            name = e.value
        }
    }
    if(name==""){
        for (let i = 0; i < a.length; i++) {
            const e = a[i];
            if(e.path!=undefined){
                name = e.path.split("/")[0]
                break
            }
        }
    }
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, name+' by boon4681.zip');
}
let o = new b.events();
let y = new b.events();
o.add(
    b.create.window("load",function(){
        if(b.getQ().project==undefined){
            window.location.href = "404.html"
        }
        h.get(
            function(e,status){
                if(e!="ERROR"){
                    let data = e
                    let w = b.mmp(b.cmp(b.lexer2(b.lexer1(data,token1.value),token3.value)))
                    let uudatazip = w
                    let path = b.jsonMake(w)
                    if(b.getQ().path != undefined){
                        let json = new b.pathJSON(path);
                        json.put("DATA",b.getQ().path)
                        if(json.run().DATA==null){
                            window.location.href="404.html"
                        }
                        if(Array.isArray(json.run().DATA)){
                            b.get(document,"#code-header")[0].innerHTML=json.run().DATA[0].data.split("\n").length-1 + " lines<p></p>" + b.getQ().path.split("/").reverse()[0]
                            b.render.code("code",b.cmp(b.lexer2(b.lexer1(json.run().DATA[0].data,token1.value),token2.value)))
                        }else{
                            b.render.folder("code",json.run().DATA,b.getQ().path)
                            let name = ""
                            for (let i = 0; i < w.length; i++) {
                                const e = w[i];
                                if(e.HEAD=="PROJECT"){
                                    name = e.value
                                }
                            }
                            if(name==""){
                                for (let i = 0; i < w.length; i++) {
                                    const e = w[i];
                                    if(e.path!=undefined){
                                        name = e.path.split("/")[0]
                                        break
                                    }
                                }
                            }
                            b.get(document,"#code-header")[0].innerHTML=name
                        }
                        let r = []
                        let m =  b.getQ().path.split("/")
                        for (let i = 0; i < m.length; i++) {
                            const element = m[i];
                            if(element!=""){
                                r.push(element)
                            }
                        }
                        let link = ""
                        for (let i = 0; i < r.length; i++) {
                            link+=r[i]+"/"
                            const element = r[i];
                            if(element=="") continue
                            if(r.length-i-1<=3){
                                if(!(r.length-i-1<1)){
                                    b.get(document,"#urlpath")[0].innerHTML+= "/"+'<span class="wspan" path="'+link+'">'+element+'</span>'
                                }else{
                                    b.get(document,"#urlpath")[0].innerHTML+= "/"+'<span>'+element+'</span>'
                                }
                            }
                            if(element==undefined) break
                        }
                    }else{
                        let keys = Object.keys(path);
                        let json = new b.pathJSON(path);
                        json.put("DATA",keys[0])
                        if(json.run().DATA==null){
                            window.location.href="404.html"
                        }
                        let name = ""
                        for (let i = 0; i < w.length; i++) {
                            const e = w[i];
                            if(e.HEAD=="PROJECT"){
                                name = e.value
                            }
                        }
                        if(name==""){
                            for (let i = 0; i < w.length; i++) {
                                const e = w[i];
                                if(e.path!=undefined){
                                    name = e.path.split("/")[0]
                                    break
                                }
                            }
                        }
                        window.location.search = "?project="+b.getQ().project+"&path="+keys[0]
                    }
                    let not = [true,true]
                    for (let i = 0; i < w.length; i++) {
                        const e = w[i];
                        if(e.HEAD=="PROJECT"){
                            b.get(b.get(document,".top-center-inner")[0],".a2")[0].innerHTML = e.value
                            not[0] = false
                        }
                        if(e.HEAD == "VERSIONS"){
                            b.get(b.get(document,".version-selector")[0],".version")[0].innerHTML = e.value
                            not[1] = false
                        }
                    }
                    if(not[0]==true){
                        b.get(b.get(document,".version-selector")[0],".version")[0].innerText = "Not Found"
                    }
                    if(not[1]==true){
                        for (let i = 0; i < w.length; i++) {
                            const e = w[i];
                            if(e.path!=undefined){
                                b.get(b.get(document,".top-center-inner")[0],".a2")[0].innerHTML = '<span class="wspan" path="'+e.path.split("/")[0]+'">'+e.path.split("/")[0]+'</span>'
                                break
                            }
                        }
                    }
                    y.add(
                        b.create.event("smepls","mousemove",function(e,s){
                            b.forMe(b.get(document,"[event=smepls]"),function(x){
                                if(x!=s){
                                    x.classList.remove("active")
                                }else{
                                    s.classList.add("active")
                                }
                            })
                        }),
                        b.create.listener("[path]","click",function(e,s){
                            window.location.search = "?project="+b.getQ().project+"&path="+b.attr(s,"path")
                        }),
                        b.create.listener("[link]","click",function(e,s){
                            window.location.href = b.attr(s,"link")
                        }),
                        b.create.listener("#download","click",function(){
                            makeZIP(uudatazip)
                        })
                    )
                    y.run()
                }
                if(e=="ERROR" && status!=404){
                    k.get(document,"body")[0].innerHTML = "<div class=\"center f-100\">NETWORK ERROR</div>"
                }
                if(status==404){
                    window.location.href = "404.html"
                }
            }
        )
    })
)
o.run()