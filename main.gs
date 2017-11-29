//最初に起動するメソッド
function mainFunction() {
  var doc_in = DocumentApp.openByUrl("https://docs.google.com/document/d/1UsYJ1FfbwaGuXZtT87plzk3O25FxvHdUz9tV6IT7Cw4/edit"); //入力(要URL)
  var doc_out = DocumentApp.create(doc_in.getName() + "のhtml");  //出力  
  var ps = doc_in.getParagraphs();
  var purchaseFlag = false;
  var detailFlag = false;

  
  var info = ["商品名","タイトル","概要","価格"];
  info = registerInfo(info, ps[0], doc_out);
  createBegin(doc_out);
  
  for(var p in ps){    
    [purchaseFlag, detailFlag] = createHead( ps[p], doc_out, purchaseFlag, detailFlag);
    Logger.log("P: "+ purchaseFlag + "  D: "+ detailFlag);
    
    createText( ps[p], doc_out);     
    createLargeImage( ps[p], doc_out, info);
    createSmallImage( ps[p], doc_out, info);   
    //createIndex( ps[p], doc_out); 
    //createExternalLink( ps[p], doc_out );
    createYoutube( ps[p], doc_out );
    //createVideo( ps[p], doc_out );
  }
  
  createEnd( purchaseFlag, detailFlag, doc_out, info );
  doc_out.saveAndClose();
  moveFile(doc_in, doc_out);
}

//ファイルの移動
function moveFile(doc_in, doc_out) {
  var positionFile = doc_in.getName(); // 移動先と同じディレクトリにあるファイル
  var sourcefile = doc_out.getName(); // 移動するファイル
  positionFile = DriveApp.getFilesByName(positionFile).next();
  positionFile= positionFile.getParents();
  
  var destfolder = positionFile.next(); //　移動先のファイル（入力ドキュメントと同じディレクトリ）
  destfolder = DriveApp.getFoldersByName(destfolder).next();
  var file = DriveApp.getFilesByName(sourcefile).next();
  var sourcefolder = file.getParents().next();
  destfolder.addFile(file);
  sourcefolder.removeFile(file); 
}

//情報を入れておく
function registerInfo(info,obj,doc_out){
  TextPicker.open(obj.getText());
  for(var i in info){
    info[i] = TextPicker.pickUp("＜","＞");
    TextPicker.skipTo(info[i]);
  } 
  return info;
}

//各キーワードごとに要素を割り当てるメソッド
function assignElement( obj, keyword ){
  TextPicker.open(obj.getText());
  TextPicker.skipTo(keyword);
  var ele = ["","","",""];
  for(var i in ele){
    ele[i] = TextPicker.pickUp("＜","＞");
    TextPicker.skipTo(ele[i]);
  }  
  return ele;
}

function createBegin(doc_out){
    doc_out.appendParagraph('' + 
    
      '<div class="originalContents">' +　String.fromCharCode(10) +
      '    ' +　String.fromCharCode(10) +
      '    <div class="mainContents">' +　String.fromCharCode(10) +
      
    '');
}

function createEnd( purchaseFlag, detailFlag, doc_out, info ){
    doc_out.appendParagraph('' + 

      '        </div>' +　String.fromCharCode(10) +
      '    ' +　String.fromCharCode(10) +
      '    </div>' +　String.fromCharCode(10) +
      '    ' +　String.fromCharCode(10) +
      '    <div class="subContents">' +　String.fromCharCode(10) +
      '    ' +　String.fromCharCode(10) +
      '        <!--ランキング表示-->' +　String.fromCharCode(10) + 
      '        <div class="subBox rankingBox"></div>' +　String.fromCharCode(10) + 
      '    ' +　String.fromCharCode(10) +      
      '        <!--おすすめ表示-->' +　String.fromCharCode(10) + 
      '        <div class="subBox recommendBox"></div>' +　String.fromCharCode(10) +     
      '    ' +　String.fromCharCode(10) +           
      '        <!--目次表示-->' +　String.fromCharCode(10) + 
      '        <div class="subBox indexBox">' +　String.fromCharCode(10) + 
      '            <h4 class="header">目次</h4>' +　String.fromCharCode(10) + 
      '            <div class="index"></div>' +　String.fromCharCode(10) +
      '        </div>' +　String.fromCharCode(10) + 
      '    ' +　String.fromCharCode(10) +       
      '    </div>' +　String.fromCharCode(10) + 
      '    ' +　String.fromCharCode(10) +      
      '</div>' +　String.fromCharCode(10) + 
      
    '');
}


//見出しのメソッド（要素は2個)
function createHead( obj, doc_out, purchaseFlag, detailFlag ){
  var header = "";
  var input = ["◆","◇","◎"];
  var output = ["h2","h3","h4"];
  TextPicker.open(obj.getText());

  for(var i = 0 ; i < 3 ; i++){
  
    if(obj.findText(input[i]+input[i]+input[i]) != null){
      header = output[i];
      TextPicker.skipTo(input[i]+input[i]+input[i]);
      Logger.log("共通");
      if( purchaseFlag == true || detailFlag == true ){
          doc_out.appendParagraph('' + 
          '        </div>' + String.fromCharCode(10) +  
          '');
      }
      purchaseFlag = true;
      detailFlag = true;
      doc_out.appendParagraph('' + 
        '        <div class="common">' + String.fromCharCode(10) +  
      ''); 
      
    }else if(obj.findText(input[i]+input[i]) != null){
      header = output[i];
      TextPicker.skipTo(input[i]+input[i]);
      Logger.log("詳細");
      if( purchaseFlag == true || detailFlag == true ){
          doc_out.appendParagraph('' + 
          '        </div>' + String.fromCharCode(10) +  
          '');
      }
      purchaseFlag = false;
      detailFlag = true;
      doc_out.appendParagraph('' + 
        '        <div class="detail">' + String.fromCharCode(10) +  
      '');
      
    }else if(obj.findText(input[i]) != null){
      header = output[i];
      TextPicker.skipTo(input[i]);
      Logger.log("商品");
      if( purchaseFlag == true || detailFlag == true ){
          doc_out.appendParagraph('' + 
          '        </div>' + String.fromCharCode(10) +  
          '');
      }
      purchaseFlag = true;
      detailFlag = false;
      doc_out.appendParagraph('' + 
        '       <div class="purchase">' + String.fromCharCode(10) +  
      '');
      
    }
  
  }
  
  var ele = TextPicker.getTarget(); 
  if(header != ""){
    doc_out.appendParagraph('' +   
      '            <' + header + ' class="header">' + ele + '</'+ header + '>' + String.fromCharCode(10) +  
    '');
  }
  
  return [purchaseFlag, detailFlag];
  
}


//目次のメソッド（要素なし）
function createIndex( obj, doc_out ){
  if(obj.findText("目次") != null){
  doc_out.appendParagraph('' +
    '      <h4 class="header">目次</h4>' +　String.fromCharCode(10) +
    '      <div class="index"></div>' + String.fromCharCode(10) +
  '');
  }
}

//文章のメソッド
function createText( obj, doc_out ){　
  if(obj.findText("文章") != null){
    var ele = assignElement( obj, "文章" );
    doc_out.appendParagraph('' +     
      '            <p class="text">' + ele[0] + '</p>' + String.fromCharCode(10) +   
    '');    
  }
  //何もキーワードがないときに文章の形にする
  if( obj.getText() != "" && obj.findText("＜") == null && obj.findText("◆") == null && obj.findText("◇") == null && obj.findText("◎") == null && obj.findText("目次") == null){
    TextPicker.open(obj.getText());
    var ele = TextPicker.getTarget();
    doc_out.appendParagraph('' +     
      '            <p class="text">' + ele + '</p>' + String.fromCharCode(10) +   
    ''); 
  }
}

//画像(大)のメソッド（要素は4個）
function createLargeImage( obj, doc_out, info ){
  if(obj.findText("画像大") != null){
    var ele = assignElement( obj, "画像大" );
    doc_out.appendParagraph('' +
      '            <div class="image">'+ String.fromCharCode(10) +
      '                <p class="largeImage">'+ String.fromCharCode(10) +
      '                    <img src="https://file002.shop-pro.jp/PA01374/799/image/' + info[0] + '/'+ ele[0] +'" alt="'+ ele[1] +'">'+ String.fromCharCode(10) +
      '                </p>'+
    '');      
      //出典の有無を確認
      if( ele[2] !=　"" ){
      doc_out.appendParagraph('' +
      '                <cite>'+ String.fromCharCode(10) +
      '                    <p><a href=”'+ ele[2] +'” rel=”nofollow”>'+ ele[3] +'</a></p>'+ String.fromCharCode(10) +
      '                </cite>'+ String.fromCharCode(10) +
      '            </div>'+ String.fromCharCode(10) + 
    '');
      }else{
      doc_out.appendParagraph('' + 
      '            </div>'+ String.fromCharCode(10) + 
    '');
      }
  }
}

//画像(小)のメソッド（要素は4個）
function createSmallImage( obj, doc_out,info ){
  if(obj.findText("画像小") != null){
    var ele = assignElement( obj, "画像小" );
    doc_out.appendParagraph('' +
      '            <div class="image">'+ String.fromCharCode(10) +
      '                <p class="smallImage">'+ String.fromCharCode(10) +
      '                    <img src="https://file002.shop-pro.jp/PA01374/799/image/' + info[0] + '/'+ ele[0] +'" alt="'+ ele[1] +'">'+ String.fromCharCode(10) +
      '                </p>'+
    '');      
      //出典の有無を確認
      if( ele[2] !=　"" ){
      doc_out.appendParagraph('' +
      '                <cite>'+ String.fromCharCode(10) +
      '                    <p><a href=”'+ ele[2] +'” rel=”nofollow”>'+ ele[3] +'</a></p>'+ String.fromCharCode(10) +
      '                </cite>'+ String.fromCharCode(10) +
      '            </div>'+ String.fromCharCode(10) + 
    '');
      }else{
      doc_out.appendParagraph('' + 
      '            </div>'+ String.fromCharCode(10) + 
    '');
      }
  }
}

//外部リンクのメソッド（要素は2個）
function createExternalLink( obj, doc_out ){
  if(obj.findText("外部リンク") != null){
    var ele = assignElement( obj, "外部リンク" );
     doc_out.appendParagraph('' +
    '      <div class="externalLink">'+ String.fromCharCode(10) +
	'          <a href="' +ele[0]+ '"><i class="fa fa-link" aria-hidden="true"></i> ' + ele[1] + '</a>'+ String.fromCharCode(10) +
	'      </div>'+ String.fromCharCode(10) +
    '');  
  }
}

//Youtubeのリンクのメソッド（要素は1個）
function createYoutube( obj, doc_out ){
  if(obj.findText("YouTube") != null){
    var ele = assignElement( obj, "YouTube" );
    doc_out.appendParagraph('' +
    '      <p class ="video">'+ String.fromCharCode(10) +
	'          <iframe src="' + ele[0] + '" frameborder="0" allowfullscreen></iframe>'+ String.fromCharCode(10) +
	'      </p>'+ String.fromCharCode(10) +
    '');  
  }
}

//動画のリンクのメソッド（要素は1個）
function createVideo( obj, doc_out ){
  if(obj.findText("動画") != null){
    var ele = assignElement( obj, "動画" );
    doc_out.appendParagraph('' +
    '      <p class ="video">'+ String.fromCharCode(10) +
	'          <video controls="control"><source src="'+ ele[0] +'" type="video/mp4"></video>'+ String.fromCharCode(10) +
	'      </p>'+ String.fromCharCode(10) +
     
    '');  
  }
}

