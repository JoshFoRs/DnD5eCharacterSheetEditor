var inputs = checkContent('input','name','attr_',false)
var inVal = []
for(var i=0;i<inputs.length;i++){
    inVal[i] =  inputs[i].value
}

var checks = checkContent('input','type','checkbox')
var isCheck = []
for(var i=0;i<checks.length;i++){
    isCheck[i] =  checks[i].checked
}

var test = [];
setTimeout(function(){
var dom = checkContent("div",'id','tab-content')[0].outerHTML
test[0] = dom;
var styles = checkContent('style','title','charsheet')[0].outerHTML
test[1] = styles
test[2] = inVal
test[3] = isCheck
},1000)

var win = window.open("https://dnd-5e-character-sheet-editor.glitch.me/", '_blank');    
setTimeout(function(){
win.postMessage(test,"*")
},1000)






function checkContent(e, t, n, a=!0, r=null) {
    if ("class" == t) {
        if (null != r)
            var l = r.contentDocument.getElementsByTagName(e);
        else
            var l = document.getElementsByTagName(e);
        for (var g = [], h = 0; h < l.length; h++)
            try {
                for (var s = l[h].classList, m = 0; m < s.length; m++)
                    a ? s[m] == n && g.push(l[h]) : s[m].includes(n) && g.push(l[h])
            } catch {}
        if (null == r) {
            for (var u = [], c = 0; c < document.getElementsByTagName("iframe").length; c++)
                try {
                    u[u.length] = checkContent(e, t, n, a, document.getElementsByTagName("iframe")[c])
                } catch (f) {}
            for (var o = 0; o < u.length; o++)
                for (var h = 0; h < u[o].length; h++)
                    g.push(u[o][h])
        }
        return g
    }
    var i = [];
    if (null != r)
        var v = r.contentDocument.getElementsByTagName(e);
    else
        var v = document.getElementsByTagName(e);
    for (var o = 0; o < v.length; o++)
        (v[o].hasAttribute(t) || "" == t) && (a ? (v[o].getAttribute(t) == n || "" == t) && i.push(v[o]) : "" == t ? i.push(v[o]) : v[o].getAttribute(t).includes(n) && i.push(v[o]));
    if (null == r) {
        for (var u = [], c = 0; c < document.getElementsByTagName("iframe").length; c++)
            try {
                u[u.length] = checkContent(e, t, n, a, document.getElementsByTagName("iframe")[c])
            } catch {}
        for (var o = 0; o < u.length; o++)
            for (var h = 0; h < u[o].length; h++)
                i.push(u[o][h])
    }
    return i
}
