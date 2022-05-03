import { noop } from './consts.js';

export const globalSettings = {
  speed: 1,
  suspendWhenDocumentHidden: true,
}

export const defaultInstanceSettings = {
  update: noop,
  begin: noop,
  loopBegin: noop,
  changeBegin: noop,
  change: noop,
  changeComplete: noop,
  loopComplete: noop,
  complete: noop,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0,
}

export const defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0,
}
