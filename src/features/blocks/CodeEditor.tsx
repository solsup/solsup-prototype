import { useMemo, useState } from "react";
import Block from "./Block";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { blockMoved, selectBlockEntities, updateBlock } from "./blocksSlice";
import { EntityId } from "@reduxjs/toolkit";

import { createCRDTValue } from "../../app/crdtHelper";
import { throttle } from "lodash";

function CodeEditor() {
  const dispatch = useAppDispatch()
  const blocks = useAppSelector(selectBlockEntities)

  const [posOffset, setPosOffset] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState<EntityId | null>(null);

  function handleDragStart(id: EntityId) {
    return (e: React.MouseEvent<SVGElement>) => {
      setSelectedId(id)
      const selectedBlock = blocks[id]
      if (!selectedBlock) return;
      setPosOffset({ x: e.clientX - selectedBlock.pos.value[0], y: e.clientY - selectedBlock.pos.value[1] })
    }
  }



  const handleThrottledDrag = useMemo(() => {
  function handleDrag(e: React.MouseEvent<SVGElement>) {
    if (selectedId) {
      e.preventDefault();
      const action = blockMoved({ blockId: selectedId, pos: createCRDTValue([e.clientX - posOffset.x, e.clientY - posOffset.y]) })
      dispatch(updateBlock(action))
    }
  }
    return throttle(handleDrag, 30)
  }, [dispatch, posOffset, selectedId])

  function handleDragEnd() {
    setSelectedId(null)
  }
  return (
    <svg version="1.1"
      baseProfile="full"
      width="500" height="500"
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={handleThrottledDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {Object.values(blocks).map(block => {
        return block && <Block key={block.blockId} blockId={block.blockId} onDragStart={handleDragStart(block.blockId)} />
      })}
    </svg>
  )
}

export default CodeEditor