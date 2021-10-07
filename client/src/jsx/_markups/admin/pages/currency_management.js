import { Card, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
import { useEffect } from "react";
import useToggler from "../../../_hooks/toggler.hook";
import EmptyRecord from "../components/EmptyRecord.Component";
import useTableSelector from "../../../_hooks/table.select.hook";
import { LinearProgress, TablePagination } from "@material-ui/core";

// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";

function CurrencyMgmt({ services, useService }) {
  const { useGroupService } = services;
  const group = useGroupService();
  let { data, error, isFetching, dispatchRequest } = useService({
    get: group.getCurrency,
  });

  useEffect(() => {
    dispatchRequest({ type: "get" });
  }, []);

/*   useEffect(() => {
    if (data?.results) {
      const [rows, cols, _data] = getMapping(data.results);
      console.log({ rows, cols, _data });
    }
  }, [data]);

  function getMapping(data) {
    let rows = [],
      cols = [];
    rows = Object.keys(data[0]);
    cols = Object.values(data);
    return [rows, cols, data];
  }
 */
  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useToggler();

  const actions = (_item) => (
    <div className="d-flex" style={{ gap: 20 }}>
      <ModifierForm isOpen={isModalOpen} data={_item} onClose={onCloseModal}>
        {/* {Object.values(_item).join(", ")} */}
        <a onClick={onOpenModal}>
          <span className="themify-glyph-29"></span> Edit
        </a>
      </ModifierForm>
      <a href="">
        <span className="themify-glyph-165"></span> Delete
      </a>
    </div>
  );

  return (
    <>
      <PageTitle activeMenu="" motherMenu="Currencies" />
      <header className="mb-4">
        <h3>Currency List</h3>
      </header>
      <Row style={{ marginBottom: 20, width: "100%" }}>
        <Col>
          <div className="input-group search-area right d-lg-inline-flex d-none">
            <input
              type="text"
              className="form-control"
              placeholder="Filter in record"
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <Link to={"#"}>
                  <i className="themify-glyph-162"></i>
                </Link>
              </span>
            </div>
          </div>
        </Col>

        <Col sm="auto" style={{ padding: 0 }}>
          <ModifierForm isOpen={isModalOpen} onClose={onCloseModal}>
            <Button onClick={onOpenModal}>
              <i className="fa fa-plus"></i> Add Currency
            </Button>
          </ModifierForm>
        </Col>
      </Row>

      <Row style={{ marginBottom: 60 }}>
        <Col>
          <Card>
            {/* {isFetching ? <div>Loading...</div> : <CurrenciesTable  data={data?.results}/>} */}
         
            {isFetching ? (
              <div>Loading...</div>
            ) : (
              <TableGenerator data={data?.results} actions = {actions}
              mapping = {{
                id: "Currency ID",
                iso_code: "symbol",
              }}
              omit = {[
                "archived_at",
                "created_by",
                "createdAt",
                "updatedAt",
                "updated_at",
                "created_at",
              ]} />
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}
function CurrencyTable({ data = [] }) {
  const { selected, toggleSelect, checkedAll } = useTableSelector(data);

  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useToggler();

  const singleSelect = (id) => (
    <div className={`custom-control custom-checkbox ml-2`}>
      <input
        type="checkbox"
        className="custom-control-input "
        id={`check_currency_record_${id}`}
        required=""
        checked={selected.includes(id)}
        onChange={() => toggleSelect(id)}
      />
      <label
        className="custom-control-label"
        htmlFor={`check_currency_record_${id}`}
      ></label>
    </div>
  );

  const action = (_item) => (
    <div className="d-flex" style={{ gap: 20 }}>
      <ModifierForm isOpen={isModalOpen} data={_item} onClose={onCloseModal}>
        {/* {Object.values(_item).join(", ")} */}
        <a onClick={onOpenModal}>
          <span className="themify-glyph-29"></span> Edit
        </a>
      </ModifierForm>
      <a href="">
        <span className="themify-glyph-165"></span> Delete
      </a>
    </div>
  );

  return (
    <>
      {/*  <ul>
        {selected.map((_s, key) => (
          <li key={key}>{_s}</li>
        ))}
      </ul> */}
      {data.length ? (
        <>
          <Table responsive hover size="sm">
            <thead>
              <tr>
                <th className="user_permission">
                  <div className="custom-control custom-checkbox mx-2">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="check_all_record"
                      disabled={!data.length}
                      checked={checkedAll}
                      onChange={() => toggleSelect()}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="check_all_record"
                    ></label>
                  </div>
                </th>
                <th>Currency ID</th>
                <th className="pl-5 width200">Symbol</th>
                <th className="pl-5 width200">Full name</th>
                <th className="pl-5 width200">Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="curencies">
              {data?.map((item, key) => (
                <tr key={item.id} className="btn-reveal-trigger">
                  <td>{singleSelect(item.id)}</td>
                  <td className="py-2">{item.id}</td>
                  <td className="py-3 pl-5 width200">{item.iso_code}</td>
                  <td className="py-3 pl-5 width200">{item.name}</td>
                  <td className="py-3 pl-5 width200">{item.type}</td>
                  <td>{action(item)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* <TablePagination count={data?.count}  /> */}
        </>
      ) : (
        <EmptyRecord />
      )}
    </>
  );
}

function ModifierForm({ children, data: _data = {}, isOpen, onClose }) {
  return (
    <>
      {children}

      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Currency</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="formCurrencyCode">
                  <Form.Label>Code</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={_data?.iso_code}
                    placeholder="Currency code"
                  />

                  <Form.Text className="">
                    ISO Code / Short name / Symbol
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCurrencyName">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={_data?.name}
                    placeholder="Currency name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCurrencyType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={_data?.type?.toLowerCase()}
                    defaultValue={_data?.type?.toLowerCase()}
                    aria-label="Select currency type"
                  >
                    <option>Select currency type</option>
                    <option value="fiat">Fiat</option>
                    <option value="crypto">Crypto</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CurrencyMgmt;
