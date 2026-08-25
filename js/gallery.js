const mainImage = document.getElementById('mainImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const images = document.querySelectorAll('.image');

let currentIndex = 0;

function updateMainImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
    
    mainImage.style.opacity = '0';
    setTimeout(() => {
        const newSrc = images[index].getAttribute('data-full') || images[index].src;
        mainImage.src = newSrc;
        mainImage.style.opacity = '1';
    }, 150);

    currentIndex = index;
}

images.forEach((img, index) => {
    img.addEventListener('click', () => updateMainImage(index));
});

prevBtn.addEventListener('click', () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = images.length - 1;
    updateMainImage(newIndex);
});

nextBtn.addEventListener('click', () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= images.length) newIndex = 0;
    updateMainImage(newIndex);
});

updateMainImage(0);