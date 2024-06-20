import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { useCallback, useState } from "react"
import { CSS } from "@dnd-kit/utilities"
import { GameBackground } from "../components/GameBackground"
import { MainView } from "../components/MainView"

const findContainerDroppableIdByDraggableId = (items: MyDndTestState, id: UniqueIdentifier) => {
  if (id in items) {
    return id
  }

  return Object.keys(items).find((key) => items[key].includes(id))
}

export type MyDndTestState = Record<UniqueIdentifier, UniqueIdentifier[]>

export type MyDndTestProps = {}

export const MyDndTest = ({}: MyDndTestProps) => {
  const [displayedItems, setDisplayedItems] = useState<MyDndTestState>({
    opponentHand: ["4", "5", "6"],
    row1: [],
    row2: ["7"],
    humanHand: ["1", "2", "3"],
  })

  const [draggingId, setDraggingId] = useState<UniqueIdentifier | null>(null)

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setDraggingId(event.active.id.toString())
    },
    [setDraggingId]
  )

  // On drag over, simply handle a row change, by adding the dragged item to the end of the new row.
  // dnd-kit handles the rest, really.
  const handleDragOver = useCallback(
    (event: DragEndEvent) => {
      if (!event.over) {
        return
      }
      const activeContainer = findContainerDroppableIdByDraggableId(displayedItems, event.active.id)
      const overContainer = findContainerDroppableIdByDraggableId(displayedItems, event.over.id)
      if (activeContainer && overContainer && activeContainer !== overContainer) {
        setDisplayedItems((displayedItems) => ({
          ...displayedItems,
          [activeContainer]: displayedItems[activeContainer].filter((item) => item !== event.active.id), // remove from previous container
          [overContainer]: [...displayedItems[overContainer], event.active.id], // add to new container
        }))
      }
    },
    [displayedItems]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!event.over) {
        setDraggingId(null)
        return
      }

      const activeContainer = findContainerDroppableIdByDraggableId(displayedItems, event.active.id)
      const overContainer = findContainerDroppableIdByDraggableId(displayedItems, event.over.id)

      if (activeContainer && overContainer) {
        const activeIndex = displayedItems[activeContainer].indexOf(event.active.id)
        const overIndex = displayedItems[overContainer].indexOf(event.over.id)

        if (activeIndex !== overIndex) {
          setDisplayedItems((displayedItems) => ({
            ...displayedItems,
            [overContainer]: arrayMove(displayedItems[overContainer], activeIndex, overIndex),
          }))
        }
      }

      setDraggingId(null)
    },
    [displayedItems, setDraggingId]
  )

  const handleDragCancel = useCallback((event: DragCancelEvent) => {
    setDraggingId(null)
  }, [])

  // see https://codesandbox.io/p/sandbox/react-typescript-with-dnd-kit-sortable-qk4y7x?file=%2Fsrc%2FApp.tsx%3A80%2C9-80%2C16
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
    >
      <MainView>
        <GameBackground />
        <div className="flex flex-col p-8 gap-8 bg-stone-300">
          <MyDndTestRow droppableId="opponentHand" itemIds={displayedItems.opponentHand} />
          <MyDndTestRow droppableId="row1" itemIds={displayedItems.row1} />
          <MyDndTestRow droppableId="row2" itemIds={displayedItems.row2} />
          <MyDndTestRow droppableId="humanHand" itemIds={displayedItems.humanHand} />
        </div>
        <DragOverlay>
          {draggingId ? <MyDndTestItemSprite text={draggingId.toString()} isDraggingInOverlay /> : null}
        </DragOverlay>
      </MainView>
    </DndContext>
  )
}

export type MyDndTestRowProps = {
  itemIds: UniqueIdentifier[]
  droppableId: string
}

export const MyDndTestRow = ({ itemIds, droppableId }: MyDndTestRowProps) => {
  const { active, attributes, isDragging, listeners, over, setNodeRef, transition, transform } = useSortable({
    id: droppableId,
    data: {
      type: "container",
      children: itemIds,
    },
  })
  const isOverContainer = over
    ? (droppableId === over.id && active?.data.current?.type !== "container") ||
      itemIds.some((itemId) => itemId === over.id)
    : false

  return (
    <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
      <div
        className={` p-4 h-40 gap-4 flex border-2 border-slate-500 rounded-md ${isOverContainer ? "bg-slate-200" : ""}`}
        ref={setNodeRef}
      >
        {itemIds.map((itemId) => {
          return <DraggableMyDndTestItem key={itemId} draggableId={itemId} />
        })}
      </div>
    </SortableContext>
  )
}

export type DraggableMyDndTestItemProps = {
  draggableId: UniqueIdentifier
}

export const DraggableMyDndTestItem = ({ draggableId }: DraggableMyDndTestItemProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: draggableId,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <MyDndTestItemSprite text={draggableId.toString()} isDraggingInRow={isDragging} />
    </div>
  )
}

export type MyDndTestItemSpriteProps = {
  text: string
  isDraggingInRow?: boolean
  isDraggingInOverlay?: boolean
}

export const MyDndTestItemSprite = ({ text, isDraggingInRow, isDraggingInOverlay }: MyDndTestItemSpriteProps) => {
  return (
    <div
      className={`${isDraggingInRow ? "opacity-20" : ""} ${
        isDraggingInOverlay ? "scale-105" : ""
      } w-32 h-32 bg-rose-600 flex justify-center items-center`}
    >
      <p>{text}</p>
    </div>
  )
}
