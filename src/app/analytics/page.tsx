"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
// import "antd/dist/reset.css";

// Extending dayjs with the isBetween plugin
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export const runtime = 'edge';

interface ReportData {
    subid: string;
    time_till_click: number;
    anura_score: number;
    created_at: string;
}

export default function Analytics() {
    const [data, setData] = useState<{
        timeTillClickData: { subid: string, time_till_click: number, created_at: string }[];
        ctrData: { subid: string, ctr: number, created_at: string }[];
        anuraScoreData: { subid: string, anura_score: number, created_at: string }[];
    }>({
        timeTillClickData: [],
        ctrData: [],
        anuraScoreData: [],
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [domainName, setDomainName] = useState("Deal-Findr");
    const [apiUrl, setApiUrl] = useState<string>("");
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null); // Date range state

    useEffect(() => {
        if (typeof window !== "undefined") {
            const formattedDomain = window.location.hostname.replace(/^www\./, '').split('.')[0].toUpperCase();
            setDomainName(formattedDomain);

            // Set API URL dynamically
            setApiUrl(`${window.location.protocol}//${window.location.host}/api/report`);
        }
    }, []);

    useEffect(() => {
        if (!apiUrl) return;

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch report data');
                }
                const reports = await response.json();

                const aggregatedData: { [key: string]: ReportData } = {};

                reports.forEach((report: any) => {
                    const { subid, time_till_click, anura_score, created_at } = report;
                    if (!aggregatedData[subid]) {
                        aggregatedData[subid] = {
                            subid,
                            time_till_click: 0,
                            anura_score: 0,
                            created_at: created_at,
                        };
                    }

                    aggregatedData[subid].time_till_click += time_till_click;
                    aggregatedData[subid].anura_score += anura_score;
                });

                // Process each metric correctly:
                const timeTillClickData = Object.values(aggregatedData).map((item) => ({
                    subid: item.subid,
                    time_till_click: item.time_till_click,
                    created_at: item.created_at,
                }));

                const ctrData = Object.values(aggregatedData).map((item) => ({
                    subid: item.subid,
                    ctr: 0, // If CTR is not needed, you can leave it at 0
                    created_at: item.created_at,
                }));

                const anuraScoreData = Object.values(aggregatedData).map((item) => ({
                    subid: item.subid,
                    anura_score: item.anura_score,
                    created_at: item.created_at,
                }));

                // Set the data for each chart
                setData({ timeTillClickData, ctrData, anuraScoreData });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

    // Filter the data based on the selected date range
    const filterDataByDateRange = (chartData: any[]) => {
        return chartData.filter((item) => {
            if (!dateRange) return true;
            const itemDate = dayjs(item.created_at);
            return itemDate.isBetween(dateRange[0], dateRange[1], 'day', '[]');
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#0d0d3d] to-[#00d4ff] relative">
            <Image
                src="/curved-wings.png"
                alt="Left Wing"
                className="w-1/4 fixed bottom-16 left-0 hidden lg:block"
                width={320}
                height={320}
                priority
            />
            <div className="min-h-screen w-4/5 lg:w-2/5 pt-8 pb-20 sm:pb-12 mx-auto flex flex-col items-end">
                <a href="/" className="block text-2xl font-bold text-white mb-10">
                    {domainName}
                </a>

                {!loading && (
                    <div className="mb-6 w-full max-w-md">
                        <DatePicker.RangePicker
                            onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)}
                            format="YYYY-MM-DD"
                            className="w-full border-2 border-gray-500 bg-white text-gray-800 rounded-lg p-2 text-lg shadow-md hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                )}


                {loading ? (
                    <p className="text-lg">Loading...</p>
                ) : error ? (
                    <p className="text-red-500 text-lg">{error}</p>
                ) : (
                    <div className="w-full max-w-4xl space-y-10 mt-5">
                        {/* Time Till Click Chart */}
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:bg-indigo-500 hover:bg-opacity-20">
                            <h2 className="text-2xl font-semibold mb-4 text-highlight">Time Till Click per Subid</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={filterDataByDateRange(data.timeTillClickData)}>
                                    <XAxis
                                        dataKey="subid"
                                        tick={{ fill: 'white' }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
                                        tickLine={false}
                                        style={{ wordBreak: 'break-word' }}
                                    />

                                    <YAxis tick={{ fill: 'white' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}
                                        formatter={(value) => (typeof value === 'number' ? value.toFixed(2) : value)}
                                    />
                                    <Legend />
                                    <Bar dataKey="time_till_click" fill="#4F46E5" name="Time Till Click" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Click Through Rate (CTR) Chart */}
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:bg-indigo-500 hover:bg-opacity-20">
                            <h2 className="text-2xl font-semibold mb-4 text-highlight">Click Through Rate (CTR) per Subid</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={filterDataByDateRange(data.ctrData)}>
                                    <XAxis
                                        dataKey="subid"
                                        tick={{ fill: 'white' }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
                                        tickLine={false}
                                        style={{ wordBreak: 'break-word' }}
                                    />
                                    <YAxis tick={{ fill: 'white' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}
                                        formatter={(value) => (typeof value === 'number' ? value.toFixed(2) : value)}
                                    />
                                    <Legend />
                                    <Bar dataKey="ctr" fill="#10B981" name="Click Through Rate (CTR)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Anura Fraud Score Chart */}
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:bg-indigo-500 hover:bg-opacity-20">
                            <h2 className="text-2xl font-semibold mb-4 text-highlight">Anura Fraud Score per Subid</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={filterDataByDateRange(data.anuraScoreData)}>
                                    <XAxis
                                        dataKey="subid"
                                        tick={{ fill: 'white' }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
                                        tickLine={false}
                                        style={{ wordBreak: 'break-word' }}
                                    />
                                    <YAxis tick={{ fill: 'white' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}
                                        formatter={(value) => (typeof value === 'number' ? value.toFixed(2) : value)}
                                    />
                                    <Legend />
                                    <Bar dataKey="anura_score" fill="#EF4444" name="Anura Fraud Score" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
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
