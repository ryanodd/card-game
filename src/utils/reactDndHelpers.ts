import {
  AnimateLayoutChanges,
  SortingStrategy,
  defaultAnimateLayoutChanges,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"

// From https://codesandbox.io/p/sandbox/react-dndkit-multiple-containers-6wydy9?file=%2Fsrc%2Fexamples%2FSortable%2FMultipleContainers.tsx%3A46%2C1-47%2C61
// no docs I could find about it... Looks like it may take in args about the drag state & stuff.
// But we're just always forcing wasDragging=true... I wonder why?
export const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })

// From the library. Needed for custom sortingStrategy
// @ts-ignore
function getItemGap(rects, index, activeIndex) {
  const currentRect = rects[index]
  const previousRect = rects[index - 1]
  const nextRect = rects[index + 1]

  if (!currentRect || (!previousRect && !nextRect)) {
    return 0
  }

  if (activeIndex < index) {
    return previousRect
      ? currentRect.left - (previousRect.left + previousRect.width)
      : nextRect.left - (currentRect.left + currentRect.width)
  }

  return nextRect
    ? nextRect.left - (currentRect.left + currentRect.width)
    : currentRect.left - (previousRect.left + previousRect.width)
}

// Doesn't do the full job.
export const myReverseHorizontalListSortingStrategy: SortingStrategy = (args) => {
  const originalTransform = horizontalListSortingStrategy(args)
  if (originalTransform === null) {
    return null
  }
  return {
    x: -originalTransform.x,
    y: originalTransform.y,
    scaleX: originalTransform.scaleX,
    scaleY: originalTransform.scaleY,
  }
}

const defaultScale = {
  scaleX: 1,
  scaleY: 1,
}
