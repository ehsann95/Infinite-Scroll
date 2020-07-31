const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []
let ready = false
let imagesLoaded = 0
let totalImages = 0

const API_KEY = 'qPZxmUTIIqbsEdQoQXFFR0h3K4n05GqyvkAzlBSkG24'
const count = 10
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch(error){
        console.log('whooops', error)
    }
}

// Calling getPhotos Method
getPhotos()

// Checks If all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        loader.hidden=true
        ready = true
        imagesLoaded=0
    }

}

// Sets Attributes for Element
function setAttr(element, attr) {
    for(const key in attr) {
        element.setAttribute(key, attr[key])
    }
}


// Diplays Photos which were fethched from API
function displayPhotos() {
    totalImages = photosArray.length
    photosArray.forEach((photo) => {
        const item = document.createElement('a')  
        setAttr(item, {
            'href': photo.links.html
        })
        const img = document.createElement('img')
        setAttr(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        })

        //  Event Listener
        img.addEventListener('load',imageLoaded);

        item.appendChild(img)
        imageContainer.appendChild(item)

    })
}

// Scroll Event to fetch more photos on reaching bottom of page
window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight) && ready){
        ready = false
       getPhotos()
    }
 });


