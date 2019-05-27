import * as at from 'fm3/actionTypes';
import { toDatetimeLocal } from 'fm3/dateUtils';

const initialState = {
  imageIds: null,
  activeImageId: null,
  image: null,

  showUploadModal: false,
  items: [],
  pickingPositionForId: null,
  showPreview: true,

  uploadingId: null,

  tags: [],
  users: [],

  dirtySeq: 0,
  comment: '',
  showFilter: false,
  filter: {
    tag: null,
    userId: null,
    takenAtFrom: null,
    takenAtTo: null,
    createdAtFrom: null,
    createdAtTo: null,
    ratingFrom: null,
    ratingTo: null,
  },

  editModel: null,
  showPosition: false,
};

export default function gallery(state = initialState, action) {
  switch (action.type) {
    case at.CLEAR_MAP:
      return { ...initialState, dirtySeq: state.dirtySeq };
    case at.GALLERY_SET_IMAGE_IDS:
      return {
        ...state,
        imageIds: action.payload,
      };
    case at.GALLERY_CLEAR:
      return {
        ...state,
        imageIds: null,
        image: null,
        activeImageId: null,
        editModel: null,
      };
    case at.GALLERY_SET_IMAGE:
      return {
        ...state,
        image: action.payload,
        editModel: null,
      };
    case at.GALLERY_REQUEST_IMAGE:
      return {
        ...state,
        activeImageId: action.payload,
        comment: '',
        editModel: null,
      };
    case at.GALLERY_ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case at.GALLERY_REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(({ id }) => action.payload !== id),
      };
    case at.GALLERY_SET_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload.value : item,
        ),
      };
    case at.GALLERY_SET_ITEM_ERROR:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, error: action.payload.error }
            : item,
        ),
      };
    case at.GALLERY_SET_PICKING_POSITION:
      return {
        ...state,
        pickingPosition: action.payload,
      };
    case at.GALLERY_CONFIRM_PICKED_POSITION: {
      const s = {
        ...state,
        pickingPositionForId: null,
        pickingPosition: null,
      };
      if (state.pickingPositionForId === -1) {
        s.editModel = { ...state.editModel, position: state.pickingPosition };
      } else {
        s.items = state.items.map(item =>
          item.id === state.pickingPositionForId
            ? { ...item, position: state.pickingPosition }
            : item,
        );
      }
      return s;
    }
    case at.GALLERY_SET_ITEM_FOR_POSITION_PICKING:
      return {
        ...state,
        pickingPositionForId: action.payload,
        pickingPosition:
          action.payload === -1
            ? state.editModel.position
            : typeof action.payload === 'number'
            ? state.items.find(({ id }) => id === action.payload).position
            : null,
      };
    case at.GALLERY_UPLOAD: {
      const items =
        state.uploadingId === null
          ? state.items.map(item => ({ ...item, error: getError(item) }))
          : state.items;
      const next = items.find(item => !item.error);

      return {
        ...state,
        items,
        uploadingId: next ? next.id : null,
      };
    }
    case at.GALLERY_SET_TAGS:
      return { ...state, tags: action.payload };
    case at.GALLERY_SET_USERS:
      return { ...state, users: action.payload };
    case at.GALLERY_SET_LAYER_DIRTY:
      return { ...state, dirtySeq: state.dirtySeq + 1 };
    case at.GALLERY_SET_COMMENT:
      return { ...state, comment: action.payload };
    case at.GALLERY_SHOW_FILTER:
      return { ...state, showFilter: true };
    case at.GALLERY_SET_FILTER:
      return { ...state, filter: action.payload, showFilter: false };
    case at.GALLERY_HIDE_FILTER:
      return { ...state, showFilter: false };
    case at.GALLERY_SHOW_UPLOAD_MODAL:
      return { ...state, showUploadModal: true };
    case at.GALLERY_HIDE_UPLOAD_MODAL:
      return {
        ...state,
        showUploadModal: false,
        items: [],
        pickingPositionForId: null,
      };
    case at.GALLERY_EDIT_PICTURE:
      return {
        ...state,
        editModel: state.editModel
          ? null
          : {
              title: state.image.title,
              description: state.image.description,
              takenAt: state.image.takenAt
                ? toDatetimeLocal(state.image.takenAt)
                : '',
              tags: [...state.image.tags],
              position: { lat: state.image.lat, lon: state.image.lon },
            },
      };
    case at.GALLERY_SET_EDIT_MODEL:
      return { ...state, editModel: action.payload };
    case at.GALLERY_SHOW_ON_THE_MAP:
      return { ...state, showPosition: true };
    case at.GALLERY_CANCEL_SHOW_ON_THE_MAP:
      return { ...state, showPosition: false };
    case at.GALLERY_TOGGLE_SHOW_PREVIEW:
      return { ...state, showPreview: !state.showPreview };
    default:
      return state;
  }
}

function getError(item) {
  const errors = [];
  if (!item.position) {
    errors.push('Chýba pozícia.');
  }
  if (item.takenAt && Number.isNaN(item.takenAt.getTime())) {
    errors.push('Nevalidný dátum a čas fotenia.');
  }
  return errors.length ? errors.join('\n') : null;
}
