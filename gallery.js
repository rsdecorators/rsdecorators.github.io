var imageGroups = [
    {a:"IMG_2753.JPG",b:"IMG_2765.JPG"},
    {a:"IMG_2684.JPG",b:"IMG_2793.JPG"}
];

function addCover(element, text){
    element.style.position="relative";
    
    var cover = document.createElement("div");
    cover.textContent = text;
    cover.className="img-cover";
    
    
    element.appendChild(cover);
}

function init(){
    
    var photoHolder = document.createElement("div");
    
    for(var i = 0; i < imageGroups.length; i++){
        var imgGrp = imageGroups[i];
        
        var imgGrpOuterDiv = document.createElement("div");
        imgGrpOuterDiv.className = "img-grp-outer-div";
        
        var imgGrpDiv = document.createElement("div");
        imgGrpDiv.className = "img-grp";
        
        var img1w = document.createElement("div");
        img1w.className="img-wrp"; 
        addCover(img1w, "before");
        
        var img1 = document.createElement("img");
        img1.src="pics/"+imgGrp.a;
        img1.height=150;   
        
        img1w.appendChild(img1);
        imgGrpDiv.appendChild(img1w);
        
        var img2w = document.createElement("div");
        img2w.className="img-wrp";
        addCover(img2w, "after");
        
        var img2 = document.createElement("img");
        img2.src="pics/"+imgGrp.b;
        img2.height=150;
        
        img2w.appendChild(img2);
        imgGrpDiv.appendChild(img2w);
        
        imgGrpOuterDiv.appendChild(imgGrpDiv);
        
        photoHolder.appendChild(imgGrpOuterDiv);
        
    }
    
    var galleryBody = document.getElementById("gallery-body");
    galleryBody.appendChild(photoHolder);
    
}

init();