"use strict";(self.webpackChunkembla_carousel_docs=self.webpackChunkembla_carousel_docs||[]).push([[4914],{4914:function(e,s,l){l.r(s),s.default="import { EmblaCarouselType } from 'embla-carousel'\n\nexport const addThumbBtnsClickHandlers = (\n  emblaApiMain: EmblaCarouselType,\n  emblaApiThumb: EmblaCarouselType\n): (() => void) => {\n  const slidesThumbs = emblaApiThumb.slideNodes()\n\n  const scrollToIndex = slidesThumbs.map(\n    (_, index) => (): void => emblaApiMain.scrollTo(index)\n  )\n\n  slidesThumbs.forEach((slideNode, index) => {\n    slideNode.addEventListener('click', scrollToIndex[index], false)\n  })\n\n  return (): void => {\n    slidesThumbs.forEach((slideNode, index) => {\n      slideNode.removeEventListener('click', scrollToIndex[index], false)\n    })\n  }\n}\n\nexport const addToggleThumbBtnsActive = (\n  emblaApiMain: EmblaCarouselType,\n  emblaApiThumb: EmblaCarouselType\n): (() => void) => {\n  const slidesThumbs = emblaApiThumb.slideNodes()\n\n  const toggleThumbBtnsState = (): void => {\n    emblaApiThumb.scrollTo(emblaApiMain.selectedScrollSnap())\n    const previous = emblaApiMain.previousScrollSnap()\n    const selected = emblaApiMain.selectedScrollSnap()\n    slidesThumbs[previous].classList.remove('embla-thumbs__slide--selected')\n    slidesThumbs[selected].classList.add('embla-thumbs__slide--selected')\n  }\n\n  emblaApiMain.on('select', toggleThumbBtnsState)\n  emblaApiThumb.on('init', toggleThumbBtnsState)\n\n  return (): void => {\n    const selected = emblaApiMain.selectedScrollSnap()\n    slidesThumbs[selected].classList.remove('embla-thumbs__slide--selected')\n  }\n}\n"}}]);
//# sourceMappingURL=4914-50144d9f77ffa6d4ac71.js.map