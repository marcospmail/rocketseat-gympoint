import produce from 'immer';

const INITIAL_STATE = {
  student: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/ADD_STUDENT_DETAILS_SUCCESS': {
        draft.student = action.payload.student;
        break;
      }
      default:
    }
  });
}
