type InputSliderPublicMethods =
  'setLeftValue' |
  'setRightValue' |
  'setMin' |
  'setMax' |
  'setStep' |
  'setScaleIntervals';

type ToggleSliderPublicMethods =
  'toggleRange' |
  'toggleOrientation' |
  'toggleValueLabels' |
  'toggleMinMaxLabels' |
  'toggleScale';

type SliderPublicMethods = InputSliderPublicMethods | ToggleSliderPublicMethods;

export { SliderPublicMethods, InputSliderPublicMethods, ToggleSliderPublicMethods };
