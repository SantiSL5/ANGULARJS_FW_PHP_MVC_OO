function showCart() {
    token=get_token();
    friendlyURL('?page=cart&op=listCart').then(function(url) {
        ajaxPromise(url, 'POST', 'JSON', {'token':token}).then(function(data) {
            products=data['cart_products'];
            if (products == null) {
                $('<h1></h1>').text('No hay productos en el carrito').appendTo('#checkout-cart');
            }else {
                for (let i = 0; i < products.length; i++) {
                    $('<div></div>').attr({'class':'card','id':products[i]['idvideogame']}).appendTo('#products');
                    $('<div></div>').attr({'class':'info'}).appendTo('#'+products[i]['idvideogame']);
                    $('<div></div>').attr({'class':'product-name'}).appendTo('#'+products[i]['idvideogame']+' .info');
                    $('<h1></h1>').text(products[i]['nombre']).appendTo('#'+products[i]['idvideogame']+' .product-name');
                    $('<div></div>').attr({'class':'product-info'}).appendTo('#'+products[i]['idvideogame']+' .info');
                    $('<span></span>').text('Precio unitario: '+products[i]['precio']+'€ ').appendTo('#'+products[i]['idvideogame']+' .info .product-info');
                    $('<button></button>').attr({'id':'minus-'+products[i]['idvideogame'],'class':'substractbtn'}).text('-').appendTo('#'+products[i]['idvideogame']+' .info .product-info');
                    $('<span></span>').attr({'id':'quant-'+products[i]['idvideogame']}).text(products[i]['cant']).appendTo('#'+products[i]['idvideogame']+' .info .product-info');
                    $('<button></button>').attr({'id':'plus-'+products[i]['idvideogame'],'class':'addbtn'}).text('+').appendTo('#'+products[i]['idvideogame']+' .info .product-info');
                    $('<div></div>').attr({'class':'img-product'}).appendTo('#'+products[i]['idvideogame']);
                    $('<img></img>').attr({'src':products[i]['img']}).appendTo('#'+products[i]['idvideogame']+' .img-product');
                }
                $('<span></span>').attr({'id':'total_number'}).appendTo('#checkout-cart');
                $('<button></button>').attr({'id':'checkout-btn'}).text('Checkout').appendTo('#checkout-cart');
                get_total();
                buttonsCart();
                // $('#shop').empty();
                // $('<div></div>').attr({'id':'details'}).appendTo('#checkout-cart');
                // $('<h1></h1>').text(data[i].nombre).appendTo('#details');
                // $('<img></img>').attr({'src':data[i].img}).appendTo('#details');
            }
            
        }).catch(function(textStatus) {
            console.log(textStatus);
            // window.location.href = 'index.php?page=503';
        }); 
    });
}

function get_total() {
    if (check_logued() == true) {
        friendlyURL('?page=cart&op=totalCart').then(function(url) {
            ajaxPromise(url, 'POST', 'JSON', {'token':token}).then(function(data) {
                $('#total_number').text('Total: '+data['total_cart'] + '€');
            }).catch(function(textStatus) {
                console.log(textStatus);
                // window.location.href = 'index.php?page=503';
            }); 
        }); 
    }
}

function buttonsCart() {
    $(document).on("click", ".addbtn" ,function(){
        arrayid = $(this).attr('id').split('-');
        videogameid = arrayid[1];
        if (token===null) {
            window.location.href = '/login';
        }else{
            friendlyURL('?page=cart&op=addQuant').then(function(url) {
                ajaxPromise(url, 'POST', 'JSON',{'token':token,'idproduct':videogameid}).then(function(data){
                    check_validtoken(data['invalid_token'],data['token']);
                    if (data['result']==1) {
                        $('#quant-'+videogameid).text(data['quant']);
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
        get_total();
    });

    $(document).on("click", ".substractbtn" ,function(){
        arrayid = $(this).attr('id').split('-');
        videogameid = arrayid[1];
        if (token===null) {
            window.location.href = 'index.php?page=login';
        }else{
            friendlyURL('?page=cart&op=substQuant').then(function(url) {
                ajaxPromise(url, 'POST', 'JSON',{'token':token,'idproduct':videogameid}).then(function(data){
                    if (data['result']==1) {
                        $('#quant-'+videogameid).text(data['quant']);
                    }else if (data['result']=="delete"){
                        $('#'+videogameid).remove();
                    }else if (data['result']==null){
                        location.reload();
                    }
                }).catch(function(textStatus){
                    console.log(textStatus);
                });
            });
        }
        get_total();
    });

    $(document).on("click", "#checkout-btn" ,function(){
        arrayid = $(this).attr('id').split('-');
        videogameid = arrayid[1];
        if (token===null) {
            window.location.href = 'index.php?page=login';
        }else{
            friendlyURL('?page=cart&op=checkout').then(function(url) {
                ajaxPromise(url, 'POST', 'JSON',{'token':token,'idproduct':videogameid}).then(function(data){
                    check_validtoken(data['invalid_token'],data['token']);
                    alert("Compra realizada");
                    window.location.href = '/shop';
                }).catch(function(textStatus){
                    console.log(textStatus);
                });
            });
        }
    });
}

function loadContent() {
    if (check_logued() == true) {
        showCart();
    }
}

$(document).ready(function() {
    loadContent();
});