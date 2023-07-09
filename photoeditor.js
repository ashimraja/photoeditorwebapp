const fileInput = document.querySelector(".file-input"),
filterOption = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterSlider = document.querySelector(".slider input"),
filterValue = document.querySelector(".filter-info .value"),
rotateOption = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
chooseImgBtn = document.querySelector(".choose-img"),
resetFilterBtn = document.querySelector(".reset-filter"),
saveImgBtn = document.querySelector(".save-img");



let brightness=100, contrast=100, saturation=100, inversion=0, grayscale=0, sepia=0,blur= 0, huerotate=0
let rotate=0, flipHorizontal=1 ,flipVertical=1
const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)
     invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur/5}px) hue-rotate(${huerotate}deg)` ;
}

const loadImage = ()=>{
    let file = fileInput.files[0];
    if(!file)return;
    previewImg.src= URL.createObjectURL(file);
    previewImg.addEventListener("load",()=>{
        document.querySelector(".container").classList.remove("disable");
    });
}
filterOption.forEach(option => {
    option.addEventListener("click",()=>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness"){
            filterSlider.max="200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id==="contrast"){
            filterSlider.max="200";
            filterSlider.value = contrast;
            filterValue.innerText = `${contrast}%`;
        } else if(option.id==="saturation"){
            filterSlider.max="200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if(option.id==="inversion"){
            filterSlider.max="100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else if(option.id==="grayscale"){
            filterSlider.max="100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        } else if(option.id==="sepia"){
            filterSlider.max="100";
            filterSlider.value = sepia;
            filterValue.innerText = `${sepia}%`;
        } else if(option.id==="blur"){
            filterSlider.max="20";
            filterSlider.value = blur;
            filterValue.innerText = `${blur}%`;
        } else if(option.id==="huerotate"){
            filterSlider.max="360";
            filterSlider.value = huerotate;
            filterValue.innerText = `${huerotate}%`;
        }   
    });
});
const updateFilter=()=>{
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");
    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "contrast"){
        contrast = filterSlider.value;
    } else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value;
    }else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
    }else if(selectedFilter.id === "grayscale"){
        grayscale = filterSlider.value;
    }else if(selectedFilter.id === "sepia"){
        sepia = filterSlider.value;
    }else if(selectedFilter.id === "blur"){
        blur = filterSlider.value;
    }else if(selectedFilter.id === "huerotate"){
        huerotate = filterSlider.value;
    }
    applyFilters();
};
rotateOption.forEach(option =>{
    option.addEventListener("click", ()=>{
        if(option.id==="left"){
            rotate -= 90
        }else if(option.id==="right"){
            rotate += 90
        }else if(option.id==="horizontal"){
            flipHorizontal = flipHorizontal === 1? -1 : 1
        }else if(option.id==="vertical"){
            flipVertical = flipVertical === 1? -1 : 1
        }
        applyFilters();
    });
});

const resetFilter = ()=>{
    brightness=100, contrast=100, saturation=100, inversion=0, grayscale=0, sepia=0,blur= 0, huerotate=0
    rotate=0, flipHorizontal=1 ,flipVertical=1
    filterOption[0].click();
    applyFilters();
}
const saveImage = ()=> {
    const canvas =document.createElement("canvas");
    const ctx= canvas.getContext("2d");
    canvas.width= previewImg.naturalWidth;
    canvas.height=previewImg.naturalHeight;
    ctx.filter=`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)
               invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur/5}px) hue-rotate(${huerotate}deg)`;
    ctx.translate(canvas.width/2,canvas.height/2); //translating canvas to the centre

    if(rotate !==0){   //if rotate value isnt 0, rotat the canvas
        ctx.rotate(rotate * Math.PI /180);
    }
    ctx.scale(flipHorizontal, flipVertical); //flip canvas, horizontal/vertically
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

    const link =document.createElement("a");
    link.download ="image.jpg";
    link.href=canvas.toDataURL();
    link.click();
}
fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input",updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());