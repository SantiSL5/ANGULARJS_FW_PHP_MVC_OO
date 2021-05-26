function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}

function logoutbtn_navclick(){
    $('#logoutbtn-nav').on('click', function() {
        location.reload();
        logout();
    });
}

function get_token(){
    token = localStorage.getItem('token');
    return token;
}

function check_logued(){
    token = localStorage.getItem('token');
    if (token == null) {
        window.location.href = '/login';
    }else{
        return true;
    }
}

function check_validtoken(check_validtoken,token){
    if (check_validtoken == true) {
        logout();
        alert("Sesión no válida, vuelva a iniciar sesión");
        location.reload();
    }else{
        localStorage.setItem('token', token);
    }
}

function logout() {
    localStorage.removeItem('token');
}

function friendlyURL(url) {
    return new Promise(function(resolve, reject) {
        //////
        $.ajax({
            url: 'http://' + window.location.hostname + '/paths.php?op=get',
            type: 'POST',
            dataType: 'JSON'
        }).done(function(data) {
            let link = "";
            if (data === true) {
                url = url.replace("?", "");
                url = url.split("&");
                for (let i = 0; i < url.length; i++) {
                    let aux = url[i].split("=");
                    link +=  "/" + aux[1];
                }// end_for
            }else {
                link = '/' + url;
            }// end_else
            resolve ("http://" + window.location.hostname + link);
        }).fail(function(error) {
            reject (error);
        });
    }); 
}// end_friendlyURL


