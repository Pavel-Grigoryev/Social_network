import React from 'react';
import s from './Paginator.module.css'

type PaginatorPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = ({pageSize, totalUsersCount, currentPage, onPageChanged}: PaginatorPropsType) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
            <div className={s.pagesBlock}>
                {pages.map(p => <span
                    key={p} className={currentPage === p ? s.selectPage : ''}
                    onClick={() => {
                        onPageChanged(p)
                    }}
                >
                    {p}
                </span>)}
            </div>
    )
}

