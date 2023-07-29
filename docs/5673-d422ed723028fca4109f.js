"use strict";(self.webpackChunkembla_carousel_docs=self.webpackChunkembla_carousel_docs||[]).push([[5673],{5673:function(e,s,o){o.r(s),s.default="import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'\nimport { setupProgressBar } from './progress-bar'\nimport '../css/base.css'\nimport '../css/sandbox.css'\nimport '../css/embla.css'\n \nconst OPTIONS: EmblaOptionsType = {}\n \nconst emblaNode = <HTMLElement>document.querySelector('.embla')\nconst viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')\nconst progressNode = <HTMLElement>(\n  emblaNode.querySelector('.embla__progress__bar')\n)\n \nconst emblaApi = EmblaCarousel(viewportNode, OPTIONS)\nconst { applyProgress, removeProgress } = setupProgressBar(\n  emblaApi,\n  progressNode\n)\n \nemblaApi\n  .on('init', applyProgress)\n  .on('reInit', applyProgress)\n  .on('scroll', applyProgress)\n  .on('destroy', removeProgress)\n"}}]);
//# sourceMappingURL=5673-d422ed723028fca4109f.js.map