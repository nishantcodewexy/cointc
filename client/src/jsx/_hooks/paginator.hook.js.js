import { useState } from "react";
import props from 'prop-types'

function usePaginator(opts ) {
  const [pageCount, onSetPageCount] = useState(opts.pageCount || 0);
  const [rowLimit, onSetRowLimit] = useState(opts.rowLimit || 10);
  const [offset, onSetOffset] = useState(opts.offset || 10);

  return {
    pageCount,
    rowLimit,
    onSetPageCount,
    onSetRowLimit,
    onSetOffset,
    offset,
  };
}

usePaginator.defaultprops = {
  pageCount: 0,
  rowLimit: 10,
  offset: 10,
}
export default usePaginator;
