var debuger = (function() {
    var touchData = {
        sTime : 0,
        eTime : 0,
        sX : 0,
        eX : 0,
        ele : {
            article : _ele(".top_ > table")[0],
            index : _ele(".top_ > article span"),
            sTop : 0,
            eTop : 0,
        },
        index : 0,
        length : 4,
        animate : function(event, auto) {
            if (!auto) {
                var pos = event.changedTouches[0];
                this.eX = pos.pageX, index = this.index;
                if (Math.abs(this.eX - this.sX) > 50) {
                    if (index == ((2 * this.length) - 1))
                        index = this.length - 1;

                    if (this.sX > this.eX) {
                        if (Math.abs(index) === (this.length * 2 - 1)) {
                            index = -(this.length - 1);
                            this.ele.article.style.marginLeft = (index * 100) + "%";
                        }
                        index--;
                    } else {
                        if (index === 0) {
                            index = -this.length;
                            this.ele.article.style.marginLeft = (index * 100) + "%";
                        }
                        index++;
                    }
                    window.setTimeout(function() {
                        _toggleClass(touchData.ele.article, "animation", true);
                        touchData.ele.article.style.marginLeft = (index * 100) + "%";
                        touchData.index = index;
                    }, 0);
                }
            } else {
                var index = this.index;
                _toggleClass(touchData.ele.article, "animation", false);
                if (Math.abs(index) === (this.length * 2 - 1)) {
                    index = -(this.length - 1);
                    this.ele.article.style.marginLeft = (index * 100) + "%";
                }
                index--;
                window.setTimeout(function() {
                    _toggleClass(touchData.ele.article, "animation", true);
                    touchData.ele.article.style.marginLeft = (index * 100) + "%";
                    touchData.index = index;
                }, 0);
                this.auto = window.setTimeout(function() {
                    touchData.animate(null, true);
                }, 2000);
            }
        }
    };
    var banner = {
        handler : {
            start : function(event) {
                window.clearTimeout(touchData.restart);
                touchData.restart = null;
                var pos = event.targetTouches[0];
                touchData.sX = pos.pageX;
            },
            end : function(event) {
                if (touchData.auto) {
                    window.clearTimeout(touchData.auto);
                    touchData.auto = null;
                    if (!touchData.restart) {
                        touchData.restart = window.setTimeout(function() {
                            touchData.animate(null, true);
                        }, 2000);
                    }
                    return;
                }
                touchData.animate(event);
            },
            movingEnd : function(event) {
                _toggleClass(touchData.ele.article, "animation", false);
                var index = Math.abs(touchData.index);
                index = index >= touchData.length ? (index - touchData.length) : index;
                touchData.ele.index.forEach(function(item) {
                    _toggleClass(item, "current", false);
                });
                //console.log(index);
                _toggleClass(touchData.ele.index[index], "current", true);
                if (!touchData.auto) {
                    touchData.restart = window.setTimeout(function() {
                        touchData.animate(null, true);
                    }, 2000);
                }
            }
        },
        init : function() {
            var _this = this;
            try {
                touchData.ele.article.addEventListener("touchstart", _this.handler.start, false);
                touchData.ele.article.addEventListener("touchend", _this.handler.end, false);
                touchData.ele.article.addEventListener("webkitTransitionEnd", _this.handler.movingEnd, false);
                _ele(".top_ > table img").forEach(function(item) {
                    item.addEventListener("click", function() {
                        location.href = item.getAttribute("href");
                    }, false);
                });
                window.setTimeout(function() {
                    touchData.animate(null, true);
                }, 2000);
            } catch(e) {
                console.log(e);
            }
            return this;
        }
    };
    return banner.init();
})();
