import { changesetsSetParams } from 'fm3/actions/changesetsActions';
import { useMessages } from 'fm3/l10nInjector';
import { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaEraser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ToolMenu } from './ToolMenu';

export default ChangesetsMenu;

export function ChangesetsMenu(): ReactElement {
  const m = useMessages();

  const [authorName, setAuthorName] = useState<string | null>(
    useSelector((state) => state.changesets.authorName),
  );

  const days = useSelector((state) => state.changesets.days || 3);

  const dispatch = useDispatch();

  return (
    <ToolMenu>
      <Dropdown
        className="ml-1"
        onSelect={(d) => {
          dispatch(changesetsSetParams({ days: Number(d) }));
        }}
      >
        <Dropdown.Toggle variant="secondary" id="days">
          {m?.changesets.olderThanFull({ days }) ?? '…'}
        </Dropdown.Toggle>

        <Dropdown.Menu popperConfig={{ strategy: 'fixed' }}>
          {[3, 7, 14, 30].map((d) => (
            <Dropdown.Item key={d} eventKey={String(d)} active={d === days}>
              {m?.changesets.olderThan({ days: d })}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Form
        className="ml-1 d-flex flex-nowrap"
        inline
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(changesetsSetParams({ days, authorName }));
        }}
      >
        <InputGroup className="flex-nowrap">
          <Form.Control
            type="text"
            placeholder={m?.changesets.allAuthors}
            onChange={(e) => {
              setAuthorName(e.target.value || null);
            }}
            onBlur={() => dispatch(changesetsSetParams({ days, authorName }))}
            value={authorName ?? ''}
          />

          <InputGroup.Append>
            <Button
              variant="secondary"
              disabled={!authorName}
              onClick={() => {
                setAuthorName(null);

                dispatch(changesetsSetParams({ days, authorName: null }));
              }}
            >
              <FaEraser />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </ToolMenu>
  );
}
