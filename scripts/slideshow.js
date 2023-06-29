document.addEventListener('DOMContentLoaded', function () {
    const slideshowElement = document.querySelector("[data-js-slideshow]");

  
  
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const jsonData = await response.json();
  return jsonData;
}
  
  
  
  const renderSlides = () => {    

    const url = "../data/slide-show.json"
    fetchData(url).then(data => {
      
      slideshowElement.innerHTML = data.slides.map((item, index) => {
        return `<li class="other-recipes-list__item ${index === 0 ? "is-active" : " "}" data-js-slide>
        <figure>
          <img src="../images/other-recipes/${item.imagesrc}" alt="${item.caption}">
          <figcaption>${item.caption}</figcaption>
        </figure>
        </li>`
      }).join(" ");
    })
  }
  
  renderSlides();

    const slideshow = (ele) => {
  
        let index = 0;
        // const slides = ele.querySelectorAll("[data-js-slide]");
        const slides = slideshowElement.children // works with renderes js elements
        const back = document.querySelector("[data-js-slideshow-gui='back']");
        const forward = document.querySelector("[data-js-slideshow-gui='forward']");

      
      const goToSlide = (add) => {
          
            newIndex = index + add;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            } else if (newIndex > slides.length - 1) {
                newIndex = 0;
        };

            slides[index].classList.remove("is-active");
            slides[newIndex].classList.add("is-active");
            index = newIndex;
        };

        back.addEventListener("click", (event) => {
            event.preventDefault();
            goToSlide(-1);
        });

        forward.addEventListener("click", (event) => {
          event.preventDefault();
          console.log("forward");
            goToSlide(1);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft") {
                goToSlide(-1);
            }
            if (event.key === "ArrowRight") {
                goToSlide(1);
            }
        });
    };
    slideshow(slideshowElement);
});