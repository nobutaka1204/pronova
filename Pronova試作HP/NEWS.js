var mode = [3, 4, 7, 8, 6]
// modeから画像、タイトルは確実に持ってこれるはずなのでやる
// プライスも商品ページと紐付けるだけならまあできるはず
var picture = ["111511748.jpg", "111106899.jpg","118856832_o1.jpg", "119159606.gif", "119869467_o1.jpg"];
var title = ["【Gole 1】ポケットに入るフルスペックWindows 10 PC！", "【EARIN】もうケーブルに邪魔されない","Ring Clock", "【iBand+】最高の目覚め！明晰夢をコントロールし睡眠の質を向上させるヘッドバンド", "【Xiaomi Mi6】光学ズーム可能デュアルカメラ！最強ハイスペックスマホ"];
var price = ["21,600円(税1,600円)", "26,780円(税1,984円)","60,480円(税4,480円)", "30,240円(税2,240円)", "56,160円(税4,160円)"];

var len=mode.length;
var str;
for (var i=0; i<len; i++){
	str="";
	str="<div class=\"prd-lst-unit col col-xs-12 col-sm-6 col-md-6 col-lg-6\">"
       +"<a href=\"?mode=f"
       +mode[i]
       +"\" class=\"prd-lst-link\">"
       +"<div class=\"unit-inner\">"
       +"<img src=\"https://img21.shop-pro.jp/PA01374/799/product/"
       +picture[i]
       +"\" class=\"prd-lst-img\" alt=\""
       +title[i]
       +"\">"
       +"<div class=\"prd-lst-cap\">"
       +"<div class=\"prd-lst-cap-inner\">"
       +"<span class=\"prd-lst-name prd-lst-span\">"
       +title[i]
       +"</span>"
       +"<span class=\"prd-lst-price prd-lst-span\">"
       +price[i]
       +"</span>"
       +"</div>"
       +"</div>"
       +"</div>"
       +"</a>"
       +"</div>"
	document.write(str);
}