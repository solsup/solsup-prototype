import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import { blockAdded, updateBlock } from "./blocksSlice";
import { createCRDTValue } from "../../app/crdtHelper";

function AddBlockButton() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(updateBlock(blockAdded({
      blockId: nanoid(),
      pos: createCRDTValue([Math.random() * 100, Math.random() * 100])
    })))
  }

  return (
    <input type="button" value="Add Block" onClick={handleClick} />
  )
}

export default AddBlockButton;