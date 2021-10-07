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
  extras = [],
  omit = [],
}) {
  const [tableData, setTableData] = useState({
    rows: [],
    fullRows: [],
    fullCols: [],
    cols: [],
  });
  const { selected, toggleSelect, checkedAll, bulkSelect } = useTableSelector();

  useEffect(() => {
    /**
     * @function getMapping - Returns a row/col mapping of the table data
     * @returns {[]}
     */
    function getMapping() {
      let fullRows = data?.map((obj) => {
        let _obj = {};
        Object.entries(obj).forEach((entry) => (_obj[entry[0]] = entry[1]));
        return _obj;
      });

      let fullCols = Object.keys(data[0]).map((key) =>
        key in mapping ? mapping[key] : key
      );

      return [
        data?.map((obj) => {
          let _obj = {};
          let valid_entries = Object.entries(obj).filter(
            ([key, value]) => !omit.includes(key)
          );
          // console.log({ valid_entries });
          valid_entries.forEach((entry) => (_obj[entry[0]] = entry[1]));
          return _obj;
        }),
        Object.keys(data[0])
          .filter((itm) => !omit.includes(itm))
          .map((key) =>
            // console.log(key in mapping, { key, mapping }, mapping[key]),
            key in mapping ? mapping[key] : key
          ),
        fullRows,
        fullCols,
      ];
    }

    if (data?.length) {
      const [rows, cols, fullRows, fullCols] = getMapping();

      setTableData({ rows, cols, fullRows, fullCols });
    }
  }, [data]);

  /**
   * @function transformValue - Transforms column value using the transformer if specified
   * @param {Object} modifiers
   * @param {String} modifiers.key
   * @param {String} modifiers.value
   * @param {Object} modifiers.state
   * @returns
   */
  function transformValue({ key, value, ...rest }) {
    if (key in transformers) return transformers[key]({ key, value, ...rest });
    return String(value);
  }

  /**
   * @function singleSelect - Singularly selects a checkbox
   * @param {String} id
   * @returns
   */
  function singleSelect(id) {
    return (
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
  }

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
          {String(omit) !== "*" &&
            tableData?.cols?.map((col, key) => (
              <th key={key}>{String(col)?.replace(/[_]/, " ")}</th>
            ))}
          {extras?.map((extra, key) => (
            <th key={key}>{String(extra)?.replace(/[_]/, " ")}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.rows.map((row, key) => (
          <tr key={key}>
            <td>{singleSelect(row?.id ?? key)}</td>
            {String(omit) !== "*" &&
              Object.entries(row).map(([key, value], idx) => (
                <td key={idx}>
                  {transformValue({ key, value, row, state: tableData })}
                </td>
              ))}
            {extras?.map((key, idx) => (
              <td key={idx}>
                {transformValue({ key, value: "", row, state: tableData })}
              </td>
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
  extras: pt.array,
  transformers: pt.object,
};

TableGenerator.defaultProps = {};
