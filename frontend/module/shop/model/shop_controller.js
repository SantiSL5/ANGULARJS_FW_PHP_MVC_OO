function set_api() {
    var language = localStorage.getItem("lang");
    $("<div></div>").attr({ "id": "map" }).appendTo("#details");
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY_GMAPS + "&language=" + language + "&callback=initMap";
    script.async;
    script.defer;
    document.getElementsByTagName('script')[0].parentNode.appendChild(script);
}

function rangeSlider() {
    friendlyURL('?page=shop&op=rangeslider').then(function(url) {
        ajaxPromise(url,'POST','JSON').then(function(datarange){
            localStorage.setItem('minrange', Number(datarange[0]['minim']));
            localStorage.setItem('maxrange', Number(datarange[0]['maxim']));
            $( "#slider-range" ).slider({
                range: true,
                min: Number(datarange[0]['minim']),
                max: Number(datarange[0]['maxim']),
                values: [ datarange[0]['minim'], datarange[0]['maxim'] ],
                slide: function( event, ui ) {
                $( "#amount" ).val(ui.values[ 0 ] + "€ - " + ui.values[ 1 ] + "€" );
                minrange=ui.values[0];
                maxrange=ui.values[1];
                }
            });
            $( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) + "€ - " + $( "#slider-range" ).slider( "values", 1 ) + "€");
            listallproducts(1);
        }).catch(function(textStatus){
            console.log(textStatus);
        });
    });
}

function loadPagelist() {
    $('<div></div>').attr({'id':'sidebar'}).appendTo('#shop');
    $('<div></div>').attr({'id':'container-products'}).appendTo('#shop');
    $('<form></form>').attr({'id':'filters_form'}).appendTo('#sidebar');
    $('<div></div>').attr({'id':'filters'}).appendTo('#filters_form');
    $('<input/>').attr({'id':'amount','type':'text'}).prop("readonly", true).appendTo('#filters');
    $('<div></div>').attr({'id':'slider-range'}).appendTo('#filters');

    $('<select></select>').attr({'id':'plataforms','name':'plataforms'}).appendTo('#filters');
    $('<option></option>').attr({'value':''}).text('--Select a plataform--').appendTo('#plataforms');

    friendlyURL('?page=shop&op=plataforms').then(function(url) {
        ajaxPromise(url,'GET','JSON').then(function(data){
            for (let i = 0; i < data.length; i++) {
                $('<option></option>').attr({'value':data[i]['plataforma']}).text(data[i]['plataforma']).appendTo('#plataforms');
            }
        }).catch(function(textStatus){
            console.log(textStatus);
        });
    });
    $('<select></select>').attr({'id':'age','name':'age'}).appendTo('#filters');
    $('<option></option>').attr({'value':''}).text('--Select a age--').appendTo('#age');
    $('<option></option>').attr({'value':'3'}).text('3').appendTo('#age');
    $('<option></option>').attr({'value':'7'}).text('7').appendTo('#age');
    $('<option></option>').attr({'value':'12'}).text('12').appendTo('#age');
    $('<option></option>').attr({'value':'16'}).text('16').appendTo('#age');
    $('<option></option>').attr({'value':'18'}).text('18').appendTo('#age');
    $('<select></select>').attr({'id':'genero','name':'genero'}).appendTo('#filters');
    $('<option></option>').attr({'value':''}).text('--Select a genre--').appendTo('#genero');
    friendlyURL('?page=shop&op=categories').then(function(url) {
        ajaxPromise(url,'GET','JSON').then(function(data){
            for (let i = 0; i < data.length; i++) {
                $('<option></option>').attr({'value':data[i]['category_name']}).text(data[i]['category_name']).appendTo('#genero');
            }
        }).catch(function(textStatus){
            console.log(textStatus);
        });
    });
    $('<div></div>').attr({'id':'filters_buttons'}).appendTo('#filters_form');
    $('<button></button>').attr({'id':'applyfilters','name':'Filter','type':'button'}).text('Filter').appendTo('#filters_buttons');
    $('<button></button>').attr({'id':'clearfilters','name':'Clear','type':'button'}).text('Clear').appendTo('#filters_buttons');
    $('<div></div>').attr({'id':'pagination'}).insertAfter("#shop");
}

function printProducts(numberofpages,limit,offset,data) {
    token=get_token();
    $('#container-products').empty();
    if (data.length==1) {
        $('<p></p>').text('No products found').appendTo('#container-products');
    }else{
        if (((offset-1)*limit)+4>data.length-1) {
            
            for (let i = ((offset-1)*limit)+1; i <= data.length-1; i++) {
                // $('#'+data[i].id+' .divbutton').empty();
                $('<div></div>').attr({'id':data[i].id,'class':'card'}).appendTo('#container-products');
                $('<img></img>').attr({'src':data[i].img}).appendTo('#'+data[i].id);
                $('<div></div>').attr({'class':'infodiv'}).appendTo('#'+data[i].id);
                $('<ul></ul>').attr({'class':'infodiv'}).appendTo('#'+data[i].id+' .infodiv');
                $('<li></li>').text(data[i].nombre).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].plataforma).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].clasificacion).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].estado).appendTo('#'+data[i].id+' .infodiv ul');
                $('<div></div>').attr({'class':'divbutton'}).appendTo('#'+data[i].id);
                $('<span></span>').attr({'id':'likes'+data[i].id,'class':'likes'}).text(data[i].likes).appendTo('#'+data[i].id+' .divbutton');
                if (token===null) {
                    $('<img></img>').attr({'src':'/module/shop/view/img/heart.png','id':data[i].id,'class':'not_like'}).appendTo('#'+data[i].id+' .divbutton');
                    $('<span></span>').attr({'class':'views'}).text(data[i].views).appendTo('#'+data[i].id+' .divbutton');
                    $('<img></img>').attr({'src':'/module/shop/view/img/eye.png','class':'eye'}).appendTo('#'+data[i].id+' .divbutton');
                    $('<span></span>').attr({'class':'price'}).text(data[i].precio+'€').appendTo('#'+data[i].id+' .divbutton');
                    $('<button></button>').attr({'id':data[i].id,'class':'showdetails'}).text('Show details').appendTo('#'+data[i].id+' .divbutton');
                    $('<img></img>').attr({'id':'cart-'+data[i].id,'src':'module/menu/view/img/cart.png','style':'height: 30px;','class':'cartbtn_shop'}).appendTo('#'+data[i].id+' .divbutton');
                }else{
                    friendlyURL('?page=shop&op=showlike').then(function(url) {
                        ajaxPromise(url, 'POST', 'JSON',{'token':token,'idproduct':data[i].id}).then(function(datalike){
                            check_validtoken(datalike['invalid_token'],datalike['token']);
                            if (datalike['like'] == true) {
                                $('<img></img>').attr({'src':'/module/shop/view/img/heart_like.png','id':data[i].id,'class':'like'}).appendTo('#'+data[i].id+' .divbutton');
                            }else{
                                $('<img></img>').attr({'src':'/module/shop/view/img/heart.png','id':data[i].id,'class':'not_like'}).appendTo('#'+data[i].id+' .divbutton');
                            }
                            $('<span></span>').attr({'class':'views'}).text(data[i].views).appendTo('#'+data[i].id+' .divbutton');
                            $('<img></img>').attr({'src':'/module/shop/view/img/eye.png','class':'eye'}).appendTo('#'+data[i].id+' .divbutton');
                            $('<span></span>').attr({'class':'price'}).text(data[i].precio+'€').appendTo('#'+data[i].id+' .divbutton');
                            $('<button></button>').attr({'id':data[i].id,'class':'showdetails'}).text('Show details').appendTo('#'+data[i].id+' .divbutton');
                            $('<img></img>').attr({'id':'cart-'+data[i].id,'src':'module/menu/view/img/cart.png','style':'height: 30px;','class':'cartbtn_shop'}).appendTo('#'+data[i].id+' .divbutton');
                        }).catch(function(textStatus){
                            console.log(textStatus);
                        });
                    });
                }
            }
        }else{
            for (let i = ((offset-1)*limit)+1; i <= ((offset-1)*limit)+limit; i++) {
                // $('#'+data[i].id+' .divbutton').empty();
                $('<div></div>').attr({'id':data[i].id,'class':'card'}).appendTo('#container-products');
                $('<img></img>').attr({'src':data[i].img}).appendTo('#'+data[i].id);
                $('<div></div>').attr({'class':'infodiv'}).appendTo('#'+data[i].id);
                $('<ul></ul>').attr({'class':'infodiv'}).appendTo('#'+data[i].id+' .infodiv');
                $('<li></li>').text(data[i].nombre).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].plataforma).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].clasificacion).appendTo('#'+data[i].id+' .infodiv ul');
                $('<li></li>').text(data[i].estado).appendTo('#'+data[i].id+' .infodiv ul');
                $('<div></div>').attr({'class':'divbutton'}).appendTo('#'+data[i].id);
                $('<span></span>').attr({'id':'likes'+data[i].id,'class':'likes'}).text(data[i].likes).appendTo('#'+data[i].id+' .divbutton');
                if (token===null) {
                    $('<img></img>').attr({'src':'/module/shop/view/img/heart.png','id':data[i].id,'class':'not_like'}).appendTo('#'+data[i].id+' .divbutton');
                    $('<span></span>').attr({'class':'views'}).text(data[i].views).appendTo('#'+data[i].id+' .divbutton');
                    $('<img></img>').attr({'src':'/module/shop/view/img/eye.png','class':'eye'}).appendTo('#'+data[i].id+' .divbutton');
                    $('<span></span>').attr({'class':'price'}).text(data[i].precio+'€').appendTo('#'+data[i].id+' .divbutton');
                    $('<button></button>').attr({'id':data[i].id,'class':'showdetails'}).text('Show details').appendTo('#'+data[i].id+' .divbutton');
                    $('<img></img>').attr({'id':'cart-'+data[i].id,'src':'module/menu/view/img/cart.png','style':'height: 30px;','class':'cartbtn_shop'}).appendTo('#'+data[i].id+' .divbutton');
                }else{
                    friendlyURL('?page=shop&op=showlike').then(function(url) {
                        ajaxPromise(url, 'POST', 'JSON',{'token':token,'idproduct':data[i].id}).then(function(datalike){
                            check_validtoken(datalike['invalid_token'],datalike['token']);
                            if (datalike['like'] == true) {
                                $('<img></img>').attr({'src':'/module/shop/view/img/heart_like.png','id':data[i].id,'class':'like'}).appendTo('#'+data[i].id+' .divbutton');
                            }else{
                                $('<img></img>').attr({'src':'/module/shop/view/img/heart.png','id':data[i].id,'class':'not_like'}).appendTo('#'+data[i].id+' .divbutton');
                            }
                            $('<span></span>').attr({'class':'views'}).text(data[i].views).appendTo('#'+data[i].id+' .divbutton');
                            $('<img></img>').attr({'src':'/module/shop/view/img/eye.png','class':'eye'}).appendTo('#'+data[i].id+' .divbutton');
                            $('<span></span>').attr({'class':'price'}).text(data[i].precio+'€').appendTo('#'+data[i].id+' .divbutton');
                            $('<button></button>').attr({'id':data[i].id,'class':'showdetails'}).text('Show details').appendTo('#'+data[i].id+' .divbutton');
                            $('<img></img>').attr({'id':'cart-'+data[i].id,'src':'module/menu/view/img/cart.png','style':'height: 30px;','class':'cartbtn_shop'}).appendTo('#'+data[i].id+' .divbutton');
                        }).catch(function(textStatus){
                            console.log(textStatus);
                        });
                    });
                }
            }
        }          
    }
}

function loadPagination(numberofpages,limit,offset,data) {
    $('#pagination').empty();
    if (offset==1) {
        $("<button></button>").attr({ "id": "pag-back"}).text('<').prop("disabled",true).appendTo("#pagination");
    }else {
        $("<button></button>").attr({ "id": "pag-back"}).text('<').appendTo("#pagination");
    }
    
    $("<button></button>").attr({ "class": "actual-page", "data": offset }).text(offset).appendTo("#pagination");
    if (offset+3>numberofpages) {
        for (let i = 1; i <= numberofpages-offset; i++) {
            $("<button></button>").attr({ "class": "page", "data": offset+i }).text(offset+i).appendTo("#pagination");
        }
    }else if (offset+3<=numberofpages) {
        for (let i = 1; i <= 3; i++) {
            $("<button></button>").attr({ "class": "page", "data": offset+i }).text(offset+i).appendTo("#pagination");
        }
    }
    if (offset==numberofpages) {
        $("<button></button>").attr({ "id": "pag-next"}).text('>').prop("disabled",true).appendTo("#pagination");
    }else {
        $("<button></button>").attr({ "id": "pag-next"}).text('>').appendTo("#pagination");
    }
}

function listallproducts(offset) {

    if (sessionStorage.getItem('search')!=null) {
        localStorage.setItem('search', sessionStorage.getItem('search'));
        sessionStorage.removeItem('search');
    }
    if (sessionStorage.getItem('genero')!=null) {
        localStorage.setItem('genero', sessionStorage.getItem('genero'));
        sessionStorage.removeItem('genero');
    }
    if (sessionStorage.getItem('plataform')!=null) {
        localStorage.setItem('plataform', sessionStorage.getItem('plataform'));
        sessionStorage.removeItem('plataform');
    }
    if (localStorage.getItem('plataform')===null) {
        localStorage.setItem('plataform', $("#plataforms").val());
    }
    if (localStorage.getItem('age')===null) {
        localStorage.setItem('age', $("#age").val());
    }
    if (localStorage.getItem('genero')===null) {
        localStorage.setItem('genero', $("#genero").val());
    }

    // console.log("m"+localStorage.getItem('minrange'));
    // console.log("M"+localStorage.getItem('maxrange'));
    // console.log("p "+localStorage.getItem('plataform'));
    // console.log("a"+localStorage.getItem('age'));
    // console.log("g "+sessionStorage.getItem('genero'));
    friendlyURL('?page=shop&op=listall').then(function(url) {
        ajaxPromise(url,'POST','JSON',{minrange:localStorage.getItem('minrange'),maxrange:localStorage.getItem('maxrange'),plataform:localStorage.getItem('plataform'),age:localStorage.getItem('age'),genero:localStorage.getItem('genero'),search:localStorage.getItem('search')}).then(function(data){
            limit=8;
            numberofpages=Math.ceil((data.length-1) / 8);

            $(document).on("click", "#pag-back" ,function(){
                if (offset!=1) {
                    offset--;
                    $('#container-products').empty();
                    loadPagination(numberofpages,limit,offset,data);
                    printProducts(numberofpages,limit,offset,data);
                }
            });

            $(document).on("click", "#pag-next" ,function(){
                if (offset!=numberofpages) {
                    offset++;
                    $('#container-products').empty();
                    loadPagination(numberofpages,limit,offset,data);
                    printProducts(numberofpages,limit,offset,data);
                }
            });

            $(document).on("click", ".page" ,function(){
                if (offset!=numberofpages) {
                    $('#container-products').empty();
                    offset=Number(this.getAttribute("data"));
                    loadPagination(numberofpages,limit,offset,data);
                    printProducts(numberofpages,limit,offset,data);
                }
            });
            loadPagination(numberofpages,limit,offset,data);
            printProducts(numberofpages,limit,offset,data);
        }).catch(function(textStatus){
                console.log(textStatus);
        });
    });
};

function like() {
    $(document).on("click", ".like" ,function(){
        videogameid = $(this).attr('id');
        if (check_logued() == true) {
            friendlyURL('?page=shop&op=like').then(function(url) {
                ajaxPromise(url, 'POST', 'JSON',{'token':token,'idproduct':videogameid}).then(function(datalike){
                    check_validtoken(datalike['invalid_token'],datalike['token']);
                }).catch(function(textStatus){
                    console.log(textStatus);
                });
            });
            $(this).attr({'src':'/module/shop/view/img/heart.png','class':'not_like'});
            likes=parseInt($("#likes"+videogameid).text());
            $("#likes"+videogameid).text(likes-1);
        }
    });

    $(document).on("click", ".not_like" ,function(){
        videogameid = $(this).attr('id');
        if (token===null) {
            window.location.href = 'index.php?page=login';
        }else{
            friendlyURL('?page=shop&op=like').then(function(url) {
                ajaxPromise(url, 'POST', 'JSON',{'token':token,'idproduct':videogameid}).then(function(datalike){
                    check_validtoken(datalike['invalid_token'],datalike['token']);
                }).catch(function(textStatus){
                    console.log(textStatus);
                });
            });
            $(this).attr({'src':'/module/shop/view/img/heart_like.png','class':'like'});
            likes=parseInt($("#likes"+videogameid).text());
            $("#likes"+videogameid).text(likes+1);
        }
    });
}

function filter() {
    $(document).on("click", "#applyfilters" ,function(){
        localStorage.setItem('minrange', Number($("#slider-range").slider( "values", 0 )));
        localStorage.setItem('maxrange', Number($("#slider-range").slider( "values", 1 )));
        localStorage.setItem('plataform', $("#plataforms").val());
        localStorage.setItem('age', $("#age").val());
        localStorage.setItem('genero', $("#genero").val());
        $('#container-products').empty();
        listallproducts(1);
    });
}

function clearfilters() {
    $(document).on("click", "#clearfilters" ,function(){
        localStorage.setItem('minrange', Number($("#slider-range").slider( "values", 0 )));
        localStorage.setItem('maxrange', Number($("#slider-range").slider( "values", 1 )));
        localStorage.setItem('plataform', "");
        localStorage.setItem('age', "");
        localStorage.setItem('genero', "");
        localStorage.removeItem('search');
        location.reload();
    });
}

function redirectDetails() {
    $(document).on("click", ".showdetails" ,function(){
        sessionStorage.setItem('currentPage', 'shop-details');
        sessionStorage.setItem('id', this.getAttribute('id'));
        location.reload();
    });
}

function cleanDetails() {
    $(document).on("click", ".cleandetails" ,function(){
        sessionStorage.setItem('currentPage', 'shop');
        location.reload();
    });

    $(document).on("click", ".nav-item" ,function(){
        sessionStorage.removeItem('currentPage');
    });
}



function initMap() {
    const shop = { lat: 38.821989, lng: -0.608746 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 18,
      center: shop,
    });
    const marker = new google.maps.Marker({
      position: shop,
      map: map,
    });
}

function cartbtnShop() {
    $(document).on("click", "img.cartbtn_shop" ,function(){
        arrayid = $(this).attr('id').split('-');
        videogameid = arrayid[1];
        if (token===null) {
            window.location.href = 'index.php?page=login';
        }else{
            friendlyURL('?page=cart&op=addQuant').then(function(url) {
                ajaxPromise(url, 'POST', 'JSON',{'token':token,'idproduct':videogameid}).then(function(data){
                    check_validtoken(data['invalid_token'],data['token']);
                    if (data['result']==1) {
                        toastr.info("Producto añadido al carrito");
                        refresh_numproducts_cart();
                    }else if (data['result']==0){
                        toastr.error("No puedes comprar mas del stock máximo");
                    }else if (data['result']==null){
                        location.reload();
                    }
                }).catch(function(textStatus){
                    console.log(textStatus);
                });
            });
        }
    });
}
 

function showDetails() {
    friendlyURL('?page=shop&op=details').then(function(url) {
        ajaxPromise(url, 'POST', 'JSON',{'id':sessionStorage.getItem('id')}).then(function(data) {
            token=get_token();
            $('#shop').empty();
            $('<div></div>').attr({'id':'details'}).appendTo('#shop');
            $('<h1></h1>').text(data[0].nombre).appendTo('#details');
            $('<img></img>').attr({'src':data[0].img}).appendTo('#details');
            $('<div></div>').attr({'class':'infodivdetails'}).appendTo('#details');
            $('<ul></ul>').attr({'class':'infodivdetails'}).appendTo('#details .infodivdetails');
            $('<h2></h2>').text('State: '+data[0].estado).appendTo('#details .infodivdetails ul');
            $('<h2></h2>').text('Company: '+data[0].companyia).appendTo('#details .infodivdetails ul');
            $('<h2></h2>').text('Plataforma: '+data[0].plataforma).appendTo('#details .infodivdetails ul');
            $('<h2></h2>').text('Clasification: '+data[0].clasificacion).appendTo('#details .infodivdetails ul');
            $('<h2></h2>').text('Clasification: '+data[0].precio).appendTo('#details .infodivdetails ul');
            $('<h2></h2>').attr({'id':"likes"+data[0].id,'class':'likes'}).text(data[0].likes).appendTo('#details .infodivdetails ul');
            if (token === null) {
                $('<img></img>').attr({'src':'/module/shop/view/img/heart.png','id':data[0].id,'class':'not_like'}).text(data[0].views).appendTo('#details .infodivdetails ul');
                $('<span></span>').attr({'id':'spanviews'}).appendTo('#details .infodivdetails ul');
                $('<h2></h2>').attr({'class':'views'}).text(data[0].views).appendTo('#spanviews');
                $('<img></img>').attr({'src':'/module/shop/view/img/eye.png','class':'eye'}).appendTo('#spanviews');
                $('<h2></h2>').attr({'class':'price'}).text(data[0].precio+'€').appendTo('#details .infodivdetails ul');
                set_api();
                $('<button></button>').attr({'class':'cleandetails'}).text('Return').appendTo('#details');
            }else{
                friendlyURL('?page=shop&op=showlike').then(function(url) {
                    ajaxPromise(url, 'POST', 'JSON',{'token':token,'idproduct':data[0].id}).then(function(datalike){
                        check_validtoken(datalike['invalid_token'],datalike['token']);
                        if (datalike['like']) {
                            $('<img></img>').attr({'src':'/module/shop/view/img/heart_like.png','id':data[0].id,'class':'like'}).text(data[0].views).appendTo('#details .infodivdetails ul');
                        }else{
                            $('<img></img>').attr({'src':'/module/shop/view/img/heart.png','id':data[0].id,'class':'not_like'}).text(data[0].views).appendTo('#details .infodivdetails ul');
                        }
                        $('<span></span>').attr({'id':'spanviews'}).appendTo('#details .infodivdetails ul');
                        $('<h2></h2>').attr({'class':'views'}).text(data[0].views).appendTo('#spanviews');
                        $('<img></img>').attr({'src':'/module/shop/view/img/eye.png','class':'eye'}).appendTo('#spanviews');
                        $('<h2></h2>').attr({'class':'price'}).text(data[0].precio+'€').appendTo('#details .infodivdetails ul');
                        set_api();
                        $('<button></button>').attr({'class':'cleandetails'}).text('Return').appendTo('#details');
                        $('<img></img>').attr({'id':'cart-'+data[0].id,'src':'module/menu/view/img/cart.png','style':'height: 40px;','class':'cartbtn_shop'}).appendTo('#details');
                    }).catch(function(textStatus){
                        console.log(textStatus);
                    });
                });
            }

            // $('<div><div>').attr({'class': 'top-photo'}).appendTo('.top-details');
            // $('<div></div>').attr({'class': 'container separe-menu', 'id': 'container-shop-details'}).appendTo('.content');
            
        }).catch(function(textStatus) {
            console.log(textStatus);
            // window.location.href = 'index.php?page=503';
        });
    });
}

function loadContent(){
    $('#shop').empty();
    switch (sessionStorage.getItem('currentPage')) {
        case 'shop-details':
            showDetails();
            cleanDetails();
            like();
            cartbtnShop();
            break;
        default:
            loadPagelist();
            rangeSlider();
            redirectDetails();
            cleanDetails();
            filter();
            clearfilters();
            like();
            cartbtnShop();
            break;
    }
}

$(document).ready(function() {
    loadContent();
});
