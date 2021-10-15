
const sharedStyles = {
  padding: 20,
  width: "100%",
  textAlign: "center",

  height: 200,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const HeadlineStyle = {
  fontSize: 20,
  fontWeight: 600,
};
function Empty({note = 'No records found!'}) {
  return (
    <div style={sharedStyles}>
      <h3 style={HeadlineStyle}>{note}</h3>
    </div>
  );
}

export function Table({ cols = 1 }) {
  return (
    <tr>
      <td colSpan={cols} className="">
        <div style={sharedStyles}>No records found!</div>
      </td>
    </tr>
  );
}
export function Chat() {
  return (
    <div style={{ ...sharedStyles, height: "100%" }}>
      <h3 style={HeadlineStyle}>No Active Chat</h3>
      <p>Select a contact to begin chatting with them</p>
    </div>
  );
}
export function Loading() {
  return (
    <div style={{ ...sharedStyles, height: "100%" }}>
      <p>Loading...</p>
    </div>
  );
}

export default Object.assign(Empty, {
  Table,
  Loading,
  Chat,
});
