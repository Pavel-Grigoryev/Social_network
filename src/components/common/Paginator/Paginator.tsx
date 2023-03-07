import React, {useState} from 'react';
import s from './Paginator.module.css'

type PaginatorPropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    paginationGroupSize: number
}

export const Paginator = ({pageSize, totalItemsCount, currentPage, onPageChanged,  paginationGroupSize}: PaginatorPropsType) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const paginationGroupCount = Math.ceil(pagesCount / paginationGroupSize);
    const [pagGroupNumber, setPagGroupNumber] = useState(1);
    const beginPagGroupNumber = (pagGroupNumber - 1)*paginationGroupSize + 1;
    const endPagGroupNumber = pagGroupNumber * paginationGroupSize;
    
    const decrPagGroupNumber = () => {
        const newPagGroupNumber = pagGroupNumber - 1
        setPagGroupNumber(newPagGroupNumber);
        onPageChanged(newPagGroupNumber*paginationGroupSize);
    }

    const incrPagGroupNumber = () => {
        const newPagGroupNumber = pagGroupNumber + 1
        setPagGroupNumber(newPagGroupNumber);
        onPageChanged((newPagGroupNumber - 1)*paginationGroupSize +1);
    }



    return (
            <div className={s.pagesBlock}>
                {pagGroupNumber > 1 && <button onClick={decrPagGroupNumber}>Prev</button>}
                {pages.filter(p => beginPagGroupNumber <= p && p <= endPagGroupNumber).map(p => <span
                    key={p} className={currentPage === p ? s.selectPage : ''}
                    onClick={() => {
                        onPageChanged(p)
                    }}
                >
                    {p}
                </span>)}
                {pagGroupNumber < paginationGroupCount && <button onClick={incrPagGroupNumber}>Next</button>}
            </div>
    )
}

