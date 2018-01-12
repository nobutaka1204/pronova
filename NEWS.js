var mode = [111511748, 111106899, 118856832, 119159606, 119869467, 121803405, 122711286, 122715235, 122783018]
// modeから画像、タイトルは確実に持ってこれるはずなのでやる
// プライスも商品ページと紐付けるだけならまあできるはず
var picture = ["111511748.jpg", "111106899.jpg","118856832_o1.jpg", "119159606.gif", "119869467_o1.jpg", "121803405.jpg", "122711286.jpg", "122715235.jpg", "122783018.jpg"];
var title = ["【Gole 1】ポケットに入るフルスペックWindows 10 PC！", "【EARIN】もうケーブルに邪魔されない","Ring Clock", "【iBand+】最高の目覚め！明晰夢をコントロールし睡眠の質を向上させるヘッドバンド", "【Xiaomi Mi6】光学ズーム可能デュアルカメラ！最強ハイスペックスマホ", "【fidget cube】作業中の手持ち無沙汰やイライラを解消しよう！","【barracuda】充電器付きもPCトレイも！全部入りの折りたたみ旅行カバン", "【ENKO】衝撃吸収ランニングシューズ-足腰を痛めずにダイエット！", "【SMACH Z】PCゲームを長時間外で遊べるハイスペック小型ゲーム機"];
var price = ["21,600円(税込)", "14,990円(税込)","33,980円(税込)", "24,980円(税込)", "56,160円(税4,160円)", "2,981円(税込)", "34,981円(税込)", "44,928円(税込)", "39,809円~62,802円(税込) "];

var len=mode.length;
var str;
for (var i=0; i<len; i++){
	str="";
	str="<div class=\"prd-lst-unit col col-xs-12 col-sm-6 col-md-6 col-lg-6\">"
       +"<a href=\"?pid="
       +mode[i]
       +"#detail\" class=\"prd-lst-link\">"
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