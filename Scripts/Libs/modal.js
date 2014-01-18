/* Accordion toggle text change to Done
----------------------------------------------------------------------------------------------------*/
$('a.accordion-toggle').click(function() {
    if ( $(this).next('.accordion-body').hasClass('in') ) {
        $(this).text('Show me how');
    } else {
        $(this).text('Done');
    }
});


/* Option Select
----------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
    $('#manager').change(function(){
        var location = $(this).val(),
        div = $('#' + location);

        $('div.refferences').hide();
            div.show();
       
    });
    
});