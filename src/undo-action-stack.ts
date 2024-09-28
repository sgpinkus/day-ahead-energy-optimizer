
export interface ReversibleAction {
  undo(): void;
  // redo(): void;
}


class UndoActionStack {
  private actions: ReversibleAction[] = [];
  private blockPush = false;

  pushAction(action: ReversibleAction) {
    if(!this.blockPush) {
      this.actions.push(action);
    }
  }

  undoAction() {
    const action = this.actions.pop();
    if(action) {
      this.blockPush = true;
      action.undo();
      this.blockPush = false;
    }
  }

  get hasActions() {
    return !!this.actions.length;
  }

  // TODO redoAction() {},
}


export default UndoActionStack;