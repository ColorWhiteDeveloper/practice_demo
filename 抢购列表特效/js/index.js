var flag =0;
function Time(_time){
    var that  = this;
    that.startime = _time.startime;
    that.endtime = _time.endtime;
    that.nowtime = new Date();
    that.startTime = function (_index){
        return new Date(that.startime[_index]);
    }
    that.endTime = function (_index){
        return new Date(that.endtime[_index]);
    }
    that.dayTime = function(_index){
        if(that.startTime(_index)-that.nowtime>0){
            flag = 0;
            return Math.floor((that.startTime(_index)-that.nowtime)/1000/60/60/24);;
        }else if(that.endTime(_index)-that.nowtime>0){
            flag = 1;
            return Math.floor((that.endTime(_index)-that.nowtime)/1000/60/60/24);
        }else if(that.endTime(_index)-that.nowtime<0){
            flag = 2;
            return "hello";
        }
    }
    that.hourTime = function(_index){
        if(flag==0){
            return Math.floor((that.startTime(_index)-that.nowtime)/1000/60/60%24);
        }else{
            return Math.floor((that.endTime(_index)-that.nowtime)/1000/60/60%24);
        }
    }
    that.minTime = function(_index){
        if(flag==0){
            return Math.floor((that.startTime(_index)-that.nowtime)/1000/60%60);
        }else{
            return Math.floor((that.endTime(_index)-that.nowtime)/1000/60%60);
        }
        // return Math.floor((that.endTime(_index)-that.nowtime)/1000/60%60);
    }
    that.secondTime = function(_index){
        if(flag==0){
            return ((that.startTime(_index)-that.nowtime)/1000%60).toFixed(0);
        }else{
            return ((that.endTime(_index)-that.nowtime)/1000%60).toFixed(0);
        }
    }
    that.showTime = function(_index){
        return (`${that.dayTime(_index)} 天 ${that.hourTime(_index)} 小时 ${that.minTime(_index)} 分 ${that.secondTime(_index)} 秒`);
    };
}
// 构造函数，//传入商品数据自动生成页面
function Goods(_goodsData){
    var that = this;
    that.tips = _goodsData.tips;
    that.btn = _goodsData.btn;
    that.btnStyle = _goodsData.btnStyle;
    that.name = _goodsData.name;
    that.desc = _goodsData.desc;
    that.nowprice = _goodsData.nowprice;
    that.preprice = _goodsData.preprice;
    that.discount = _goodsData.discount;
    that.adrress = _goodsData.adrress;
    that.init = ()=>{
        // 版心
        var list_wrap = document.createElement("div");
        list_wrap.classList.add("wrap");
        for(let i=0;i<that.name.length;i++){
            var time = new Time(_goodsData);
            // 商品列表项
            var list_item = document.createElement("div");
            list_item.classList.add("list-item");
            //商品区
            var list_LeftArea = document.createElement("div");
            list_LeftArea.classList.add("left-area");
            list_LeftArea.classList.add("list");
            list_LeftArea.style.backgroundImage =`url(${that.adrress[i]})`; 
            //活动提示区
            var list_tips = document.createElement("div");
            list_tips.classList.add("la-tips");
            // 活动提示语
            var list_p = document.createElement("p");
            // 活动提示文本
            var list_text = document.createElement("span");
            // 折扣区
            var list_discount = document.createElement("div");
            list_discount.classList.add("ra-discount");
            list_discount.innerHTML = that.discount[i];
            // 文字区
            var list_RightArea = document.createElement("div"); 
            list_RightArea.classList.add("right-area");
            // 标题区
            var list_title = document.createElement("div");
            list_title.classList.add("ra-title");
            // 商品名字
            var list_name = document.createElement("div");
            list_name.classList.add("ra-name");
            list_name.innerHTML = that.name[i];
            // 商品描述
            var list_desc = document.createElement("div");
            list_desc.classList.add("ra-desc");
            list_desc.innerHTML = that.desc[i];
            // 价格区
            var list_price = document.createElement("div");
            list_price.classList.add("ra-price");
            // 现价
            var list_NowPrice = document.createElement("span");
            list_NowPrice.classList.add("ra-nowprice");
            list_NowPrice.innerHTML = that.nowprice[i];
            // 原价
            var list_PrePrice = document.createElement("span");
            var list_sub = document.createElement("sub");
            var list_del = document.createElement("del");
            list_PrePrice.classList.add("ra-preprice");
            list_del.innerHTML = that.preprice[i];
            // 按钮区
            var list_button = document.createElement("div");
            list_button.classList.add("ra-button");
            // 按钮
            var list_btn = document.createElement("button");
            if(time.dayTime(i) != "hello"){
                list_p.innerHTML = that.tips[flag];
                list_btn.classList.add(`${that.btnStyle[0]}`);
                list_btn.classList.add(`${that.btnStyle[flag]}`);
                list_btn.innerHTML = that.btn[flag];
            }else{
                list_p.innerHTML = that.tips[flag];
                list_btn.classList.add(`${that.btnStyle[0]}`);
                list_btn.classList.add(`${that.btnStyle[flag]}`);
                list_btn.innerHTML = that.btn[flag];
            }
            //生成总
            list_item.appendChild(list_LeftArea);
            list_item.appendChild(list_RightArea);
            // 生成左
            list_LeftArea.appendChild(list_tips);
            list_LeftArea.appendChild(list_discount);
            list_tips.appendChild(list_p);
            list_tips.appendChild(list_text);
            // 生成右
            list_RightArea.appendChild(list_title);
            list_RightArea.appendChild(list_price);
            list_RightArea.appendChild(list_button);
            list_title.appendChild(list_name);
            list_title.appendChild(list_desc);
            list_price.appendChild(list_NowPrice);
            list_price.appendChild(list_PrePrice);
            list_PrePrice.appendChild(list_sub);
            list_sub.appendChild(list_del);
            list_button.appendChild(list_btn);
            // 生成到页面
            list_wrap.appendChild(list_item);
        }
        document.body.appendChild(list_wrap);
        var list_p = document.querySelectorAll(".la-tips>p");
        var list_btn = document.querySelectorAll(".btn");
        var list_discount = document.querySelectorAll(".ra-discount");
        var list_span = document.querySelectorAll(".la-tips>span");
        for(let i = 0;i<list_span.length;i++){
            var timer = setInterval(()=>{
                var time = new Time(_goodsData);
                // console.log(time.dayTime(i));
                if(time.dayTime(i)=="hello"){
                    list_discount[i].style.display = "none";
                    list_p[i].innerHTML = that.tips[flag];
                    list_span[i].innerHTML = "敬请关注";
                    list_btn[i].classList.add(that.btnStyle[flag]);
                    // clearInterval(timer);
                }else if(time.dayTime(i)!="hello" && flag==0){
                    list_p[i].innerHTML = that.tips[flag];
                    list_btn[i].classList.add(that.btnStyle[flag]);
                    list_span[i].innerHTML = time.showTime(i);
                }else if(flag==1){
                    list_p[i].innerHTML = that.tips[flag];
                    list_btn[i].classList.add(that.btnStyle[flag]);
                    list_btn[i].innerHTML = that.btn[flag];
                    list_span[i].innerHTML = time.showTime(i);
                }
            },1000);
        }
    }
}