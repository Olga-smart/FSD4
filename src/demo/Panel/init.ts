import Panel from './Panel';

$(() => {
  const forms = document.querySelectorAll('form');
  const panels = [...forms].filter((form) => form.classList.contains('js-panel'));

  panels.forEach((panel) => {
    setTimeout(() => {
      const sliderId = $(panel).data('slider');
      const sliderInstance = $(`#${sliderId}`).data('rangeSlider');
      Panel.init(panel, sliderInstance);
    }, 0);
  });
});
