
$(function () {

  var cart = document.getElementById("product-cart"); 
  var header_top = 290 ; // へッターの高さ
  var index_top = 30; // 目次のトップ位置（フッターを抜く）
  var footer_bottom = 1000 ; // フッターの高さ
  
  if(cart != undefined){
  $(window).on('scroll', function () {
    if($(this).scrollTop() > (header_top - index_top) && $(this).scrollTop() < document.body.clientHeight - cart.clientHeight - footer_bottom - index_top)  {
      $("#product-cart").css({
        "top": index_top,
        "position":"fixed"
      });    
        
    }else if($(this).scrollTop() <= (header_top - index_top)){
      $("#product-cart").css({
        "top":  header_top,
        "position":"absolute"
      });
        
    }else{
      $("#product-cart").css({
        "top": document.body.clientHeight - cart.clientHeight - footer_bottom,
        "position":"absolute"
      });
    }
  });
  }
  
});	

        $(function() {
          var fixed_Box = $("#bottom_product-cart");
          var navOst = fixed_Box.offset().top; // 枠のトップ位置(画面内の位置)
          $(window).scroll( function() { // スクロール
						var footer_top = document.getElementById("footer-wrapper").getBoundingClientRect().top ; // フッターのトップ位置(画面内の位置)
					//console.log(footer_top - $("#bottom_product-cart").height());
						if( $("#container").width() <= 768){ // ウィンドウの幅が狭いとき, 設定外す
							//console.log("here1");
							document.getElementById("bottom_product-cart").style.position="relative";
							document.getElementById("bottom_product-cart").style.bottom="auto";
							fixed_Box.removeClass("middle_product-cart");
              fixed_Box.removeClass("top_product-cart");
						}else if( footer_top - $("#bottom_product-cart").height() < 0 ){ // フッターの真上のとき, 
	//console.log("here2");
              fixed_Box.removeClass("middle_product-cart");
              fixed_Box.removeClass("top_product-cart");
              document.getElementById("bottom_product-cart").style.position="fixed";
              document.getElementById("bottom_product-cart").style.bottom=window.innerHeight-footer_top +1 +"px";
						}else if( $(window).scrollTop() > navOst - 25){ // スクロール追従, 
							//console.log("here3");
              fixed_Box.addClass("middle_product-cart");
              fixed_Box.removeClass("top_product-cart");
            }else{ // 追従開始前のとき, 
							//console.log("here4");
              fixed_Box.removeClass("middle_product-cart");
              fixed_Box.addClass("top_product-cart");
            }
          });
					
					$(window).on('load resize', function(){ // ウィンドウサイズ更新
						var footer_top = document.getElementById("footer-wrapper").getBoundingClientRect().top ; // フッターのトップ位置(画面内の位置)
						//console.log("koko");
						//console.log($("#container").width());
						if( $("#container").width() <= 768){ // 768以下のとき, グリッドレイアウト
						//console.log("here5");
							document.getElementById("product-cart").style.display="none";
						 	document.getElementById("narrow_window_product-cart").style.display="block";
						}else{ // 768より大きいとき, 追従モード
							//console.log("here6");
							document.getElementById("product-cart").style.display="block";
						 	document.getElementById("narrow_window_product-cart").style.display="none";
							//console.log($("#bottom_product-cart").height());
							if( footer_top - $("#bottom_product-cart").height() < 0 ){ // フッターの真上のとき, 
								//console.log("here7");
            	  fixed_Box.removeClass("middle_product-cart");
              	fixed_Box.removeClass("top_product-cart");
              	document.getElementById("bottom_product-cart").style.position="fixed";
              	document.getElementById("bottom_product-cart").style.bottom=window.innerHeight-footer_top +1 +"px";
							}else if( $(window).scrollTop() > navOst - 25){ // スクロール追従, 
								//console.log("here8");
              	fixed_Box.addClass("middle_product-cart");
              	fixed_Box.removeClass("top_product-cart");
         	   }else{ // 追従開始前のとき, 
							 //console.log("here9");
            	  fixed_Box.removeClass("middle_product-cart");
              	fixed_Box.addClass("top_product-cart");
           	 }
						}
					});
        });