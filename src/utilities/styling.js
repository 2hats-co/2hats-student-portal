export function setBackground(backgroundColor,backgroundImage,isMobile){
    if(isMobile){
        document.body.style.backgroundSize = "fit";
    }else{
        document.body.style.backgroundSize = "cover";
    }
    if(document.body.style.backgroundImage !== `url(${backgroundImage})`){
        document.body.style.backgroundColor = backgroundColor;
        document.body.style.backgroundImage = `url(${backgroundImage})`
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
    }
    
}