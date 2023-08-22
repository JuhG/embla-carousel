"use strict";(self.webpackChunkembla_carousel_docs=self.webpackChunkembla_carousel_docs||[]).push([[5528],{5528:function(e,n,t){t.r(n),n.default="import React, { useEffect, useState, useCallback, useRef } from 'react'\nimport useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'\nimport { flushSync } from 'react-dom'\n\nconst CIRCLE_DEGREES = 360\nconst WHEEL_ITEM_SIZE = 30\nconst WHEEL_ITEM_COUNT = 18\nconst WHEEL_ITEMS_IN_VIEW = 4\n\nexport const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT\nexport const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW\nexport const WHEEL_RADIUS = Math.round(\n  WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT)\n)\n\nconst isInView = (wheelLocation: number, slidePosition: number): boolean =>\n  Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES\n\ntype SlideStylesType = {\n  opacity: number\n  transform: string\n}\n\nconst getSlideStyles = (\n  emblaApi: EmblaCarouselType,\n  index: number,\n  loop: boolean,\n  slideCount: number,\n  totalRadius: number\n): SlideStylesType => {\n  const wheelLocation = emblaApi.scrollProgress() * totalRadius\n  const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius\n  const positionLoopStart = positionDefault + totalRadius\n  const positionLoopEnd = positionDefault - totalRadius\n\n  let inView = false\n  let angle = index * -WHEEL_ITEM_RADIUS\n\n  if (isInView(wheelLocation, positionDefault)) {\n    inView = true\n  }\n\n  if (loop && isInView(wheelLocation, positionLoopEnd)) {\n    inView = true\n    angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS\n  }\n\n  if (loop && isInView(wheelLocation, positionLoopStart)) {\n    inView = true\n    angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS\n  }\n\n  if (inView) {\n    return {\n      opacity: 1,\n      transform: `rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`\n    }\n  }\n  return { opacity: 0, transform: 'none' }\n}\n\nexport const getContainerStyles = (\n  wheelRotation: number\n): Pick<SlideStylesType, 'transform'> => ({\n  transform: `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`\n})\n\nexport const getSlidesStyles = (\n  emblaApi: EmblaCarouselType | undefined,\n  loop: boolean,\n  slideCount: number,\n  totalRadius: number\n): SlideStylesType[] => {\n  const slidesStyles: SlideStylesType[] = []\n\n  for (let index = 0; index < slideCount; index += 1) {\n    const slideStyle = emblaApi\n      ? getSlideStyles(emblaApi, index, loop, slideCount, totalRadius)\n      : ({} as SlideStylesType)\n    slidesStyles.push(slideStyle)\n  }\n  return slidesStyles\n}\n\ntype PropType = {\n  loop?: boolean\n  label: string\n  slideCount: number\n  perspective: 'left' | 'right'\n}\n\nexport const IosPickerItem: React.FC<PropType> = (props) => {\n  const { slideCount, perspective, label, loop = false } = props\n  const [emblaRef, emblaApi] = useEmblaCarousel({\n    loop,\n    axis: 'y',\n    dragFree: true,\n    containScroll: false,\n    watchResize: false,\n    watchSlides: false\n  })\n  const [wheelReady, setWheelReady] = useState(false)\n  const [wheelRotation, setWheelRotation] = useState(0)\n  const rootNodeRef = useRef<HTMLDivElement>(null)\n  const rootNodeSize = useRef(0)\n  const totalRadius = slideCount * WHEEL_ITEM_RADIUS\n  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS\n  const containerStyles = getContainerStyles(wheelRotation)\n  const slideStyles = getSlidesStyles(emblaApi, loop, slideCount, totalRadius)\n\n  const inactivateEmblaTransform = useCallback(\n    (emblaApi: EmblaCarouselType) => {\n      if (!emblaApi) return\n      const { translate, slideLooper } = emblaApi.internalEngine()\n      translate.clear()\n      translate.toggleActive(false)\n      slideLooper.loopPoints.forEach(({ translate }) => {\n        translate.clear()\n        translate.toggleActive(false)\n      })\n    },\n    []\n  )\n\n  const readRootNodeSize = useCallback((emblaApi: EmblaCarouselType) => {\n    if (!emblaApi) return 0\n    return emblaApi.rootNode().getBoundingClientRect().height\n  }, [])\n\n  const rotateWheel = useCallback(\n    (emblaApi: EmblaCarouselType) => {\n      if (!emblaApi) return\n      const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset\n      setWheelRotation(rotation * emblaApi.scrollProgress())\n    },\n    [slideCount, rotationOffset, setWheelRotation]\n  )\n\n  useEffect(() => {\n    if (!emblaApi) return\n\n    emblaApi.on('pointerUp', () => {\n      const { scrollTo, target, location } = emblaApi.internalEngine()\n      const diffToTarget = target.get() - location.get()\n      const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1\n      const distance = diffToTarget * factor\n      scrollTo.distance(distance, true)\n    })\n\n    emblaApi.on('scroll', () => {\n      flushSync(() => rotateWheel(emblaApi))\n    })\n\n    setWheelReady(true)\n    inactivateEmblaTransform(emblaApi)\n    rotateWheel(emblaApi)\n  }, [emblaApi, inactivateEmblaTransform, rotateWheel])\n\n  useEffect(() => {\n    if (!emblaApi) return\n    if (!rootNodeSize.current) rootNodeSize.current = readRootNodeSize(emblaApi)\n\n    const resizeObserver = new ResizeObserver(() => {\n      if (readRootNodeSize(emblaApi) !== rootNodeSize.current) {\n        rootNodeSize.current = readRootNodeSize(emblaApi)\n        flushSync(() => setWheelReady(false))\n\n        setWheelReady(() => {\n          emblaApi.reInit()\n          inactivateEmblaTransform(emblaApi)\n          rotateWheel(emblaApi)\n          return true\n        })\n      }\n    })\n\n    resizeObserver.observe(emblaApi.rootNode())\n\n    return () => {\n      resizeObserver.disconnect()\n    }\n  }, [\n    emblaApi,\n    inactivateEmblaTransform,\n    setWheelReady,\n    rotateWheel,\n    readRootNodeSize\n  ])\n\n  return (\n    <div className=\"embla__ios-picker\">\n      <div className=\"embla__ios-picker__scene\" ref={rootNodeRef}>\n        <div\n          className={`embla__ios-picker__viewport embla__ios-picker__viewport--perspective-${perspective}`}\n          ref={emblaRef}\n        >\n          <div\n            className=\"embla__ios-picker__container\"\n            style={wheelReady ? containerStyles : { transform: 'none' }}\n          >\n            {slideStyles.map((slideStyle, index) => (\n              <div\n                className=\"embla__ios-picker__slide\"\n                key={index}\n                style={\n                  wheelReady\n                    ? slideStyle\n                    : { position: 'static', transform: 'none' }\n                }\n              >\n                {index}\n              </div>\n            ))}\n          </div>\n        </div>\n      </div>\n      <div className=\"embla__ios-picker__label\">{label}</div>\n    </div>\n  )\n}\n"}}]);
//# sourceMappingURL=5528-4207bbb88ae8ab920636.js.map