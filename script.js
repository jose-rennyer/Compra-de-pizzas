let pizzaqt = 1
let cart = []
let chavedomodal;

pizzaJson.map(function(item, index){
    let pizzaitem = document.querySelector(".models .pizza-item").cloneNode(true)
    pizzaitem.setAttribute("data-key", index)
    pizzaitem.querySelector(".pizza-item--img img").src = item.img
    pizzaitem.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaitem.querySelector(".pizza-item--name").innerHTML = item.name
    pizzaitem.querySelector(".pizza-item--desc").innerHTML = item.description
    pizzaitem.querySelector("a").addEventListener("click", function(e){
        e.preventDefault()
        let chave = e.target.closest(".pizza-item").getAttribute("data-key")
        pizzaqt = 1
        chavedomodal = chave
        document.querySelector(".pizzaWindowArea").style.opacity = "0"
        document.querySelector(".pizzaWindowArea").style.display = "flex"
        setTimeout(function(){
            document.querySelector(".pizzaWindowArea").style.opacity = "1"
        },200)

        document.querySelector(".pizzaBig img").src = pizzaJson[chave].img //item.img
        document.querySelector(".pizzaInfo h1").innerHTML = pizzaJson[chave].name
        document.querySelector(".pizzaInfo--desc").innerHTML = pizzaJson[chave].description
        document.querySelector(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[chave].price.toFixed(2)}`
        document.querySelector(".pizzaInfo--size.selected").classList.remove("selected")
        document.querySelectorAll(".pizzaInfo--size").forEach(function(item, sizeIndex){
            if(sizeIndex == 2){
                item.classList.add("selected")
            }
            item.querySelector("span").innerHTML = pizzaJson[chave].sizes[sizeIndex]
        })
        document.querySelector(".pizzaInfo--qt").innerHTML = pizzaqt
        document.querySelector(".pizzaInfo--qtmenos").addEventListener("click", function(){
            if(pizzaqt > 1){
                pizzaqt--
                document.querySelector(".pizzaInfo--qt").innerHTML = pizzaqt
            }
        })
        document.querySelector(".pizzaInfo--qtmais").addEventListener("click", function(){
            pizzaqt++
            document.querySelector(".pizzaInfo--qt").innerHTML = pizzaqt
        })
    })
    document.querySelector(".pizza-area").append(pizzaitem)
})

document.querySelectorAll(".pizzaInfo--size").forEach(function(item){
    item.addEventListener("click", function(){
        document.querySelector(".pizzaInfo--size.selected").classList.remove("selected")
        item.classList.add("selected")
    })
    
    
})
function fecharmodal(){
    document.querySelector(".pizzaWindowArea").style.opacity = "0"
    setTimeout(function(){
        document.querySelector(".pizzaWindowArea").style.display = "none"
    }, 500)
}
document.querySelectorAll(".pizzaInfo--cancelMobileButton,.pizzaInfo--cancelButton").forEach(function(item){
    item.addEventListener("click", fecharmodal)
})

document.querySelector(".pizzaInfo--addButton").addEventListener("click", function(){
    let size = document.querySelector(".pizzaInfo--size.selected").getAttribute("data-key")
    let identifier = pizzaJson[chavedomodal].id+"&"+size
    let verificacao = cart.findIndex(function(item){
        return item.identifier == identifier
    })
    if(verificacao > -1){
        cart[verificacao].qt += pizzaqt
    }else{
        cart.push({
            identifier,
            id:pizzaJson[chavedomodal].id,
            size:size,
            qt:pizzaqt
        })
    }
    updatecart()
    fecharmodal()
})
function updatecart(){
    if(cart.length > 0){ 
        document.querySelector("aside").classList.add("show")
        document.querySelector(".cart").innerHTML = ""
        let subtotal = 0
        let desconto = 0
        let total = 0
        for(let i in cart){
            let pizzaitem = pizzaJson.find(function(item){
                return item.id == cart[i].id
            })
            subtotal += pizzaitem.price * cart[i].qt
            let itemdocarrinho = document.querySelector(".models .cart--item").cloneNode(true)
            let pizzasize;
            switch(cart[i].size){
                case "0":
                    pizzasize = "P"
                    break;
                case "1":
                    pizzasize = "M"
                    break;
                case "2":
                    pizzasize = "G"
                    break;
            }
            let pizzanamesize = `${pizzaitem.name} (${pizzasize})`
            itemdocarrinho.querySelector("img").src = pizzaitem.img
            itemdocarrinho.querySelector(".cart--item-nome").innerHTML = pizzanamesize
            itemdocarrinho.querySelector(".cart--item--qt").innerHTML = cart[i].qt
            itemdocarrinho.querySelector(".cart--item-qtmenos").addEventListener("click", function(){
                if(cart[i].qt > 1){
                    cart[i].qt--
                }else {
                    cart.splice(i, 1)
                }
                updatecart()
            })
            itemdocarrinho.querySelector(".cart--item-qtmais").addEventListener("click", function(){
                cart[i].qt++
                updatecart()
            })
            document.querySelector(".cart").append(itemdocarrinho)
        } 
        
        desconto = subtotal * 0.2
        total = subtotal - desconto
        document.querySelector(".subtotal span:last-child").innerHTML = `R$ ${subtotal.toFixed(2)}`
        document.querySelector(".desconto span:last-child").innerHTML = `R$ ${desconto.toFixed(2)}`
        document.querySelector(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`
    }else{
        document.querySelector("aside").classList.remove("show")
        document.querySelector("aside").style.left = "100vw"
    }
    document.querySelector(".menu-openner span").innerHTML = cart.length
}
document.querySelector(".menu-openner").addEventListener("click", function(){
    if(cart.length > 0){
        document.querySelector("aside").style.left = "0vw"
    } else {
        document.querySelector("aside").style.left = "100vw"
    }
})
document.querySelector(".menu-closer").addEventListener("click", function(){
    document.querySelector("aside").style.left = "100vw"
})





















































































/*for(let i in pizzaJson){
    let pizzaitem = document.querySelector(".models .pizza-item").cloneNode(true)
    pizzaitem.querySelector(".pizza-item--img img").src = pizzaJson[i].img
    document.querySelector(".pizza-area").append(pizzaitem)
}*/