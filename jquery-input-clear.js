;
(function($) {
    //どこでもクリアボタン
    $.fn.jQueryClearButton = function(options){

        //対象物が表示されていない場合は終了
        if (!this.is(':visible')) {
            return this;
        }

        var obj = this;
        var obj_id = obj.attr('id');
        var btn_class_name = 'dokodemo-input-clear-' + obj_id;

        //option
        var defaults = {
            'always': false, //cleat button always display
            'zindex': 0,
            'offset_right': 15,
            'button_width': 15,
            'button_height': 18,
            'color': '#aaa'
        };
        var setting = $.extend(defaults, options); //merge

        //IEデフォルトのバツボタンを無効化
        $('body').append('<style> input::-ms-clear { visibility:hidden; } </style>');

        //inputを親要素で囲む
        var btn_parent = $('<div style="position:relative; margin:0; padding:0; border:none;">');
        this.before(btn_parent);
        this.prependTo(btn_parent);

        //make batsu button
        var btn = $('<div class="glyphicon glyphicon-remove ' + btn_class_name + '"></div>');
        this.before(btn);

        //button style
        btn.css({
            'position': 'absolute',
            'display': 'none',
            'cursor': 'pointer',
            'z-index': setting.zindex,
            'width': setting.button_width + 'px',
            'height': setting.button_height + 'px',
            'color': setting.color
        });

        //ボタンの位置をセット
        /* input要素がfloatしているとbtn_parentのheightが0になる。
         * その場合はinput要素自体のheightをbtn_parentのheightとする
         */
        var btn_parent_height = btn_parent.height();
        if (!btn_parent_height) {
            btn_parent_height = obj.height();
        }

        var offset_top = (btn_parent_height / 2) - (setting.button_height / 2) + 2;
        btn.css({
            'top': offset_top + 'px',
            'right': setting.offset_right + 'px'
        });

        //button event - click
        btn.on('click', function() {
            //clear
            obj.val('').focus();

            if (!setting.always) {
                btn.hide();
            }
        });

        //input event - input
        obj.on('input', function() {
            if (obj.val()) {
                btn.show();
            } else {
                if (!setting.always) {
                    btn.hide();
                }
            }
        });

        if (setting.always) {
            //always display
            btn.show();
        } else {

            //input event - focus
            obj.on('focus', function() {
                if (obj.val()) {
                    btn.show();
                } else {
                    btn.hide();
                }
            });

            //input event - blur
            obj.on('blur', function() {
                setTimeout('$(\'.' + btn_class_name + '\').hide()', 200);
            });

            //input event - moseover
            obj.on('mouseover', function() {
                if (obj.val()) {
                    btn.show();
                } else {
                    btn.hide();
                }
            });

        }


        //メソッドチェーン対応(thisを返す)
        return (this);
    };
})(jQuery);
