//<!-- start Mixpanel -->
//<script type="text/javascript">
(function (e, b) {
    if (!b.__SV) {
        var a, f, i, g; window.mixpanel = b; a = e.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = ("https:" === e.location.protocol ? "https:" : "http:") + '//cdn.mxpnl.com/libs/mixpanel-2.2.min.js'; f = e.getElementsByTagName("script")[0]; f.parentNode.insertBefore(a, f); b._i = []; b.init = function (a, e, d) {
            function f(b, h) { var a = h.split("."); 2 == a.length && (b = b[a[0]], h = a[1]); b[h] = function () { b.push([h].concat(Array.prototype.slice.call(arguments, 0))) } } var c = b; "undefined" !==
            typeof d ? c = b[d] = [] : d = "mixpanel"; c.people = c.people || []; c.toString = function (b) { var a = "mixpanel"; "mixpanel" !== d && (a += "." + d); b || (a += " (stub)"); return a }; c.people.toString = function () { return c.toString(1) + ".people (stub)" }; i = "disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" "); for (g = 0; g < i.length; g++) f(c, i[g]);
            b._i.push([a, e, d])
        }; b.__SV = 1.2
    }
})(document, window.mixpanel || []);
mixpanel.init("03f0a4da7b528fd94b600bb62ad03e68");
//</script><!-- end Mixpanel -->

$(function () {
    $('img[src="/content/images/bohr/sad.png"]').click(function () {
        mixpanel.track("Not happy");
    });

    $(".registration-form-click").click(function () {
        if ($(".registration-form").valid()) {
            mixpanel.people.set({
                'User name': $("#UserName").val(),
                'Creation Date': new Date()
            });

            // identify must be called along with people.set
            mixpanel.identify($("#Email").val());

            mixpanel.track("SingUp", {
                "Academic Title": $('#Title').val(),
                "Main Affiliation": $('#Affiliation').val(),
                "University Email": $('#UniversityEmail').val(),
                "Main ResearchTopic": $('#Topics').val(),
                "What refernce manager": $('#ReferenceManager').val()
            },
            function () {
                $(".registration-form").submit();
            })
        }
    });

    $('.submit-upload-click').click(function () {
        mixpanel.track("Upload Paper", {
            "FileName": $(".submit-upload-form").find('input').val().replace('C:\\fakepath\\', ''),
            "Topic": $(".submit-upload-form").find('select').val()
        },
        function () {
            $('.submit-upload-form').submit();
        });
    });

    $('.bar-warning').each(function () {
        mixpanel.track("2 weeks left", {
            "Id": $(this).parents('tr').find('.journal-details').data('id'),
            "NamePaper": $(this).parents('tr').find('.journal-details').data('name'),
            "Website": $(this).parents('tr').find('.journal-details').data('website'),
            "Keywords": $(this).parents('tr').find('.journal-details').data('keywords'),
            "DeadlineAbstract": $(this).parents('tr').find('.journal-details').data('abstract'),
            "DeadlineFull": $(this).parents('tr').find('.journal-details').data('fulldate')
        })
    });

    $('.submit-add-revision-click').click(function () {
        mixpanel.track("Add New version", {
            "File": $('#modal-revision input[name="revisionFile"]').val().replace('C:\\fakepath\\', '')
        },
        function () {
            $('.submit-add-revision-form').submit();
        })
    });

    $(".add-new-paper-click").click(function () {
        if ($(".add-new-paper-form").valid()) {
            mixpanel.track("Add New Paper", {
                "NamePaper": $('#PaperName').val(),
                "DeadlineAbstract": $('#DeadlineAbstract').val(),
                "DeadlineFull": $('#DeadlineFull').val(),
                "JournalName": $('#Name').val(),
                "Keywords": $('#Keywords').val(),
                "File": $('#Paper').val().replace('C:\\fakepath\\', ''),
                "Templates": $('input[name="Templates"]').first().val().replace('C:\\fakepath\\', ''),
                "Attachements": $('input[name="Attachements"]').first().val().replace('C:\\fakepath\\', ''),
                "Website": $('#Website').val()
            },
              function () {
                  $(".add-new-paper-form").submit();
              })
        }
    });
});