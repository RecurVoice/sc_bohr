function Message(val, key) {
    $("#content").prepend('<div class="alert alert-' + key + '"><button type="button" class="close" data-dismiss="alert">x</button>' + val + '</div>');
};

function RemoveNote(id) {

    $.ajax({
        url: '/Reference/NoteRemove',
        data: {
            id: id
        },
        success: function (data) {
            if (data.result) {
                var row = $(".note-table tbody tr").find("[data-val='" + id + "']").parent().parent();
                if (row.hasClass("selected")) {
                    tinyMCE.activeEditor.setContent("");
                    $("#Save-curent-note").addClass("disabled");
                }
                row.remove();
                //Message(data.message, "success");
            } else {
                Message(data.message, "error");
            }
        },
        error: function (data) {
            Message(data.status + ". " + data.statusText, "error");
        },
        type: 'POST',
        dataType: 'json'
    });
};

function SaveNote(id, body) {
    var page = PDFView.page;
    $.ajax({
        url: '/Reference/NoteSave',
        data: {
            body: body,
            page: page,
            referenceId: referenceId,
            id: id
        },
        success: function (data) {
            if (data.result) {
                if (id == 0) {
                    var count = $("#list > li").last().data("id");
                    count++;
                    $("#list").append('<li data-id="' + count + '">' +
                    '<span class="note">' + data.body + '</span>' +
                    '<span class="item-control"> <span>Page ' + data.page + ' &nbsp;</span>' +
                    '<a href="#" class="changeLink" data-val="' + data.id + '">Edit</a> &nbsp; ' +
                    '<a href="#" title="delete" data-val="' + data.id + '" class="DeleteLink">Delete</a> ' +
                    '</span> </li>');

                }
            } else {
                Message(data.message, "error");
            }
        },
        error: function (data) {
            Message(data.status + ". " + data.statusText, "error");
        },
        type: 'POST',
        dataType: 'json'
    });
};

$(".add-note").click(function () {
    SaveNote(0, $(".new-notes").val());
});


/* Open Panel Button
----------------------------------------------------------------------------------------------------*/
$('.open').click(function () {
    $('.panels').animate({ width: 'toggle' });
});

/* Edit Notes
----------------------------------------------------------------------------------------------------*/
$('ol#list').on('click', 'a.changeLink , a.saveLink', function (e) {
    e.preventDefault();
    if ($(this).hasClass('changeLink')) {
        var li = $(this).closest('li');
        var note = li.children('span.note').text();
        li.children('span.note').empty()
            .append('<textarea class="notes" rows="3">' + note + '</textarea>');
        $(this).removeClass('changeLink')
               .addClass('saveLink').text('Save');
    }
    else if ($(this).hasClass('saveLink')) {
        var li = $(this).closest('li');
        var id = li.attr('data-id');
        var note = li.children('span.note').find('textarea').val();
        li.children('span.note').text(note);
        $(this).removeClass('saveLink')
               .addClass('changeLink').text('Edit');

        $(this).parents("li").find(".item-control > span").html("Page " + PDFView.page + " &nbsp;")
        SaveNote($(this).data("val"), $(this).parents("li").find(".note").text());
    }
});


/* Remove Notes
----------------------------------------------------------------------------------------------------*/
$('.deleteLink').click(function () {

    RemoveNote($(this).data("val"));
    $(this).parent().parent().remove();
});

/* WYSIWYG
----------------------------------------------------------------------------------------------------*/
function iFrameOn() {
    richTextField.document.designMode = 'On';
}
function iBold() {
    richTextField.document.execCommand('bold', false, null);
}
function iItalic() {
    richTextField.document.execCommand('italic', false, null);
}
function iUnderline() {
    richTextField.document.execCommand('underline', false, null);
}

