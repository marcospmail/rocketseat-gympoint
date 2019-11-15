import produce from 'immer';

import { items } from '~/components/Header/navigation';

const INITIAL_STATE = {
  navItem: items.students.name,
};

export default function navitem(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@navitem/SET_ACTIVE_NAVITEM':
        draft.navItem = action.payload.navItem;
        break;
      default:
    }
  });
}
