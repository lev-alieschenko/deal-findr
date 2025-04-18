"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { Table, DatePicker, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

interface ReportData {
  subid: string;
  name: string;
  time_till_click: number;
  anura_score: number;
  created_at: string;
  client_ip: string;
  userAgent: string;
}

export default function Analytics() {
  const [domainName, setDomainName] = useState<string>("");
  const [data, setData] = useState<ReportData[]>([]);
  const [anuraData, setAnuraData] = useState<ReportData[]>([]);
  const [apiUrl, setApiUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ReportData[]>([]);
  const [filteredAnuraData, setFilteredAnuraData] = useState<ReportData[]>([]);
  const [anuraHeaders, setAnuraHeaders] = useState<string[]>([]);
  const [anuraRows, setAnuraRows] = useState<any[][]>([]);
  const [loadingAnura, setLoadingAnura] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const formattedDomain = window.location.hostname.replace(/^www\./, "").split(".")[0].toUpperCase();
      setDomainName(formattedDomain);
      setApiUrl(`${window.location.protocol}//${window.location.host}/api/report`);
    }
  }, []);

  useEffect(() => {
    if (!apiUrl) return;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch report data");
        }
        const reports = await response.json();
        setData(reports);
        setFilteredData(reports);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (!apiUrl || !dateRange[0] || !dateRange[1]) return;

    const fetchAnuraData = async () => {
      try {
        const start = dateRange[0]?.format("YYYYMMDD");
        const end = dateRange[1]?.format("YYYYMMDD");

        const response = await fetch(`${window.location.protocol}//${window.location.host}/api/anura?start=${start}&end=${end}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Anura report data");
        }
        const data = await response.json();
        if (data?.table?.headers && data?.table.rows) {
          setAnuraHeaders(data.table.headers);
          setAnuraRows(data.table.rows);
        }
      } catch (err: any) {
        console.error("Anura Fetch Error:", err);
      }
    };

    fetchAnuraData();
  }, [apiUrl, dateRange]);


  const filterData = (source: ReportData[]) => {
    return source.filter((item) => {
      const matchesSearchText =
        item.subid.toLowerCase().includes(searchText.toLowerCase()) ||
        dayjs(item.created_at).format("YYYY.MM.DD HH:mm").includes(searchText);

      const matchesDateRange =
        (dateRange[0] === null || dayjs(item.created_at).isAfter(dateRange[0], "day")) &&
        (dateRange[1] === null || dayjs(item.created_at).isBefore(dateRange[1], "day"));

      return matchesSearchText && matchesDateRange;
    });
  };

  useEffect(() => {
    setFilteredData(filterData(data));
    setFilteredAnuraData(filterData(anuraData));
  }, [searchText, dateRange, data, anuraData]);

  const getColumnSearchProps = (dataIndex: keyof ReportData): ColumnType<ReportData> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className="p-4">
        <Input
          autoFocus
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] || ""}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          className="mb-2"
        />
        <Space>
          <Button
            onClick={() => {
              setSelectedKeys([]);
              clearFilters?.();
              confirm();
            }}
            size="small"
            className="text-red-500"
          >
            Clear
          </Button>
          <Button onClick={() => confirm()} size="small" className="text-blue-500">
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes((value as string).toLowerCase()),
  });

  const columns: ColumnType<ReportData>[] = [
    { title: "Sub ID", dataIndex: "subid", key: "subid", width: 150, ...getColumnSearchProps("subid") },
    { title: "Name", dataIndex: "name", key: "name", width: 150, ...getColumnSearchProps("name") },
    { title: "Time Till Click", dataIndex: "time_till_click", key: "time_till_click", width: 200 },
    { title: "Anura Score", dataIndex: "anura_score", key: "anura_score", width: 200 },
  ];

  const expandedRowRender = (record: ReportData) => {
    const filteredRecords = data.filter((item) => item.subid === record.subid);

    const groupedByDate = filteredRecords.reduce((groups: any, item: any) => {
      const date = dayjs(item.created_at).format("YYYY-MM-DD");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});

    return Object.keys(groupedByDate).map((date) => (
      <div key={date}>
        <h3 className="text-lg font-semibold mb-2">{date}</h3>
        <table className="table-auto w-full mb-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Sub ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Time Till Click</th>
              <th className="border px-4 py-2">Anura Score</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Client IP</th>
              <th className="border px-4 py-2">User Agent</th>
            </tr>
          </thead>
          <tbody>
            {groupedByDate[date].map((item: ReportData) => (
              <tr key={item.created_at}>
                <td className="border px-4 py-2">{item.subid}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.time_till_click}</td>
                <td className="border px-4 py-2">{item.anura_score}</td>
                <td className="border px-4 py-2">{dayjs(item.created_at).format("YYYY-MM-DD")}</td>
                <td className="border px-4 py-2">{item.client_ip}</td>
                <td className="border px-4 py-2">{item.userAgent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ current: page, pageSize });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#0d0d3d] to-[#00d4ff] relative">
      <Image src="/curved-wings.png" alt="Left Wing" className="w-1/4 fixed bottom-16 left-0 hidden lg:block" width={320} height={320} priority />
      <div className="min-h-screen w-4/5 lg:w-2/5 pt-8 pb-20 sm:pb-12 mx-auto flex flex-col items-end">
        <a href="/" className="block text-lg font-bold text-white mb-10">{domainName}</a>

        {!loading && (
          <div className="mb-6 w-full max-w-md">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="w-full sm:w-auto flex-1">
                <RangePicker
                  onChange={(dates) => setDateRange(dates ? [dates[0], dates[1]] : [null, null])}
                  format="YYYY-MM-DD"
                  className="w-full border-2 border-gray-500 bg-white text-gray-800 rounded-lg p-2 shadow-md hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="w-full sm:w-auto flex-1">
                <Input
                  placeholder="Search by Sub ID or Date"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  prefix={<SearchOutlined />}
                  className="w-full border-2 border-gray-500 bg-white text-gray-800 rounded-lg p-2 shadow-md"
                />
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : (
          <>
            <div className="mb-6 w-full">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Time Till Click Data</h2>
              <Table
                columns={columns}
                dataSource={filteredData}
                rowKey={(record) => `${record.subid}-${record.created_at}`}
                expandable={{ expandedRowRender, rowExpandable: () => true }}
                pagination={{ ...pagination, onChange: handlePaginationChange }}
                loading={loading}
                rowClassName="hover:bg-gray-100"
                scroll={{ x: "max-content" }}
              />
            </div>

            <div className="mb-6 w-full">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">Click Through Rate (CTR) Data</h2>
              <Table
                columns={columns}
                dataSource={filteredData}
                rowKey={(record) => `${record.subid}-${record.created_at}`}
                expandable={{ expandedRowRender, rowExpandable: () => true }}
                pagination={{ ...pagination, onChange: handlePaginationChange }}
                loading={loading}
                rowClassName="hover:bg-gray-100"
                scroll={{ x: "max-content" }}
              />
            </div>

            <div className="w-full">
              <h2 className="text-2xl font-semibold text-red-400 mb-4">Anura Score Data</h2>
              <Table
                columns={anuraHeaders.map((header) => ({
                  title: header.replace(/\+/g, " "),
                  dataIndex: header,
                  key: header,
                  render: (text: any) => (typeof text === "number" ? text.toLocaleString() : text),
                }))}
                dataSource={anuraRows.map((row, index) => {
                  const rowData: Record<string, any> = {};
                  anuraHeaders.forEach((header, i) => {
                    rowData[header] = row[i];
                  });
                  rowData.key = index;
                  return rowData;
                })}
                loading={loadingAnura}
                pagination={false}
                scroll={{ x: "max-content" }}
                rowClassName="hover:bg-gray-100"
              />
            </div>

          </>
        )}
      </div>
      <Image
        src="/curved-wings.png"
        alt="Right Wing"
        className="w-1/4 fixed bottom-16 right-0 transform scale-x-[-1] hidden lg:block"
        width={320}
        height={320}
        priority
      />
    </div>
  );
}
