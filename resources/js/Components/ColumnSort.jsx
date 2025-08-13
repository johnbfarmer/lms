import React from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function ColumnSort({ field, sort, dir, sortable }) {
    if (!sortable) {
        return '';
    }
    const thisColIsSorted = sort === field
    const showDownward = thisColIsSorted && dir === -1 
    const cls = thisColIsSorted ? "text-black" : "text-slate-400"
    if (showDownward) {
        return (
            <div className="flex flex-col ">
                <FaChevronDown className={ cls } size="16" />
            </div>
        )
    }

    return (
        <div className="flex flex-col ">
            <FaChevronUp  className={ cls } size="16" />
        </div>
    )
}
