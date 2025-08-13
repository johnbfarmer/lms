import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import RecordsPerPageSelector from '@/components/RecordsPerPageSelector';

export default function Pagination({ recordsPerPage, totalRecords, page, changePage, updateRecordsPerPage }) {
    const [currentPage, setCurrentPage] = useState(page);
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    useEffect(() => {
        setCurrentPage(page)
    }, [page]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return
        }
        changePage(pageNumber);
        setCurrentPage(pageNumber);
    };

    const updateRpp = (r) => {
        updateRecordsPerPage(r);
        handlePageChange(1)
    };

    const firstLinkPage = currentPage > 1 ? currentPage - 1 : currentPage
    let pgLnxToShow = [firstLinkPage]
    if (firstLinkPage <= totalPages - 1) {
        pgLnxToShow.push( firstLinkPage + 1)
    }
    if (firstLinkPage <= totalPages - 2) {
        pgLnxToShow.push( firstLinkPage + 2)
    }
    if (currentPage > totalPages - 1) {
        pgLnxToShow = [currentPage]
        if (currentPage - 1 > 0) {
            pgLnxToShow.push(currentPage - 1)
        }
        if (currentPage - 2 > 0) {
            pgLnxToShow.push(currentPage - 2)
        }
        pgLnxToShow.sort()
    }
    const lnx = pgLnxToShow.map(p => {
        return (
            <div
                key={p}
                onClick={() => handlePageChange(p)}
                className={`px-2 py-1 h-fit rounded ${
                    currentPage === p ? 'text-slate-400 border border-slate-200 ' : 'text-slate-800  cursor-pointer'
                } mx-1`}
            >
                {p}
            </div>
        )
    })

    const isLast = currentPage === totalPages 
    const isFirst = currentPage === 1
    const ptrCssR =  isLast ? 'cursor-text' : 'cursor-pointer'
    const ptrCssL =  isFirst ? 'cursor-text' : 'cursor-pointer'

    return (
        <div>
            <div className="flex justify-center mt-4">
                <RecordsPerPageSelector recordsPerPage={ recordsPerPage } onUpdate={ updateRpp } />
                <div className="flex flex-row">
                    <div
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 h-fit text-slate-800 rounded border border-slate-200  ${ ptrCssL } disabled:text-slate-400 mr-1`}
                    >
                        <FiChevronsLeft className={ currentPage === 1 ? 'text-slate-400' : 'text-slate-800'} />
                    </div>
                    <div
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 h-fit text-slate-800 rounded border border-slate-200  ${ ptrCssL } disabled:text-slate-400 mx-1`}
                    >
                        <FaChevronLeft className={ currentPage === 1 ? 'text-slate-400' : 'text-slate-800'} />
                    </div>

                    { lnx }

                    <div
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 h-fit text-slate-800 rounded border border-slate-200  ${ ptrCssR } disabled:text-slate-400 mx-1`}
                    >
                        <FaChevronRight className={ currentPage === totalPages ? 'text-slate-400' : 'text-slate-800'} />
                    </div>
                    <div
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 h-fit text-slate-800 rounded border border-slate-200  ${ ptrCssR } disabled:text-slate-400 ml-1`}
                    >
                        <FiChevronsRight className={ currentPage === totalPages ? 'text-slate-400' : 'text-slate-800'} />
                    </div>
                </div>
                <div className="pt-2 sm:text-xs pl-4">Página { currentPage } de { totalPages }</div>
            </div>
        </div>
    );
}
