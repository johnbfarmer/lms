import React, { useState } from 'react';
import { PiMagnifyingGlassThin } from "react-icons/pi";
import { MdClose } from "react-icons/md";
import TableCellContents from '@/Components/TableCellContents';
import Pagination from '@/Components/Pagination';
import ColumnSort from '@/Components/ColumnSort';

export default function LmsTable(props) {
	const [currentPage, setCurrentPage] = useState(1)
	const [filterStr, setFilterStr] = useState("")
	const [recordsPerPage, setRecordsPerPage] = useState(10)
	const [sortCol, setSortCol] = useState(props.initialSort)
	const [sortDir, setSortDir]= useState(props.initialSortDir || 1) // 1 or -1

	const filterAndOrderData = () => {
		let data = props.data
		if (filterStr) {
			const f = filterStr.toLowerCase()
			data = data.filter((row) => {
			    return Object.keys(row).some((key) => {
			        return String(row[key]).toLowerCase().indexOf(f) > -1
			    })
			})
		}
		if (sortCol) {
			data = data.slice().sort((a, b) => {
			    a = a[sortCol]
			    b = b[sortCol]
			    return (a === b ? 0 : a > b ? 1 : -1) * sortDir
			})
		}

		return data
	}

	const sliceData = (data) => {
	    const firstRecord = (currentPage - 1) * recordsPerPage
	    const lastRecord = firstRecord + recordsPerPage
	    return data.slice(firstRecord, lastRecord)
	}

	const filteredOrderedData = filterAndOrderData();

	const dataForPage = sliceData(filteredOrderedData);

	function updateSort(s) {
	    setSortDir(s === sortCol ? -1 * sortDir : 1);
	    setSortCol(s);
	    setCurrentPage(1)
	}

	const hdr = props.columns.map((col, k) => {
		const cls = col.css ? col.css: 'w-[10%]'
		return (
			<th className={cls} key={ k }>
                <div className="flex flex-row cursor-pointer" onClick={() => updateSort(col.field)} >
                    { col.title }
                    <ColumnSort field={col.field} sort={sortCol} dir={sortDir} sortable={col.sortable} />
                </div>
            </th>
		)
	})

	const bod = dataForPage.map((dta, j) => {
		const rw = props.columns.map((col, k) => {
			return (
                <td className="font-medium" key={ k }>
                    <TableCellContents col={ col } data={ dta } />
                </td>
            )
		})
		return (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800" key={ j }>
            	{ rw }
            </tr>
		)
	})

	return (
		<div className="p-2">
	        <div className="flex flex-row justify-end">
	            <div className="relative w-full max-w-sm items-center">
	                <input
	                	type="text" 
	                	placeholder="Buscar..."
	                	className="pl-10 h-[36px] w-full"
	                	value={ filterStr }
	                	onChange={(e) => { setFilterStr(e.target.value); setCurrentPage(1)} } 
	                />
	                <span className="absolute start-0 inset-y-0 flex items-center justify-center px-2">
	                    <PiMagnifyingGlassThin className="size-6 text-muted-foreground" />
	                </span>
	            </div>
                <div className="pt-1 cursor-pointer" onClick={() => { setFilterStr('') }} >
                    <MdClose className="size-6 text-muted-foreground" />
                </div>
	        </div>
	        <table className="w-full">
	            <thead>
	                <tr>
	                	{ hdr }
	                </tr>
	            </thead>
	            <tbody>
	            	{ bod }
	            </tbody>
	        </table>
	        <Pagination
	        	totalRecords={ filteredOrderedData.length }
	        	recordsPerPage={ recordsPerPage }
	        	page={ currentPage }
	        	changePage={ setCurrentPage }
	        	updateRecordsPerPage={ setRecordsPerPage }
	        />
	    </div>
	)
}