"use strict";(self.webpackChunkembla_carousel_docs=self.webpackChunkembla_carousel_docs||[]).push([[8356],{8356:function(e,n,t){t.r(n),n.default="import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'\nimport {\n  addPrevNextBtnsClickHandlers,\n  addDotBtnsAndClickHandlers\n} from './arrows-dots-buttons'\nimport '../css/base.css'\nimport '../css/sandbox.css'\nimport '../css/embla.css'\n\nconst OPTIONS: EmblaOptionsType = {}\n\nconst emblaNode = <HTMLElement>document.querySelector('.embla')\nconst viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')\nconst prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')\nconst nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')\nconst dotsNode = <HTMLElement>document.querySelector('.embla__dots')\nconst emblaApi = EmblaCarousel(viewportNode, OPTIONS)\n\nconst removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(\n  emblaApi,\n  prevBtn,\n  nextBtn\n)\nconst removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(\n  emblaApi,\n  dotsNode\n)\n\nemblaApi\n  .on('destroy', removePrevNextBtnsClickHandlers)\n  .on('destroy', removeDotBtnsAndClickHandlers)\n"}}]);
//# sourceMappingURL=8356-d5c0c380722e2bf93ca7.js.map