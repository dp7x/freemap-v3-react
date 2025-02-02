import {
  galleryConfirmPickedPosition,
  gallerySetItemForPositionPicking,
} from 'fm3/actions/galleryActions';
import { useMessages } from 'fm3/l10nInjector';
import { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

export default GalleryPositionPickingMenu;

export function GalleryPositionPickingMenu(): ReactElement | null {
  const m = useMessages();

  const dispatch = useDispatch();

  return (
    <Card className="fm-toolbar mx-2 mt-2">
      <div className="m-2">{m?.gallery.locationPicking.title}</div>
      <Button
        className="mr-1"
        onClick={() => {
          dispatch(galleryConfirmPickedPosition());
        }}
      >
        <FaCheck />
        <span className="d-none d-sm-inline"> {m?.general.ok}</span>
      </Button>
      <Button
        onClick={() => {
          dispatch(gallerySetItemForPositionPicking(null));
        }}
      >
        <FaTimes />
        <span className="d-none d-sm-inline"> {m?.general.cancel}</span>{' '}
        <kbd>Esc</kbd>
      </Button>
    </Card>
  );
}
