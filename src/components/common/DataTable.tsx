import React from 'react'
import { Table, TableColumn } from '@backstage/core-components';

type DenseTableProps = {
    title:string;
    columns:TableColumn[];
    data: any
  };

export const DataTable = ({ title, columns, data }: DenseTableProps) => {
    return (
      <Table
        title={title}
        options={{ search: true, paging: false }}
        columns={columns}
        data={data}
      />
    );
  };