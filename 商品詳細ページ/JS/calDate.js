//日付を換算する
//現在はカラーミーの商品詳細ページに直接貼り付けている
//ゆくゆくはcyberduckに挙げる

var date = document.getElementsByClassName("delivery-date");
//今日の日付データを変数hidukeに格納
var dat=new Date();
//年・月・日・曜日を取得する
var year = dat.getFullYear();
var month = dat.getMonth()+1;
var week = dat.getDay();
var day = dat.getDate() ;

<{if $product.simple_explain != ""}>
	//簡易説明をexpに代入
	var exp =  "<{$product.simple_explain}>";
    //console.log(exp.replace(/[0-9]/g, ''));
	dat.setDate(day+parseInt(exp.replace(/[^0-9]/g, '')));
<{/if}>

//console.log(exp.match(/年/g));
//特別な条件の場合、年月換算をしない
iif(exp.match(/年/g) != null){{
    date[0].innerHTML = exp;
}else{
    var yobi= new Array("日","月","火","水","木","金","土");
    if(date[0]!=undefined){
        date[0].innerHTML =  dat.getUTCMonth()+1 + "月" + dat.getUTCDate() + exp.replace(/[0-9]/g, '');
    }
}
