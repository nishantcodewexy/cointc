import { Table } from "react-bootstrap";
import pt from "prop-types";
import React, { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { TablePagination, Skeleton } from "@mui/material";

// COMPONENTS
import Empty from "./Empty.Component";

// CONSTANTS
import { SERVICE } from "../../../_constants";
// HOOKS
import useTableSelector from "../../../_hooks/table.select.hook";

function TableGenerator({
  service = {},
  transformers = {},
  mapping = {},
  extras = [],
  omit = [],
}) {
  const { data, prevRequest, error, isFetching, dispatchRequest } = service;

  const uuid = nanoid(10);
  const [tableData, setTableData] = useState({
    rows: [],
    fullRows: [],
    fullCols: [],
    cols: [],
  });
  const { selected, toggleSelect, bulkSelect } = useTableSelector();
  const [count, setCount] = useState(data?.count || 0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(data?.limit || 10);

  useEffect(() => {
    /**
     * @function getMapping - Returns a row/col mapping of the table data
     * @returns {[]}
     */
    function getMapping(data = []) {
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
    if (data?.results?.length) {
      const [rows, cols, fullRows, fullCols] = getMapping(data?.results);
      setTableData({ rows, cols, fullRows, fullCols });
    }
    setCount(data?.count);
    setLimit(data?.limit);
  }, [data]);

  function onRowsPerPageChange(e, { props }) {
    setLimit(props.value);
    let payload = {
      ...(() => prevRequest[SERVICE.BULK_RETRIEVE]?.payload || {})(),
      limit: props.value,
      offset: page * limit || 0,
    };
    let toast = {
      ...(() => prevRequest[SERVICE.BULK_RETRIEVE]?.toast || {})(),
    };
    dispatchRequest({
      type: SERVICE.BULK_RETRIEVE,
      payload,
      toast,
      overwrite: false,
    });
  }

  /**
   * @function onPageChange
   * @param {Object} e
   * @param {Number} newPage
   */
  function onPageChange(e, newPage) {
    setPage(newPage);
    let payload = {
      ...(() => prevRequest[SERVICE.BULK_RETRIEVE]?.payload || {})(),
      limit,
      offset: newPage * limit || 0,
    };
    let toast = {
      ...(() => prevRequest[SERVICE.BULK_RETRIEVE]?.toast || {})(),
    };
    dispatchRequest({
      type: SERVICE.BULK_RETRIEVE,
      payload,
      toast,
    });
  }

  /**
   * @function transformValue - Transforms column value using the transformer if specified
   * @param {Object} modifiers
   * @param {String} modifiers.key
   * @param {String} modifiers.value
   * @param {Object} modifiers.state
   * @returns
   */
  function TransformValue({ item, value, ...rest }) {
    if (String(item).toLowerCase() in transformers)
      return transformers[item]({ item, value, ...rest });
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
          id={`select_table_record_${id}_${uuid}`}
          required=""
          checked={selected.includes(id)}
          onChange={() => toggleSelect(id)}
        />
        <label
          className="custom-control-label"
          htmlFor={`select_table_record_${id}_${uuid}`}
        ></label>
      </div>
    );
  }
  return (
    <div style={{ position: "relative", minHeight: 250 }}>
      {tableData.rows.length ? (
        <>
          <Table key={uuid} responsive hover size="sm">
            <thead>
              <tr>
                <th>
                  <div className="custom-control custom-checkbox mx-2">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={`select_all_table_record#${uuid}`}
                      disabled={!tableData.rows.length}
                      checked={selected?.length === tableData.rows?.length}
                      onChange={() => bulkSelect(tableData.rows)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={`select_all_table_record#${uuid}`}
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
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, key) => (
                <tr key={key}>
                  <td>{singleSelect(row?.id ?? key)}</td>
                  {String(omit) !== "*" &&
                    Object.entries(row).map(([item, value], idx) => (
                      <td key={idx}>
                        <TransformValue
                          {...{ item, value, row, state: tableData }}
                        />
                      </td>
                    ))}
                  {extras?.map((item, idx) => (
                    <td key={idx}>
                      <TransformValue
                        {...{
                          item,
                          value: "",
                          row,
                          state: tableData,
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Pagination */}
          <div style={{ padding: "20px 10px" }}>
            <TablePagination
              component="div"
              count={count}
              page={page}
              onPageChange={onPageChange}
              rowsPerPage={limit || 10}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </div>
        </>
      ) : (
        <Empty />
      )}
      {isFetching && (
        <div
          style={{
            padding: "10px 70px 70px",
            position: "absolute",
            overflow: "hidden",
            top: 0,
            width: "100%",
            left: 0,
            height: "100%",
            background: "#ffffffed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Skeleton style={{ width: "100%", paddingTop: "5%" }} />
          <Skeleton style={{ width: "100%" }} animation="wave" />
          <Skeleton style={{ width: "100%" }} animation={false} />
          <Skeleton style={{ width: "100%" }} animation={"wave"} />
          <Skeleton style={{ width: "100%" }} animation={false} />
          <Skeleton style={{ width: "100%", paddingTop: "5%" }} />
        </div>
      )}
    </div>
  );
}

export default TableGenerator;

TableGenerator.propTypes = {
  // data: pt.object,
  service: pt.object,
  mapping: pt.object,
  omit: pt.any,
  extras: pt.array,
  transformers: pt.object,
};

TableGenerator.defaultProps = {};
