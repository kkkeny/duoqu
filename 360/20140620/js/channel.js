(function() {
    //tab
    _ele(".rank-tab td").forEach(function(item, index, array) {
        item.addEventListener("click", function(event) {
            var td = event.target;
            if (td.className == "current")
                return;
            array.forEach(function(item) {
                item.className = "";
            });
            td.className = "current";
            var content = _ele(".rank-tab + div > section");
            content.forEach(function(item) {
                if (item.className.indexOf("hidden") == -1)
                    item.className += " hidden";
            });
            content[index].className = content[index].className.replace(/\s?hidden\s?/, "");
        }, false);
    });
})(); 