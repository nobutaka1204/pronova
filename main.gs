//最初に起動するメソッド
function mainFunction() {
  var doc_in = DocumentApp.openByUrl("https://docs.google.com/document/d/12AcY5TiCF9dAatD32YeHLwPTM6HrMcbzUA-_BXGOMYY/edit"); //入力(要URL)
  var doc_out = DocumentApp.create(doc_in.getName() + "のhtml");  //出力  
  var ps = doc_in.getParagraphs();
  var freeFlag = false; //フリーページか否か
  var purchaseFlag = false; //商品欄に表示するか
  var detailFlag = false; //詳細欄に表示するか

  
  var info = ["商品名","タイトル","概要","","","","","","","","","","","",""];
  [info, freeFlag] = registerInfo(info, ps[0], doc_out);
  createBegin(doc_out);
  Logger.log(info);
  
  for(var p in ps){
    [purchaseFlag, detailFlag] = createHead( ps[p], doc_out, freeFlag, purchaseFlag, detailFlag, info);
    Logger.log("P: "+ purchaseFlag + "  D: "+ detailFlag);
    createText( ps[p], doc_out);     
    createLargeImage( ps[p], doc_out, info);
    createSmallImage( ps[p], doc_out, info);   
    createIndex( ps[p], doc_out); 
    createInternalLink( ps[p], doc_out, info, freeFlag )
    createExternalLink( ps[p], doc_out );
    createYoutube( ps[p], doc_out );
    createVideo( ps[p], doc_out );
  }
  
  createEnd( freeFlag, purchaseFlag, detailFlag, doc_out, info );
  doc_out.saveAndClose();
  moveFile(doc_in, doc_out);
}