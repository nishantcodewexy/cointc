import { Table } from "react-bootstrap";
import pt from "prop-types";
import React, { useState, useEffect } from "react";

// COMPONENTS
import EmptyRecord from "./EmptyRecord.Component";

// HOOKS
import useToggler from "../../../_hooks/toggler.hook";
import useTableSelector from "../../../_hooks/table.select.hook";

function TableGenerator({
  data = [],
  transformers = {},
  actions = {},
  mapping = {},
  omit = [],
}) {
  const [tableData, setTableData] = useState({ rows: [], cols: [] });
  const { selected, toggleSelect, checkedAll, bulkSelect } = useTableSelector();

  useEffect(() => {
    const getMapping = () => [
      data?.map((obj) => {
        let _obj = {};
        let valid_entries = Object.entries(obj).filter(
          ([key, value]) => !omit.includes(key)
        );
        console.log({ valid_entries });
        valid_entries.forEach((entry) => (_obj[entry[0]] = entry[1]));
        return _obj;
      }),
      Object.keys(data[0])
        .filter((itm) => !omit.includes(itm))
        .map((key) =>
          // console.log(key in mapping, { key, mapping }, mapping[key]),
          key in mapping ? mapping[key] : key
        ),
    ];

    if (data?.length) {
      const [rows, cols] = getMapping();
      console.table(rows, cols);
      console.log(rows, cols);
      setTableData({ rows, cols });
    }
  }, [data]);

  function transformValue(key, value) {
    if (key in transformers) return transformers[key]({ key, value });
    return String(value);
  }

  const singleSelect = (id) => (
    <div className={`custom-control custom-checkbox ml-2`}>
      <input
        type="checkbox"
        className="custom-control-input "
        id={`select_table_record_${id}`}
        required=""
        checked={selected.includes(id)}
        onChange={() => toggleSelect(id)}
      />
      <label
        className="custom-control-label"
        htmlFor={`select_table_record_${id}`}
      ></label>
    </div>
  );

  return tableData.rows.length ? (
    <Table responsive hover size="sm">
      <thead>
        <tr>
          <th>
            <div className="custom-control custom-checkbox mx-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="select_all_table_record"
                disabled={!data.length}
                checked={selected?.length === tableData.rows?.length}
                onChange={() => bulkSelect(tableData.rows)}
              />
              <label
                className="custom-control-label"
                htmlFor="select_all_table_record"
              ></label>
            </div>
          </th>
          {tableData.cols.map((col, key) => (
            <th key={key}>{col.replace(/[_]/, " ")}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.rows.map((row, key) => (
          <tr key={key}>
            <td>{singleSelect(row?.id ?? key)}</td>
            {Object.entries(row).map(([key, value], idx) => (
              <td key={idx}>{transformValue(key, value)}</td>
            ))}
            <td>{actions(row[0])}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <EmptyRecord />
  );
}

export default TableGenerator;

TableGenerator.propTypes = {
  data: pt.array,
  actions: pt.func,
  mapping: pt.object,
  omit: pt.array,
};

TableGenerator.defaultProps = {};
