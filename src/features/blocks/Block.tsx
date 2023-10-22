import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { selectBlockById } from "./blocksSlice";

interface IBlockProps {
  blockId: EntityId;
  onDragStart: (e: React.MouseEvent<SVGElement>) => void;
}
function Block({ blockId, onDragStart }: IBlockProps) {
  const block = useAppSelector(state => selectBlockById(state, blockId))

  if (!block) return null;

  return (
   <path d="M.661.662v31.75h6.35v6.35h6.35v-6.35h158.75V.662H13.361v6.35h-6.35V.664Z"
      style={{
        fill: "teal",
        stroke: "#006868",
        strokeWidth: 1.2,
      }}
      onMouseDown={onDragStart}
      transform={`translate(${block.pos.value[0]} ${block.pos.value[1]})`}
    />
  )
}

export default Block