var header = document.getElementsByClassName("header");
var origin= document.getElementsByClassName("var_origin");
var copy= document.getElementsByClassName("var_copy");

//createVar();
assignID();
createIndex();
lineBreak();
linkImage();
adjustPosition();

/*可変ナビ（商品購入ページの誘導）*/
$(function () {

  var rank = document.getElementsByClassName("rankingBox");
  var reco = document.getElementsByClassName("recommendBox");
  var pro = document.getElementsByClassName("productBox"); 
  
  if(pro[0] !=  undefined){
  $(window).on('scroll', function () {
    if($(this).scrollTop() > (rank[0].clientHeight+reco[0].clientHeight+290-30) && $(this).scrollTop() < document.body.clientHeight - pro[0].clientHeight - 900-30) {
      $(".productBox").css({
        "top":"30px",
        "position":"fixed"
      });    
　　　 
    }else if($(this).scrollTop() >= document.body.clientHeight - pro[0].clientHeight -900-30){
      $(".productBox").css({
        "top": document.body.clientHeight - pro[0].clientHeight - 900,
        "position":"absolute"
      });

    }else{
      $(".productBox").css({
        "top":(rank[0].clientHeight+reco[0].clientHeight+290)+"px",
        "position":"absolute"
      });
    }
  });
  }
  
});


/*おすすめ欄の位置を調節*/
function adjustPosition(){
    var rank = document.getElementsByClassName("rankingBox");
    if(rank[0] !=undefined){
        console.log(rank[0].clientHeight);
        var reco = document.getElementsByClassName("recommendBox");
        reco[0].style.top = (rank[0].clientHeight + 290 ) +"px";
        console.log(reco[0].style.top);
    }
}

/*テキスト自動改行メソッド*/
function lineBreak(){
    var text = document.getElementsByClassName("text");
    //console.log(text[0].innerHTML);
    for(var i = 0; i < text.length; ++i){
        text[i].innerHTML = text[i].innerHTML.replace(/\r?\n/g, "<br>");
    }
    //console.log(text[0].innerHTML);
}

/*変数作成メソッド(現時点では使わない)*/
function createVar(){
    console.log(origin);
    console.log(copy);
    for(var i = 0; i < copy.length; ++i){
        copy[i].innerHTML = origin[0].innerHTML;
    }
}

/*id自動割り当てメソッド*/
function assignID(){
    for(var i = 0; i < header.length; ++i){
            header[i].id = i; 
            header[i].id = i; 
    }
}

/*目次生成メソッド*/
function createIndex(){
    var list = document.getElementsByClassName("index");
    for(var i = 0; i < header.length; ++i){
        //console.log(header[i].tagName);
        if(header[i].tagName == "H2"){
            list[0].innerHTML = list[0].innerHTML +"<li><a href='#"+i+ "'>"+header[i].innerHTML+"<br>"+"</a></li>";
        }
        if(header[i].tagName == "H3"){
            list[0].innerHTML = list[0].innerHTML +"<li><a href='#"+i+ "'>・"+header[i].innerHTML+"<br>"+"</a></li>";
        } 
    }
    if(list[0] !=  undefined){
        list[0].innerHTML = "<ul>"+ list[0].innerHTML +"</ul>";
    }
}

/*画像リンク生成メソッド*/
function linkImage(){
    var image = document.getElementsByClassName("image");
    //console.log(origin[0]);
    if(origin[0]!=undefined){
        for(var i = 0; i < image.length; ++i){
            image[i].innerHTML = image[i].innerHTML.replace("フォルダ名", origin[0].innerHTML);
            image[i].innerHTML = image[i].innerHTML.replace("自動", origin[0].innerHTML+"_No."+(i+1));
        }    
    }   
}