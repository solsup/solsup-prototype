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
    <rect x={block.pos.value[0]} y={block.pos.value[1]} width="100" height="100" fill="red"
     onMouseDown={onDragStart}
    />
  )
}

export default Block