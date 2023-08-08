function choice_editor(editor,id){
    if(editor==""){
        editor="nhn";
    }
    switch(editor){
        case "nhn":
            nhn_Editor_Init(id);
            break;
        case "summer":
            summer_Init(id);
            break;
    }
}

var oEditors = [];
function nhn_Editor_Init(id){

    // 추가 글꼴 목록
    //var aAdditionalFontSet = [["MS UI Gothic", "MS UI Gothic"], ["Comic Sans MS", "Comic Sans MS"],["TEST","TEST"]];

    nhn.husky.EZCreator.createInIFrame({
    oAppRef: oEditors,
    elPlaceHolder: id,
    sSkinURI: "/smarteditor2/SmartEditor2Skin.html",
    htParams : {
            bUseToolbar : true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
            bUseVerticalResizer : true,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
            bUseModeChanger : true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
            //aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
            fOnBeforeUnload : function(){
                    //alert("완료!");
            }
    }, //boolean
    fOnAppLoad : function(){
            //예제 코드
            //oEditors.getById["ir1"].exec("PASTE_HTML", [" "]);
    },
    fCreator: "createSEditor2"
    });

    function pasteHTML() {
    var sHTML = "<span style='color:#FF0000;'>이미지도 같은 방식으로 삽입합니다.<\/span>";
    oEditors.getById[id].exec("PASTE_HTML", [sHTML]);
    }

    function showHTML() {
    var sHTML = oEditors.getById[id].getIR();
    alert(sHTML);
    }

    function submitContents(elClickedObj) {
            oEditors.getById[id].exec("UPDATE_CONTENTS_FIELD", []);	// 에디터의 내용이 textarea에 적용됩니다.

            // 에디터의 내용에 대한 값 검증은 이곳에서 document.getElementById(id).value를 이용해서 처리하면 됩니다.

            try {
                    $(".preload").css("display","block");
                    elClickedObj.form.submit();
            } catch(e) {}
    }

    function setDefaultFont() {
            var sDefaultFont = '궁서';
            var nFontSize = 24;
            oEditors.getById[id].setDefaultFont(sDefaultFont, nFontSize);
    }
}

function summer_Init(id){
    $("#"+id).summernote({
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['fontsize',['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['codeview']]
        ],
        minheight : 380,
        height: 400,
        fontNames : ['돋움','돋움체','굴림','굴림체','바탕','바탕체','나눔고딕','맑은 고딕','Arial','Arial Black','Comic Sans MS','Tahoma','Times New Romen','Verdana'],
        callbacks : {
            onImageUpload: function(files) {         
                send_File(files[0],$("#"+id));
            }
        }
    });
}

function send_File(file,obj){
    form_data = new FormData();
    form_data.append("uploadFile",file);
    $.ajax({
        data : form_data,
        type : "POST",
        url : "/ajax_img_upload.php",
        cache : false,
        contentType : false,
        processData : false,
        success : function(data){
            if(data == ""){
                alert("upload failed");
            }else{
                obj.summernote("insertImage",data);
            }
        }
    });
}

function editor_form(editor,id){
    if(editor==""){
        editor="nhn";
    }
    switch(editor){
        case "nhn":
            oEditors.getById[id].exec("UPDATE_CONTENTS_FIELD", []);
            break;
        case "summer":
            if($("#"+id).val()=="<p><br></p>"){
                 $("#"+id).val("");
            }
            $("#"+id).html($("#"+id).summernote('code'));
            break;
    }
}
function setHTML(editor,id,sHTML){
    if(editor==""){
        editor="nhn";
    }
    switch(editor){
        case "nhn":
            oEditors.getById[id].setIR(sHTML);
            break;
        case "summer":
            $("#"+id).summernote('code', sHTML);
            break;
    }
}