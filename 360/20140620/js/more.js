(function() {
    var loading = _ele(".loading")[0], page = 2;
    window.addEventListener("scroll", function(event) {
        var screen = window.innerHeight || document.documentElement.clientHeight, contentHeight = document.body.scrollHeight, scroll = Math.max(window.pageYOffset, document.body.scrollTop);
        var n = (contentHeight - (screen + scroll));
        if (n < 10 && page <= $_list.max) {
            _toggleClass(loading, "show", true);
            ajax.request({
                url : $_list.url + page,
                timeout : 20000,
                success : function(data) {
                    console.log(data + "..........");
                    //var data = JSON.parse(data);
                },
                error : function() {

                },
                complete : function() {
                    //_toggleClass(loading, "show", false);
                }
            });
        }
    }, false);
})();
