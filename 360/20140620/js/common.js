function _ele(p) {
    var res = null;
    switch(Object.prototype.toString.call(p)) {
        case "[object NodeList]":
        case "[object HTMLCollection]":
            res = Array.prototype.slice.call(p);
            break;
        case "[object String]":
            res = Array.prototype.slice.call(document.querySelectorAll(p));
            break;
    }
    return res;
}

function _toggleClass(node, cname, flag) {
    var className = node.className;
    if (flag) {
        var reg = new RegExp("\\b" + cname + "\\b");
        if (reg.test(className))
            return;
        else {
            if (className == "")
                className += cname;
            else
                className += " " + cname;
        }
    } else {
        var reg = new RegExp("\\b" + cname + "\\b(:?\\s?)");
        className = className.replace(reg, "").replace(/\s$/, "");
    }
    node.className = className;
};
//通用点击效果
var selector = ".nav_ > a,.u-3,.u-4 > a,.type_ a,.ad > a";
var elements = Array.prototype.slice.call(document.querySelectorAll(selector));
elements.forEach(function(item) {
    item.addEventListener("touchstart", function() {
        _toggleClass(item, "link-ef", true);
    }, true);
    item.addEventListener("touchend", function() {
        window.setTimeout(function() {
            _toggleClass(item, "link-ef", false);
        }, 500);
    }, false);
});
Array.prototype.slice.call(document.querySelectorAll("a.u-3")).forEach(function(item) {
    item.addEventListener("click", function(event) {
        if (event.target.nodeName == "SPAN") {
            event.preventDefault();
            location.href = event.target.getAttribute("url");
        }
    }, false);
});
//end