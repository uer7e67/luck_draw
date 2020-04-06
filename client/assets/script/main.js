const utils = require("./utils");


cc.Class({
    extends: cc.Component,

    properties: {
        disk: cc.Node,
        _state: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        var winSize = cc.director.getWinSize();
        var width = winSize.width;
        var height = winSize.height;
        utils.Get("/api/v1/get_config", (res) => {
            var data = JSON.parse(res);
            var str = "";
            for (var i = 0; i < data.length; i++) {
                str += data[i][0] + "等奖权重:" + data[i][1] + "  ";
            }
            var node = new cc.Node();
            this.node.addChild(node);
            var text = node.addComponent(cc.Label);
            text.fontSize = 14;
            text.lineHeight = 16;
            text.string = str;

            cc.tween(node)
                .repeatForever(
                    cc.tween(node)
                        .to(0, { x: width, y: height / 2 - 20 })
                        .to(6, { x: -width })

                ).start();
        });
    },

    start_lucky_action() {
        if(this._state == true) {
            return; 
        }
        this._state = true;
        utils.Get("/api/v1/ran_game", (res) => {
            var data = JSON.parse(res);
            var pIndex = data.pIndex;
            var degree_config = [225, 328, 70, 173, 278, 20, 120];
            var degree_now = this.disk.angle;
            while (degree_now < 0) {
                degree_now += 360;
            }
            degree_now = degree_now - Math.floor(degree_now / 360) * 360;
            var degree = 5 * 360 + degree_config[pIndex - 1] - degree_now;
            cc.tween(this.disk)
                .by(4, { angle: degree }, { easing: "cubicOut" })
                .call(() => {
                    this._state = false;
                })
                .start();
        })
    },

});
