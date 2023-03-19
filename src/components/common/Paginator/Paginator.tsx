import React from 'react';
import { Pagination } from 'antd';
import s from './Paginator.module.css'

type PaginatorPropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = ({pageSize, totalItemsCount, currentPage, onPageChanged}: PaginatorPropsType) => {

    return (

            <div className={s.pagesBlock}>
                <Pagination
                    //defaultCurrent={1}
                    current={currentPage}
                    onChange={(page) => {
                        onPageChanged(page)
                    }}
                    total={totalItemsCount}
                    pageSize={pageSize}
                    showSizeChanger={false}
                />
            </div>
    )
}

