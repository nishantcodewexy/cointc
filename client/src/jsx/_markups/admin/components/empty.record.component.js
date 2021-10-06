const sharedStyles = {
  padding: 20,
  width: "100%",
  textAlign: "center",
  fontSize: 20,
  fontWeight: 600,
  height: 200,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function EmptyRecord() {
  return <div style={sharedStyles}>No record found!</div>;
}

export function EmptyTableRecord({ cols = 1 }) {
  return (
    <>
      <td
        colSpan={cols}
        className=""
        style={sharedStyles}
      >
        No records found!
      </td>
    </>
  );
}

export const types = {
  Table: EmptyTableRecord,
};
export default Object.assign(EmptyRecord, types);
