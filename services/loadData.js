//loading data from server
loadData("http://localhost:3000/products",getData);

function loadData(url,getData){
    let req=new XMLHttpRequest();
    req.onreadystatechange=function(){
        if(this.readyState==4 &&this.status==200){
            getData(this);
        }
    };
    req.open("GET",url,true);
    req.send();
}


function getData(res){
    let data=JSON.parse(res.responseText);
   // console.log(res.responseText);
    let contentContainer=document.querySelector(".content-container");
    data.forEach(function(elem){
        let template=`<div class="card">
        <img src=${elem.product_image} alt=${elem.product_name}/>
        <div class="card-title">
          <div class="card-body">
            <h2>${elem.product_name+" "+"Price: "+elem.price}</h2>
            <p>${elem.description}</p>
            </div>
            <input type="hidden" value="${elem.product_id}"/>
            <button class="cartitems" >Add TO Cart</button>
        </div>
      </div>`;
      contentContainer.innerHTML+=template;
    });
    /*##############ADD TO CART BUTTON HANDLING##########*/
   // localStorage.setItem("items","[]");
   
    let items=[]; 
    localStorage.setItem("items",JSON.stringify(items));
    let elements=document.getElementsByClassName("cartitems");
    for(let i=0;i<elements.length;i++){
        elements[i].addEventListener("click",handleElements);
    }
    function handleElements(){
        let id=this.previousElementSibling.value;
        let items=JSON.parse(localStorage.getItem("items"));
        items.push(id);
        localStorage.setItem("items",JSON.stringify(items));
        document.getElementsByClassName("cart-items")[0].innerHTML=`${JSON.parse(localStorage.getItem("items")).length}`;
    }
}






