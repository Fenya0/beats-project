const openItem = item => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block");
  const reqHeight = textBlock.height();
  const arrow = container.find('.team__title');

  container.addClass("active");
  arrow.addClass("active");
  contentBlock.height(reqHeight);
}

const closeItems = container => {
  const items = container.find('.team__content');
  const item = container.find('.team__item');
  const arrow = item.find('.team__title');

  arrow.removeClass("active");
  item.removeClass("active");
  items.height(0);
}

$('.team__title').click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');
  const elemContainer = $this.closest(".team__item");


  if (elemContainer.hasClass("active")) {
    closeItems(container);
  } else {
    closeItems(container);
    openItem($this);
  }
});