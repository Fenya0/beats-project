const mesureWidth = item => {
  let reqItemWidth = 0;

  const screenWidth = $(window).width();
  const container = item.closest(".colours-menu");
  const titlesBlocks = container.find(".colours-menu__title");
  const titlesWidth = titlesBlocks.innerWidth() * titlesBlocks.length;

  const textContainer = item.find(".colours-menu__text");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRigth = parseInt(textContainer.css("padding-right"));


  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  if(isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingLeft -paddingRigth
  }
};

const CloseEveryTextInContainer = container => {
  const items = container.find(".colours-menu__item");
  const content = container.find(".colours-menu__content");

  items.removeClass("active");
  content.width(0);
}

const openText = item => {
  const hiddenContent = item.find(".colours-menu__content");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".colours-menu__text");


  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
}

$(".colours-menu__title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".colours-menu__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".colours-menu");

  if(itemOpened) {
    CloseEveryTextInContainer(container);
  } else {
    CloseEveryTextInContainer(container);
    openText(item);
  }
});