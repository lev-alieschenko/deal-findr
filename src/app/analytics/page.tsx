'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const runtime = 'edge';

interface ReportData {
    subid: string;
    time_till_click: number;
    anuraScore: number;
    totalClicks: number;
    totalImpressions: number;
    ctr: number;
}

export default function Analytics() {
    const [data, setData] = useState<ReportData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [domainName, setDomainName] = useState("Deal-Findr");
    const [apiUrl, setApiUrl] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const formattedDomain = window.location.hostname.replace(/^www\./, '').split('.')[0].toUpperCase();
            setDomainName(formattedDomain);
            
            // Set API URL dynamically
            setApiUrl(`${window.location.protocol}//${window.location.host}/api/report`);
        }
    }, []);

    useEffect(() => {
        if (!apiUrl) return; // Prevent fetch until API URL is set

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch report data');
                }
                const reports = await response.json();

                const aggregatedData: { [key: string]: ReportData } = {};

                reports.forEach((report: any) => {
                    const { subid, time_till_click, anuraScore } = report;
                    if (!aggregatedData[subid]) {
                        aggregatedData[subid] = {
                            subid,
                            time_till_click: 0,
                            anuraScore: 0,
                            totalClicks: 0,
                            totalImpressions: 0,
                            ctr: 0,
                        };
                    }

                    aggregatedData[subid].time_till_click += time_till_click;
                    aggregatedData[subid].anuraScore += anuraScore;
                    aggregatedData[subid].totalClicks += 1;
                });

                const processedData = Object.values(aggregatedData).map((item) => ({
                    ...item,
                    time_till_click: item.time_till_click / item.totalClicks,
                    anuraScore: item.anuraScore / item.totalClicks,
                    ctr: (item.totalClicks / Math.max(item.totalImpressions, 1)) * 100,
                }));

                setData(processedData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

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
                <a href="/" className="block text-xl sm:text-2xl md:text-2xl font-bold text-white">
                    <span>{domainName}</span>
                </a>
                {loading ? (
                    <p className="text-lg">Loading...</p>
                ) : error ? (
                    <p className="text-red-500 text-lg">{error}</p>
                ) : (
                    <div className="w-full max-w-4xl space-y-10 mt-10">
                        {[{ title: 'Time Till Click', key: 'time_till_click', color: '#4F46E5' },
                          { title: 'Click Through Rate (CTR)', key: 'ctr', color: '#10B981' },
                          { title: 'Anura Fraud Score', key: 'anuraScore', color: '#EF4444' }].map(({ title, key, color }) => (
                            <div key={key} className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">{title} per Subid</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={data}>
                                        <XAxis dataKey="subid" tick={{ fill: 'white' }} />
                                        <YAxis tick={{ fill: 'white' }} />
                                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }} />
                                        <Legend />
                                        <Bar dataKey={key} fill={color} name={title} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ))}
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
