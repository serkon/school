import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PaginationProps, Space, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

import { AppDispatch, RootState } from './store/store';
import { getPagedList } from './store/school';
import { School } from './store/dto';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

interface TableParams {
  pagination?: TablePaginationConfig;
  filters?: Record<string, FilterValue | null>;
  sortField?: string;
  sortOrder?: string;
}


const App = () => {
  const school = useSelector((state:RootState) => state.school);
  const dispatch = useDispatch<AppDispatch>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 500,
    },
  });
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<School[]>();

  const columns: ColumnsType<School> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Institution',
      dataIndex: 'institution',
      key: 'institution.name',
      sorter: true,
      render: (text) => <a>{text.name}</a>,
    }
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<School> | SorterResult<School>[],
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    console.log("", pagination, sorter);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  useEffect(() => {
    dispatch(getPagedList({ page: 1, size: 10 }));
  }, [dispatch]);
  
  return (
    <div style={{paddingLeft: '24px'}}>
      <h1>School App</h1>

    <section style={{paddingBottom: '24px'}}>
      <h4>Selected Rows</h4>
      <div>{selectedRowKeys.join(", ")}</div>
    </section>

      <Table 
      rowSelection={rowSelection}  
      columns={columns} 
      dataSource={school.data} 
      rowKey={(record) => record.id} 
      pagination={tableParams.pagination}
      onChange={handleTableChange}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {console.log( rowIndex, event, record)}, // click row
          onDoubleClick: (event) => {}, // double click row
          onContextMenu: (event) => {}, // right button click row
          onMouseEnter: (event) => {}, // mouse enter row
          onMouseLeave: (event) => {}, // mouse leave row
        };
      }}
      />

    </div>
  );
};

export default App;