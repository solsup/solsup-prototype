import { createEntityAdapter, createSlice, EntityId, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CRDTisUpdateNeeded, CRDTValue } from "../../app/crdt";
import { socket } from "../../app/socket";
import { throttle } from "lodash";

export interface Block {
  blockId: EntityId;
  pos: CRDTValue<[number, number]>;
}

const blocksAdapter = createEntityAdapter<Block>({
  selectId: block => block.blockId,
})


export const blocksSlice = createSlice({
  name: 'blocks',
  initialState: blocksAdapter.getInitialState(),
  reducers: {
    blockAdded(state, action: PayloadAction<Block>) {
      blocksAdapter.addOne(state, action.payload);
    },
    blockMoved(state, action: PayloadAction<Pick<Block, 'blockId' | 'pos'>>) {
      blocksAdapter.updateOne(state, {
        id: action.payload.blockId,
        changes: {
          pos: action.payload.pos,
        }
      })
    },
    receivedUpdate(state, action: PayloadAction<Block[]>) {
      for (const remoteBlock of action.payload) {
        const localBlock = state.entities[remoteBlock.blockId]
        if (localBlock) {
          if (CRDTisUpdateNeeded(localBlock.pos, remoteBlock.pos)) {
            blocksAdapter.updateOne(state, {
              id: remoteBlock.blockId,
              changes: {
                pos: remoteBlock.pos,
              }
            })
          }
        } else {
          blocksAdapter.addOne(state, remoteBlock)
        }
      }
    }
  },
})

const sendUpdate = throttle((blocks: Block[]) => {
  socket.emit('update', blocks)
}, 100)

export function updateBlock<P>(action: PayloadAction<P>): ThunkAction<void, RootState, unknown, PayloadAction<P>> {
  return (dispatch, getState) => {
    dispatch(action)
    const blocks = selectAllBlocks(getState())
    sendUpdate(blocks)
  }
}

export const { blockAdded, blockMoved, receivedUpdate } = blocksSlice.actions;

export default blocksSlice.reducer;

export const {
  selectAll: selectAllBlocks,
  selectById: selectBlockById,
  selectIds: selectBlockIds,
  selectEntities: selectBlockEntities,
} = blocksAdapter.getSelectors<RootState>(state => state.blocks)
