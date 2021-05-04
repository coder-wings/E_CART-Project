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
    console.log(res.responseText);
    let contentContainer=document.querySelector(".content-container");
    data.forEach(function(element){
        let template=`<div class="card">
        <img src=${element.product_image} alt=${element.product_name}/>
        <div class="card-title">
          <div class="card-body">
            <h2>${element.product_name+" "+"Price: "+element.price}</h2>
            <p>${element.description}</p>
            <button>Add TO Cart</button>
          </div>
        </div>
      </div>`;
      contentContainer.innerHTML+=template;
    });

}