export const displayLightbox = (medias) => {
  const lightboxWrapper = document.querySelector(".lightbox_wrapper");
  const btnClose = document.querySelector(".btn_close_lightbox");
  const btnPrevious = document.querySelector(".btn_previous");
  const btnNext = document.querySelector(".btn_next");
  const lightboxMedia = document.querySelector(".lightbox_media");
  const mediaProvider = Array.from(
    document.querySelectorAll(".gallery_card a")
  );

  const linkAndBtnInSection = [...document.querySelectorAll("button, a")];

  const tabMoveElements = {
    index: 0,
    linkAndBtnInSection: null,
    maxIndex: 0,
    switch: (index, maxIndex, tab) => {
      if (index <= maxIndex) {
        ++tabMoveElements.index;
        if (tabMoveElements.index === maxIndex) {
          tabMoveElements.index = 0;
        }
        return tab[tabMoveElements.index];
      }
    },
  };

  tabMoveElements.linkAndBtnInSection = linkAndBtnInSection;
  tabMoveElements.maxIndex = tabMoveElements.linkAndBtnInSection.length - 1;

  const tabMove = (e) => {
    e.preventDefault();
    tabMoveElements
      .switch(
        tabMoveElements.index,
        tabMoveElements.maxIndex,
        tabMoveElements.linkAndBtnInSection
      )
      .focus();

    console.log(tabMoveElements);

    // On récupère les balises qui nous intéresse pour naviguer avec tab

    console.log("i press tab");
  };

  const photographer = medias.photographer;
  const mediasList = medias.medias;
  let currentIndex = 0;

  mediaProvider.forEach((media) => {
    media.addEventListener("click", () => {
      const mediaId = media.dataset.media;
      const mediaIndex = mediasList.findIndex((media) => media.id == mediaId);
      currentIndex = mediaIndex;
      lightboxWrapper.style.display = "flex";
      btnClose.focus();
      lightboxTemplate();
    });
  });

  const lightboxTemplate = () => {
    const currentMedia = mediasList[currentIndex];

    lightboxMedia.innerHTML = `
            ${
              currentMedia.image
                ? `
            <img src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.image}" alt="${currentMedia.alt}">`
                : `<video controls aria-label="${currentMedia.alt}"><source src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.video}" type="video/mp4"></video>`
            }

            <figcaption>${currentMedia.title}</figcaption>
        `;
  };

  const closeLightbox = () => {
    lightboxWrapper.style.display = "none";
    lightboxMedia.innerHTML = "";
  };

  const nextMedia = () => {
    currentIndex++;
    if (currentIndex > mediasList.length - 1) currentIndex = 0;
    lightboxTemplate();
    showActiveBtn(btnNext);
  };

  const previousMedia = () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = mediasList.length - 1;
    lightboxTemplate();
    showActiveBtn(btnPrevious);
  };

  const showActiveBtn = (btn) => {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 100);
  };

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Tab":
        tabMove(e);
        break;
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        previousMedia();
        break;
      case "ArrowRight":
        nextMedia();
        break;
    }
  });

  btnPrevious.addEventListener("click", () => previousMedia());
  btnNext.addEventListener("click", () => nextMedia());
  btnClose.addEventListener("click", () => closeLightbox());
};
