var trolleyVisible = false;


if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){

    var buttonsremoveItem = document.getElementsByClassName('btn-remove');
    for(var i=0;i<buttonsremoveItem.length; i++){
        var button = buttonsremoveItem[i];
        button.addEventListener('click',removeItemtrolley);
    }

    var buttonsSumarAmount = document.getElementsByClassName('sumar-Amount');
    for(var i=0;i<buttonsSumarAmount.length; i++){
        var button = buttonsSumarAmount[i];
        button.addEventListener('click',sumarAmount);
    }

    var buttonsRestarAmount = document.getElementsByClassName('restar-Amount');
    for(var i=0;i<buttonsRestarAmount.length; i++){
        var button = buttonsRestarAmount[i];
        button.addEventListener('click',restarAmount);
    }

    var buttonsAddAltrolley = document.getElementsByClassName('button-item');
    for(var i=0; i<buttonsAddAltrolley.length;i++){
        var button = buttonsAddAltrolley[i];
        button.addEventListener('click', AddAltrolleyClicked);
    }

    document.getElementsByClassName('bTN-buy')[0].addEventListener('click',buyClicked)
}
function buyClicked(){
    alert("The purchase was completed successfully");
    var trolleyItems = document.getElementsByClassName('trolley-items')[0];
    while (trolleyItems.hasChildNodes()){
        trolleyItems.removeChild(trolleyItems.firstChild)
    }
    updateTotaltrolley();
    ocultartrolley();
}
function AddAltrolleyClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var name = item.getElementsByClassName('item-name')[0].innerText;
    var price = item.getElementsByClassName('price-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    AddItemAltrolley(name, price, imagenSrc);

    hacerVisibletrolley();
}

function hacerVisibletrolley(){
    trolleyVisible = true;
    var trolley = document.getElementsByClassName('trolley')[0];
    trolley.style.marginRight = '0';
    trolley.style.opacity = '1';

    var items =document.getElementsByClassName('container-items')[0];
    items.style.width = '60%';
}

function AddItemAltrolley(name, price, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemstrolley = document.getElementsByClassName('trolley-items')[0];

    var nombresItemstrolley = itemstrolley.getElementsByClassName('trolley-item-name');
    for(var i=0;i < nombresItemstrolley.length;i++){
        if(nombresItemstrolley[i].innerText==name){
            alert("The Item Already Exists");
            return;
        }
    }

    var itemtrolleyContent = `
        <div class="trolley-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="trolley-item-details">
                <span class="trolley-item-name">${name}</span>
                <div class="selector-Amount">
                    <i class="fa-solid fa-minus restar-Amount"></i>
                    <input type="text" value="1" class="trolley-item-Amount" disabled>
                    <i class="fa-solid fa-plus sumar-Amount"></i>
                </div>
                <span class="trolley-item-price">${price}</span>
            </div>
            <button class="btn-remove">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    
    item.innerHTML = itemtrolleyContent;
    itemstrolley.append(item);

     item.getElementsByClassName('btn-remove')[0].addEventListener('click', removeItemtrolley);

    var buttonsRestarAmount = item.getElementsByClassName('restar-Amount')[0];
    buttonsRestarAmount.addEventListener('click',restarAmount);

    var buttonsSumarAmount = item.getElementsByClassName('sumar-Amount')[0];
    buttonsSumarAmount.addEventListener('click',sumarAmount);

    updateTotaltrolley();
}
function sumarAmount(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('trolley-item-Amount')[0].value);
    var AmountActual = selector.getElementsByClassName('trolley-item-Amount')[0].value;
    AmountActual++;
    selector.getElementsByClassName('trolley-item-Amount')[0].value = AmountActual;
    updateTotaltrolley();
}
function restarAmount(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('trolley-item-Amount')[0].value);
    var AmountActual = selector.getElementsByClassName('trolley-item-Amount')[0].value;
    AmountActual--;
    if(AmountActual>=1){
        selector.getElementsByClassName('trolley-item-Amount')[0].value = AmountActual;
        updateTotaltrolley();
    }
}

function removeItemtrolley(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotaltrolley();

    Hidetrolley();
}
function  Hidetrolley(){
    var trolleyItems = document.getElementsByClassName('trolley-items')[0];
    if(trolleyItems.childElementCount==0){
        var trolley = document.getElementsByClassName('trolley')[0];
        trolley.style.marginRight = '-100%';
        trolley.style.opacity = '0';
        trolleyVisible = false;

        var items =document.getElementsByClassName('container-items')[0];
        items.style.width = '100%';
    }
}
function updateTotaltrolley(){
    var trolleycontainer = document.getElementsByClassName('trolley')[0];
    var trolleyItems = trolleycontainer.getElementsByClassName('trolley-item');
    var total = 0;
    for(var i=0; i< trolleyItems.length;i++){
        var item = trolleyItems[i];
        var priceElement = item.getElementsByClassName('trolley-item-price')[0];
        var price = parseFloat(priceElement.innerText.replace('$','').replace('.',''));
        var AmountItem = item.getElementsByClassName('trolley-item-Amount')[0];
        console.log(price);
        var Amount = AmountItem.value;
        total = total + (price * Amount);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('trolley-price-total')[0].innerText = '$'+total.toLocaleString("en") + ",00";

}