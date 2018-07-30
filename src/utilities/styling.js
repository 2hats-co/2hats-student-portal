export function setBackground(backgroundColor,backgroundImage){
    if(document.body.style.backgroundImage !== `url(${backgroundImage})`){
        document.body.style.backgroundColor = backgroundColor;
        document.body.style.backgroundImage= `url(${backgroundImage})`
        document.body.style.backgroundRepeat= "no-repeat";
        document.body.style.backgroundSize= "cover";
        document.body.style.backgroundPosition= "center center";
    }
}