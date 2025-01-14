import { setActiveModal } from 'fm3/actions/mainActions';
import { toastsAdd } from 'fm3/actions/toastsActions';
import { useEffectiveChosenLanguage } from 'fm3/hooks/useEffectiveChosenLanguage';
import { useMessages } from 'fm3/l10nInjector';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormGroup from 'react-bootstrap/FormGroup';
import Modal from 'react-bootstrap/Modal';
import { FaRegMap, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { assertType } from 'typescript-is';

type Item = { name: string; items: { name: string; id: number }[] };

const fmMapserverUrl = process.env['FM_MAPSERVER_URL'];

type Props = { show: boolean };

type Res = {
  categories: { id: string; name: string }[];
  items: { categoryId: string; name: string }[];
};

export default LegendOutdoorModal;

export function LegendOutdoorModal({ show }: Props): ReactElement {
  const m = useMessages();

  const [legend, setLegend] = useState<Item[]>([]);

  const language = useEffectiveChosenLanguage();

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${fmMapserverUrl}/legend?language=${language}`)
      .then((response) =>
        response.status === 200 ? response.json() : undefined,
      )
      .then((data) => {
        const { categories, items } = assertType<Res>(data);

        const catMap = new Map<string, Item>();

        for (const category of categories) {
          catMap.set(category.id, { name: category.name, items: [] });
        }

        for (let i = 0; i < items.length; i++) {
          catMap
            .get(items[i].categoryId)
            ?.items.push({ name: items[i].name, id: i });
        }

        setLegend([...catMap.values()]);
      })
      .catch((err) => {
        dispatch(
          toastsAdd({
            style: 'danger',
            messageKey: 'general.loadError',
            messageParams: { err },
          }),
        );
      });
  }, [dispatch, language]);

  const close = useCallback(() => {
    dispatch(setActiveModal(null));
  }, [dispatch]);

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaRegMap /> {m?.mainMenu.mapLegend}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{m?.legend.body}</p>
        <Accordion>
          {[...legend].map((c: Item, i: number) => (
            <Card key={c.name}>
              <Accordion.Toggle as={Card.Header} eventKey={String(i)}>
                {c.name}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={String(i)}>
                <Card.Body>
                  {c.items.map(({ id, name }) => (
                    <div key={id} className="legend-item">
                      <div>
                        <img
                          src={`${fmMapserverUrl}/legend-image/${id}`}
                          srcSet={[1, 2, 3]
                            .map(
                              (s) =>
                                `${fmMapserverUrl}/legend-image/${id}?scale=${s}${
                                  s > 1 ? ` ${s}x` : ''
                                }`,
                            )
                            .join(', ')}
                        />
                      </div>
                      <div>{name}</div>
                    </div>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <FormGroup>
          <Button variant="dark" onClick={close}>
            <FaTimes /> {m?.general.close}
          </Button>
        </FormGroup>
      </Modal.Footer>
    </Modal>
  );
}
