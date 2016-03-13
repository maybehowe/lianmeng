!(function () {
    var hero = [
        "bingshuangyoulong|冰霜幼龙|zhi|极寒之息,冰霜护甲,寒冰之球,蓝龙血统",
        "shitu|使徒|zhi|神之右手,神裔天赋,灵魂震慑,威慑光混",
        "shuangmei|霜魅|zhi|霜爆连环,死亡仪式,冰霜凋零,霜魅之舞",
        "yemo|夜魔|li|沉眠低语,黑暗失明,鲜血虚空,吸血光环",
        "lieyan|烈焰|zhi|大炎爆术,火焰神石,烈焰风暴,魔法学识",
        "yingci|影刺|min|幻影突袭,撕裂月刃,暗影突袭,极限强袭",
        "jiansheng|剑圣|min|旋风式,双意式,逆刃式,心剑式",
        "xingjiefashi|星界法师|zhi|法师护甲,奥术光辉,法师之怒,奥法之躯"
    ];
    var swiper = new Swiper('.main_swiper', {
        direction: 'vertical',
        mousewheelControl: true,
        onInit: function (swiper) {
            var index = swiper.activeIndex;
            $('#page_' + index).addClass('active');
        },
        onTransitionEnd: function (swiper) {
            var index = swiper.activeIndex;
            $('.page_item').removeClass('active');
            $('#page_' + index).addClass('active');
        }
    });

    var pageParam = window.location.search.replace(/^\?/, '');
    var param = param2json(pageParam);
    var pageIndex = param.index;
    if(pageIndex){
        swiper.slideTo(pageIndex);
    }
    
    var mySwiper = new Swiper('.tece_swipe', {
        direction: 'horizontal',
        // autoplay: 3000,//可选选项，自动滑动
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        loop: true
    });

    function changeHero (value) {
        var cur = $('.swiper-slide-active').find('.hero_swipe_img').offset();
        var curWidth = cur.width * 107/95;
        $('.curhero').remove();
        $('.hero_' + value).append('<img class="curhero" src="img/hero_cur.png" width="' + curWidth + 'px" alt="">');
        $('#hero_big').html('<img src="img/hero_' + value + '_full.png" alt="">');

        var curHero = heroObj[value].split('|');
        $('.hero_name').html(curHero[1]);
        $('.hero_type').removeClass('hero_zhi hero_li hero_min').addClass('hero_' + curHero[2]);
        var hero_txt = curHero[3].split(',');
        var txt_html = '';
        for (var i = hero_txt.length - 1; i >= 0; i--) {
            txt_html += '<li>' + hero_txt[i] + '</li>';
        };
        $('.hero_txt').html(txt_html);
    };

    var heroObj = {};
    function showHero () {
        //生成列表
        var html = '';
        var init_big_img = '';
        for(var i = 0; i < hero.length; i++){
            var curHero = hero[i].split('|');
            html += '<div class="swiper-slide hero_'+ curHero[0] +'" value="' + curHero[0] + '"><img class="hero_swipe_img" src="img/hero_' + curHero[0] +'.png"></div>';
            heroObj[curHero[0]] = hero[i];
        }
        $('#hero_list').append(html);
        var heroSwiper = new Swiper('.hero_swipwer_container', {
            slidesPerView: 5,
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
            spaceBetween: 5,
            loop: true,
            onInit: function (swiper) {
                var index = swiper.activeIndex - 5;
                var initHero = hero[index].split('|');
                changeHero(initHero[0]);
            },
            onTransitionEnd: function (swiper) {
                var curHero = $('.hero_swipwer_container .swiper-slide-active');
                var value = curHero.attr('value');
                changeHero(value);
            },
            onClick: function (swiper) {
                var clickIndex = swiper.clickedIndex;
                var clickObj = $('.hero_swipwer_container .swiper-slide').eq(clickIndex);
                var value = clickObj.attr('value');
                changeHero(value);
            }
        }); 
    }
    showHero();

    var newsSwiper = new Swiper('.news_swiper', {
        spaceBetween: 30,
        loop: true,
        autoplay: 3000
    });

    function param2json (str) {
        var json = {};
        if (/^[0-9]*$/.test(str)) {
            json.city = str;
            return json
        } else {
            var strArr = str.split('&');

            if (strArr.length > 0) {
                for (var i = 0; i < strArr.length; i++) {
                    var item = strArr[i].split('=');
                    var key = item[0];
                    var value = item[1];
                    json[key] = value;
                }
                return json
            } else {
                return false
            }
        }
    }
})()