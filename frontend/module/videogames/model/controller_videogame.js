function showModal(videogameTitle, videogameid) {
    //////
    $("#details").show();
    $("#modal").dialog({
        title: videogameTitle,
        width : 600,
        height: 400,
        resizable: "true",
        modal: "true",
        hide: "fold",
        show: "explode",

        buttons : {
            Update: function() {
                        window.location.href = 'index.php?page=controller_videogame&op=update&id=' + videogameid;
                    },
            Delete: function() {
                        window.location.href = 'index.php?page=controller_videogame&op=delete&id=' + videogameid;
                    },
        }
    });
}

function loadContentModal() {
    $("#videogames_table").on("click",'a', function() {
        var videogameid = this.getAttribute('id');
        $.ajax({
            type: 'GET',
            dataType: 'JSON',
            url: 'module/videogames/controller/controller_videogame.php?op=read_modal&id=' + videogameid,
        }).done(function(jsondata) {
            $('<div></div>').attr('id', 'details', 'type', 'hidden').appendTo('#modal');
            $('<div></div>').attr('id', 'container').appendTo('#details');
            $('#container').empty();
            $('<div></div>').attr('id', 'Div1').appendTo('#container');
            $('#Div1').html(function() {
                var content = "";
                for (row in jsondata) {
                    content += '<br><span>' + row + ': <span id =' + row + '>' + jsondata[row] + '</span></span>';
                }
                return content;
                });
                //////
                showModal(videogametitle = jsondata.code + " " + jsondata.nombre, jsondata.id);
                //////
        }).fail(function() {
           //
        });
    });
}

function datepicker(){
    $('#fecha').datepicker({
        dateFormat: 'dd/mm/yy', 
        changeMonth: true, 
        changeYear: true, 
        yearRange: '1900:2030',
        onSelect: function(selectedDate) {
        }
    });
}


$(document).ready(function() {
    datepicker();
    loadContentModal();
    $('#videogames_table').DataTable();
});
// end_loadContentModal
//////