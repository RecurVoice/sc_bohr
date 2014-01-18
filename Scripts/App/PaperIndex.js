
// common function 

function parseDate(input) {
    var parts = input.split('.');
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[2], parts[1] - 1, parts[0]); // months are 0-based
}

function RefreshTable(tableId, urlData) {
    $(tableId).find("tbody").html("<tr><td>Retrieving records...</td></tr>")
    $.getJSON(urlData, null, function (json) {
        table = $(tableId).dataTable();
        oSettings = table.fnSettings();
        table.fnClearTable(this);
        for (var i = 0; i < json.aaData.length; i++) {
            table.oApi._fnAddData(oSettings, json.aaData[i]);
        }
        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
        table.fnDraw();
    });
}

function WhatIsPaper(paperName) {
    if (paperName == "Journal")
        return true;
    else
        return false;
}

function GetAttAndTem(id) {
    $.ajax({
        url: "/Paper/GetTemplatesAndAttachments",
        data: {
            id: id
        },
        success: function (data) {
            $(".templates").text("");
            $(".attachements").text("");
            for (var i = 0; i < data.templates.length ; i++)
                $(".templates").append('<span><a href="/Home/DownloadFile?id=' + data.templates[i].Id + '">' + data.templates[i].FileName + '</a></span>, ');
            for (var i = 0; i < data.atachements.length ; i++)
                $(".attachements").append('<span><a href="/Home/DownloadFile?id=' + data.atachements[i].Id + '">' + data.atachements[i].FileName + '</a></span>, ');
        }
    });
}

$(function () {

    // common action
    $('.modal-paper').click(function () {
        $("#PaperName").val("");
        $("#DeadlineAbstract").val("");
        $("#DeadlineFull").val("");
        $("#Name").val("");
        $("#Paperlink").val("");
        $(".paper").val("");
        $(".templates").val("");
        $(".attachements").val("");
        $("#Website").val("");
        $("#Share").val("");
        $("#Keywords").val("");
    });
    $('.revision').click(function () {
        $(".paperId").val($(this).data('id'));
        RefreshTable("#versions-table", "/Paper/GetVersions?Id=" + $(this).data('id'));
    });
    $('.show-review').click(function () {
        $(".paperId").val($(this).data('id'));
        $("#review").val($(this).data('review'));
    });

    // action on journal section  
    $('#journal-add').click(function () {
        $("#PaperType").val("Journal");
        $("#modal-paper-label").text("Add journal paper");
        $(".Name").text("Journal name");
        $(".Website").text("Journal website");
        $(".templates").removeAttr("disabled");
        $(".attachements").removeAttr("disabled");
    });
    $('.journal-details').click(function () {
        $(".Name").text("Journal name");
        $(".Website").text("Journal website");
        $(".paperId").val($(this).data('id'));
        $("#paperNameedit").val($(this).data('name'));
        $("#websiteedit").val($(this).data('website'));
        $("#paperKeywordsedit").val($(this).data('keywords'));
        $("#abstractdateEdit").val($(this).data('abstract'));
        $("#fulldateEdit").val($(this).data('fulldate'));
        var id = $(this).data('id');
        GetAttAndTem(id);
    });

    // action on conference section 
    $('#conference-add').click(function () {
        $("#PaperType").val("Conference");
        $("#modal-paper-label").text("Add conference paper");
        $(".Name").text("Conference name");
        $(".Website").text("Conference website");
        $(".templates").removeAttr("disabled");
        $(".attachements").removeAttr("disabled");
    });
    $('.conference-details').click(function () {
        $(".Name").text("Conference name");
        $(".Website").text("Conference website");
        $(".paperId").val($(this).data('id'));
        $("#paperNameedit").val($(this).data('name'));
        $("#websiteedit").val($(this).data('website'));
        $("#paperKeywordsedit").val($(this).data('keywords'));
        $("#abstractdateEdit").val($(this).data('abstract'));
        $("#fulldateEdit").val($(this).data('fulldate'));
        var id = $(this).data('id');
        GetAttAndTem(id);
    });

    // action on book section 
    $('#book-add').click(function () {
        $("#PaperType").val("Book");
        $("#modal-paper-label").text("Add book chapter");
        $(".Name").text("Book chapter");
        $(".Website").text("Book website");
        $(".templates").attr("disabled", "disabled");
        $(".attachements").attr("disabled", "disabled");
    });
    $('.book-details').click(function () {
        $(".Name").text("Book chapter");
        $(".Website").text("Book website");
        $(".paperId").val($(this).data('id'));
        $("#paperNameedit").val($(this).data('name'));
        $("#websiteedit").val($(this).data('website'));
        $("#paperKeywordsedit").val($(this).data('keywords'));
        $("#abstractdateEdit").val($(this).data('abstract'));
        $("#fulldateEdit").val($(this).data('fulldate'));
        $(".templates").text("");
        $(".attachements").text("");
    });

    // action on research section 
    $('#research-add').click(function () {
        $("#PaperType").val("Research");
        $("#modal-paper-label").text("Add research proposals");
        $(".Name").text("Name");
        $(".Website").text("Website");
        $(".templates").removeAttr("disabled");
        $(".attachements").removeAttr("disabled");
    });
    $('.research-details').click(function () {
        $(".Name").text("Name");
        $(".Website").text("Website");
        $(".paperId").val($(this).data('id'));
        $("#paperNameedit").val($(this).data('name'));
        $("#websiteedit").val($(this).data('website'));
        $("#paperKeywordsedit").val($(this).data('keywords'));
        $("#abstractdateEdit").val($(this).data('abstract'));
        $("#fulldateEdit").val($(this).data('fulldate'));
        var id = $(this).data('id');
        GetAttAndTem(id);
    });

    // action on PhDchapter section 
    $('#PhDchapter-add').click(function () {
        $("#PaperType").val("PhDchapter");
        $("#modal-paper-label").text("Add PhD chapter");
        $(".Name").text("Name");
        $(".Website").text("Website");
        $(".templates").removeAttr("disabled");
        $(".attachements").removeAttr("disabled");
    });
    $('.PhDchapter-details').click(function () {
        $(".Name").text("Name");
        $(".Website").text("Website");
        $(".paperId").val($(this).data('id'));
        $("#paperNameedit").val($(this).data('name'));
        $("#websiteedit").val($(this).data('website'));
        $("#paperKeywordsedit").val($(this).data('keywords'));
        $("#abstractdateEdit").val($(this).data('abstract'));
        $("#fulldateEdit").val($(this).data('fulldate'));
        var id = $(this).data('id');
        GetAttAndTem(id);
    });

    // datepicker  
    $('#dp1').datepicker();
    $('#dp2').datepicker();
    $('#dp3').datepicker();
    $('#dp4').datepicker();


    // swich betwen file and link  
    $("#optionsRadios1").click(function () {
        $("#PaperFile").removeClass("hidden");
        $("#Paperlink").addClass("hidden");
        $("#Paperlink").val("");
        $("#Paper").val("");
    });
    $("#optionsRadios2").click(function () {
        $("#Paperlink").removeClass("hidden");
        $("#PaperFile").addClass("hidden");
        $("#PaperFile").val("");
        $("#Paper").val("");
    });
    $("#PaperFile").change(function () {
        $("#Paper").val($("#PaperFile").val());
    });
    $("#Paperlink").change(function () {
        $("#Paper").val($("#Paperlink").val());
    });

    // validation fix  


    $(".form-horizontal").validate({
        errorLabelContainer: ".validation-summary-errors", wrapper: "li",
        rules: {
            image: { required: true, accept: "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf" }
        },
        messages: {
            image: { required: 'Required!', accept: 'Not a valid Type!' }
        }
    });




    //$.validator.addMethod("enddate", function (value, element) {
    //    var startdatevalue = $('.startdate').val();
    //    return Date.parse(parseDate(startdatevalue)) < Date.parse(parseDate(value));
    //}, "Deadline full paper should be greater than Deadline abstract.");

    //$.validator.addMethod("enddate2", function (value, element) {
    //    var startdatevalue = $('.startdate2').val();
    //    return Date.parse(parseDate(startdatevalue)) < Date.parse(parseDate(value));
    //}, "Deadline full paper should be greater than Deadline abstract.");

    //$.validator.addMethod("greterThenNow", function (value, element) {
    //    return Date.now() < Date.parse(parseDate(value));
    //}, "Deadline date should be greater than current date.");

    //add icons
    $('.bar-warning span').addClass("icon-warning-sign");
    $('.bar-finish span').addClass("icon-ok");

    var allowSubmit = true;
    $(".form-horizontal").submit(function (e) {
        if (!allowSubmit) return false;
        allowSubmit = false;
        setTimeout(function () { allowSubmit = true; }, 7000);

        // your existing submit code here
        // requesting my data..
    });

    // version table settings
    $('#versions-table').dataTable({
        sDom: "<'row-fluid'r>t<'row-fluid'>",
        sPaginationType: "bootstrap",
        bPaginate: false,
        bJQueryUI: true,
        bLengthChange: false,
        bFilter: false,
        bSort: false,
        bInfo: false,
        bAutoWidth: true,
        bProcessing: true,
        aoColumns: [
            {
                sName: "Id",
                bVisible: false,
                mDataProp: "Id"
            },
            {
                sName: "Version",
                mDataProp: "Version"
            },
            {
                sName: "User",
                mDataProp: "User"
            },
            {
                sName: "Size",
                mDataProp: "Size",
                "fnRender": function (oObj) {
                    return '<a href="Home/DownloadRevision?id=' + $(".paperId").val() + '&rev=' + oObj.aData['Id'] + '">' + oObj.aData['Size'] + '</a>';
                }
            }
        ]
    });

    // paper table settings
    $('.mypaper-table').dataTable({
        "sDom": "t",
        "bPaginate": false,
        "aoColumns": [
          null,
          null,
          null,
          null,
          {
              "bSortable": false,
              "sWidth": 100,
          },
          {
              "bSortable": false,
              "sWidth": 100
          },
        ]
    });
    //autocpmplete
    //Journal
    // var _website = $('#Website');

    // if ($('#PaperType').val() == "Journal") {
    $("#PaperName").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Paper/GetNameAndWebsite",//?Name=" + $(this).val(value),
                data: {
                    Name: request.term,
                    papertype: $('#PaperType').val()
                },
                success: function (data) {
                    response($.map(data.journaldata, function (item) {
                        if ($('#PaperType').val() == "Journal")
                            return {
                                label: item.JournalName,
                                value: item.JournalName,
                                hidden: item.Website
                            }
                        if ($('#PaperType').val() == "Conference")
                            return {
                                label: item.ConferenceName,
                                value: item.ConferenceName,
                                hidden: item.DeadlineAbstract,
                                DeadlineFull: item.DeadlineFull,
                                Website: item.Website,
                                Keywords: item.Keywords

                            }
                        //  return false;
                    }));
                },
                error: function (e) {
                    alert("error");
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            if ($('#PaperType').val() == "Journal")
                $('#Website').val(ui.item.hidden);
            if ($('#PaperType').val() == "Conference") {
                $('#Keywords').val(ui.item.Keywords);
                $('#Website').val(ui.item.Website);
                $('#DeadlineAbstract').val(ui.item.DeadlineAbstract);
                $('#DeadlineFull').val(ui.item.DeadlineFull);
            }
            "Nothing selected, input was " + this.value;
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
    // if ($('#PaperType').val() == "Conference") {
    //Conference Paper
    //    $("#PaperName").autocomplete({
    //        source: function (request, response) {
    //            $.ajax({
    //                url: "/Paper/GetNameAndWebsite",//?Name=" + $(this).val(value),
    //                //dataType: "jsonp",
    //                data: {
    //                    //featureClass: "P",
    //                    //style: "full",
    //                    //maxRows: 12,
    //                    //name_startsWith: request.term
    //                    Name: request.term
    //                },
    //                success: function (data) {
    //                    response($.map(data.journaldata, function (item) {
    //                        return {
    //                            label: item.JournalName,
    //                            value: item.JournalName,
    //                            hidden: item.Website
    //                        }
    //                    }));
    //                },
    //                error: function (e) {
    //                    alert("error");
    //                }
    //            });
    //        },
    //        minLength: 2,
    //        select: function (event, ui) {
    //            $('#Website').val(ui.item.hidden);
    //            //    log(ui.item ?
    //            //      "Selected: " + ui.item.label :
    //            //      "Nothing selected, input was " + this.value);
    //        },
    //        open: function () {
    //            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
    //        },
    //        close: function () {
    //            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
    //        }
    //    });
    //}
});
