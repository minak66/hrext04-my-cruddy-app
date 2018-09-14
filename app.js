$(document).ready(function() {

  function storeData(inputMemoir,memsArray) { //store data locally
    if(Array.isArray(arguments[1])) {
      localStorage.setItem("memoirKey", JSON.stringify(memsArray));
      displayMemoir();
    }else if(arguments.length === 1) {
      var mems=[];
      if (localStorage.getItem("memoirKey")){
        var mems=JSON.parse(localStorage.getItem("memoirKey"));
      }
      mems.push(inputMemoir);
      localStorage.setItem("memoirKey", JSON.stringify(mems));
    }
  }

  function displayMemoir(i) {  //display memoirs
    $(".display").remove();
    let displayDiv= '<div class="display"></div>';
    $(".outercontainer").append(displayDiv);
    let memoirs=JSON.parse(localStorage.getItem("memoirKey"));
    if(arguments.length>0){
      for (var j in memoirs){
        if(j==i){
          let itemHtml = '<div class="st display-memoir'+i+'" data-storage-key="memoirKey">'  + memoirs[i] + 
          '</div></br></br><button class="menustyle" id="delmem'+i+'">-</button><button class="menustyle" id="editmem'+i+'">edit</button><button class="menustyle" id="comment'+i+
          '">comment</button></br></br></br></br></br></br>';
          $(".display").append(itemHtml);
          displayCMT(i)
          eachMemDeleteButton(i, memoirs);
          editMem(i, memoirs);
          commentOnMemoir(i, memoirs);
        }
      }
    }else{
      for (var i in memoirs){
        let itemHtml = '<div class="st display-memoir'+i+'" data-storage-key="memoirKey">&nbsp;'  + memoirs[i] + 
        '</div></br></br><button class="menustyle" id="delmem'+i+'">-</button><button class="menustyle" id="editmem'+i+'">edit</button><button class="menustyle" id="comment'+i+
        '">comment</button></br></br></br></br></br></br>';
        $(".display").append(itemHtml);
        displayCMT(i)
        eachMemDeleteButton(i, memoirs);
        editMem(i, memoirs);
        commentOnMemoir(i, memoirs);
      }
    }
  }

  function editMem(i, memoirs) {  //edit memoir
    $("#editmem"+i).on("click", function() {
      $(".display-memoir"+i).text("");
      let saveorcancle='</button><button class="menustyle" id="save'+i+'">save</button><button class="menustyle" id="cancle'+i+'">cancle</button></div>'
      $(".display-memoir"+i).prepend(saveorcancle);
      let editInput='<div><input type = "text", id= "edit-input'+i+'" placeholder="edit.."></input></div>';
      $(".display-memoir"+i).prepend(editInput);
      $("#edit-input"+i).val(memoirs[i]);
      saveOrCancleEditMem(i, memoirs);
    });
  }

  function saveOrCancleEditMem(i, memoirs) {  //save or cancel edit a memoir
    $("#save"+i).on("click", function() {
      memoirs[i]= $("#edit-input"+i).val();
      $(".user-memoir-body").val("");
      $(".display-memoir"+i).remove();
      storeData("",memoirs);
    });
    $("#cancle"+i).on("click", function(){
      $(".display-memoir"+i).remove();
      storeData("",memoirs);
    });
  }

  function eachMemDeleteButton(i, memoirs) { //delete button for each memoir
    $("#delmem"+i).on("click", function() {  
      var result=[];
      for (var j in memoirs){
        if (j !== i){
          result.push(memoirs[j]);
        }else{
          var k=j;
        }
      }
    localStorage.removeItem("cmt"+k);
    storeData("",result);
      //console.log("key=> ", e.target.dataset.storageKey);
      //localStorage.removeItem("memoirKey"); 
      //$(".user-memoir-body").val("");
    });
  }

  function displayCMT(i){
    var result=[];
    $(".cmt"+i).remove();
    //displayMemoir();
    let cmtContainer='<div class="cmtContainer"></div>';
    if(localStorage.getItem("cmt"+i)){
      result = JSON.parse(localStorage.getItem("cmt"+i));
      console.log("res",result);
    }
    for(var j=0; j<result.length; j++){
      let cmt='<div class="cmtstyle cmt'+i+'">&nbsp; &nbsp; ' + result[j] + '</div>';
      $(".display-memoir"+i).append(cmt);
    }
    // $(".display-memoir" + i).append(cmtContainer);

  }

  function storeComments(i, comment) {
    var mems=[];
    var key ="cmt"+i;
      if (localStorage.getItem(key)){
        mems=JSON.parse(localStorage.getItem(key));
      }
      mems.push(comment);
      //console.log(key, comment);
      localStorage.setItem(key, JSON.stringify(mems));
      displayCMT(i);
  }

  function saveOrCancleCMT(i){
    $("#saveCMT"+i).on("click", function(){
      if($("#cmt-input"+i).val().length !== 0){
        storeComments(i,$("#cmt-input"+i).val());
        $("#cmt-input"+i).remove();
        $("#cancleCMT"+i).remove();
        $("#saveCMT"+i).remove();
      }
    });
    $("#cancleCMT"+i).on("click", function(){
      $("#cmt-input"+i).remove();
      $("#cancleCMT"+i).remove();
      $("#saveCMT"+i).remove();
    });
  }

  function commentOnMemoir(i) {  //comment on memoir
    $("#comment"+i).on("click", function(){
      let cmtinput='<div><input type = "text", id= "cmt-input'+i+'" placeholder="add comment..."></input></div>';
      let saveorcancle='</button><button class="menustyle" id="saveCMT'+i+'">save</button><button class="menustyle" id="cancleCMT'+i+'">cancle</button></div>'
      $(".display-memoir"+i).append(cmtinput);
      $(".display-memoir"+i).append(saveorcancle);
      saveOrCancleCMT(i);
    });
  }

  $(".add-memoir").on("click", function() { //add memoir button click
    let inputMemoir = $(".user-memoir-body").val();
    $(".user-memoir-body").val("");    
    storeData(inputMemoir);
   
  });

  $(".del-memoir-btn").on("click", function() {  //delete all memoirs button
    //console.log("key=> ", e.target.dataset.storageKey);
    var mems=[];
    mems=JSON.parse(localStorage.getItem("memoirKey"));
    for(var i=0; i<mems.length; i++){
      if(localStorage.getItem("cmt"+i)){
        localStorage.removeItem("cmt"+i);
      }
    }
    $(".display").remove();
    localStorage.removeItem("memoirKey"); 
    $(".user-memoir-body").val("");
  });

  $(".disp-memoir-btn").on("click", function() {  //display all memoir button
  //console.log("key=> ", e.target.dataset.storageKey); // user-input-title
    displayMemoir();
  }); 

  $("#search").on("click", function(){ //search button
    var mems=[];
    var text = $("#inputSearch").val();
    mems=JSON.parse(localStorage.getItem("memoirKey"));
    console.log(mems, text);
    for (var i=0; i < mems.length; i++){
      if (mems[i].search(text) !== -1){
        console.log(mems[i]);
        displayMemoir(i);
      }
    }
    $("#inputSearch").val("");
  }); 

  $(".chfile").on("click", function(){
    //updateImageDisplay()
    // var input = document.querySelector('#fileInput');
    // alert("hi",input);
    // var curFiles = input.files;
    // //window.URL.createObjectURL(curFiles)

    // var image = document.createElement('img');
    // image.width=200;
    // image.height=200;
    // //var blob = new Blob([curFiles[0]], { type: "image/png" });
    // image.src = window.URL.createObjectURL(curFiles[0]);

    // $(".user-memoir-body").append(image);
  });

  

});