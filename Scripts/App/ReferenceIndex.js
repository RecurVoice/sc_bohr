$(function () {

    // common action
    $('.show-share').click(function () {
        $(".referenceId").val($(this).data('id'));
    });    
    $('.show-review').click(function () {
        $(".referenceId").val($(this).data('id'));
        $(".Abstract").val($(this).data('abstract'));
    });

    // validation fix  
    $(".association-form").validate({
        errorLabelContainer: ".validation-summary-errors", wrapper: "li",

        rules: {
            image: { required: true, accept: "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf" }
        },
        messages: {
            image: { required: 'Required!', accept: 'Not an image!' }
        }
    })

    // reference table settings
    $(".ref-table").dataTable({
        sDom: "<'row-fluid'r>t<'row-fluid'>",
        sPaginationType: "bootstrap",
        bPaginate: false,
        bLengthChange: false,
        bFilter: false,
        bSort: true,
        bInfo: false,
        bAutoWidth: false,
        bProcessing: true,
        aoColumns: [
            { sWidth: "10px" },
            { sWidth: "auto" },
            { sWidth: "50px", sClass: "center" },
            { sWidth: "100px", sClass: "center" },
            { sWidth: "auto", bSortable: false },
            { sWidth: "60px", sClass: "center", bSortable: false },
            { sWidth: "60px", sClass: "center", bSortable: false },
        ]
    });

    // share reference table settings    
    $(".refshare-table").dataTable({
        sDom: "<'row-fluid'r>t<'row-fluid'>",
        sPaginationType: "bootstrap",
        bPaginate: false,
        bLengthChange: false,
        bFilter: false,
        bSort: true,
        bInfo: false,
        bAutoWidth: false,
        bProcessing: true,
        aoColumns: [
            { sWidth: "10px" },
            { sWidth: "auto" },
            { sWidth: "50px", sClass: "center" },
            { sWidth: "100px", sClass: "center" },
            { sWidth: "auto", bSortable: false },
            { sWidth: "60px", sClass: "center", bSortable: false },  
            { sWidth: "60px", sClass: "center", bSortable: false }
        ]
    });

    // tags settings
    $('.tags').tagsInput({
        height: 'auto',
        width: 'auto',
        interactive: true,
        defaultText: 'add a tag',
        onAddTag: function () {
            $.post(
                "/Reference/SaveTags",
                { Id: $(this).data("id"), Tags: $(this).val() },
                function () { }
            )
        },
        onRemoveTag: function () {
            $.post(
                "/Reference/SaveTags",
                { Id: $(this).data("id"), Tags: $(this).val() },
                function () { }
            )
        },
    });

    // stars settings
    $('.star').raty({
        path: '/Scripts/Raty-2.5.2/img/',
        score: function () {
            return $(this).attr('data-score');
        },
        click: function (score, evt) {
            $.post(
                "/Reference/SaveRate",
                { Id: $(this).data("id"), Score: score },
                function () { }
            )
        }
    });

    // isRead settings
    $('.isRead').click(function () {
     

        $.post(
             "/Reference/SaveReadState",
             {
                 Id: $(this).data("id"),
                 Value: $(this).is(':checked')
             },
             function () { }
         );
        mixpanel.track("Mark as read", {
            "Id": $(this).data("id"),
            "IsRead": $(this).is(':checked'),
            "Name": $(this).parents('tr').find('a').first().text()
        });
    })
        


    // save reviews
    $("#modal-review .btn-primary").click(function () {
        $.post(
            "/Reference/SaveReview",
            { Id: $("#modal-review").find(".referenceId").val(), Abstract: $("#modal-review").find(".Abstract").val() },
            function () { }
        )
    })

});
//// uploader creation 
//function createUploader(element) {
//    var uploader = new qq.FineUploader({
//        element: element,
//        request: {
//            endpoint: '/Reference/UploadHandler'
//        },
//        text: {
//            uploadButton: 'Upload file',
//        },
//        classes: {
//            success: 'alert alert-success',
//            fail: 'alert alert-error'
//        },
//        callbacks: {
//            onComplete: function (id, name, response) {
//                document.location.reload(true);
//            },
//            onUpload: function (id, name) {
//                this._options.request.endpoint += '?topic=' + $(this._element).data("topic");
//            }
//        },
//        validation: {
//            allowedExtensions: ['pdf'], //'jpeg', 'jpg', 'gif', 'png', 'pdf'
//            acceptFiles: "application/pdf"   //application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
//        },
//    });
//}

//function createUploaders() {
//    var list = document.getElementsByClassName('bootstrapped-fine-uploader');
//    for (var i = 0; i < list.length; i++) {
//        createUploader(list[i]);
//    }
//}

//window.onload = createUploaders;
