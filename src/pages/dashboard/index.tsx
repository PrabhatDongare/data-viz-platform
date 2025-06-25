import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EditVariableOverlay from './EditVariableOverlay';
import { kpiData, type KPI } from '../../mock-data/dashboardData';

import { BsFillLightningChargeFill, BsQuestionCircle } from 'react-icons/bs';
import { IoSparklesSharp } from 'react-icons/io5';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdRestore, MdKeyboardArrowUp } from 'react-icons/md';
import { LuUpload } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa6';

import LineChart from '../../components/LineChart';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (localStorage.getItem('idToken') === null) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      {/* Main Section Container */}
      <section className="h-full rounded-md border-[0.5px] border-[#5A5A5A] bg-[#0E0D0D] px-3 py-3 sm:px-8 sm:py-6">
        {/* Header with title and nav buttons */}
        <header>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="flex items-baseline gap-1 pl-1 font-bold sm:gap-3">
              <BsFillLightningChargeFill className="text-2xl" />
              <span className="text-2xl sm:text-3xl lg:text-4xl">Charging Station</span>
            </h1>

            <nav className="flex gap-1 md:gap-2.5 [&>*]:rounded-md [&>*]:border [&>*]:border-[#5A5A5A] [&>*]:bg-[#242424] [&>*]:px-1 [&>*]:py-0.5 md:[&>*]:px-2 md:[&>*]:py-1.5">
              <button className="text-lg md:text-2xl" aria-label="Restore">
                <MdRestore />
              </button>
              <button className="cursor-pointer text-[1rem]" onClick={() => setOverlayOpen(true)}>
                Edit Variables
              </button>
              <button className="text-lg md:text-2xl" aria-label="Upload">
                <LuUpload />
              </button>
            </nav>
          </div>

          {/* Best Scenario Section */}
          <section className="mt-4 mb-4 flex flex-col gap-4 sm:mb-7 md:mb-10 lg:mt-8 lg:mb-14">
            <header className="flex justify-between text-lg text-[#DCFF7FFD] sm:text-xl md:text-2xl">
              <h2 className="flex items-center gap-2 font-semibold">
                <IoSparklesSharp className="rotate-90" />
                <span>Best Scenario Results</span>
              </h2>
              <button className="rounded-xl border px-1.5 sm:rounded-3xl sm:text-lg md:px-3 md:text-2xl" aria-label="Toggle results">
                <MdKeyboardArrowUp />
              </button>
            </header>

            {/* Scenario Messages */}
            <article className="flex items-center justify-between rounded-lg border px-2 py-1 text-[#C9FF3B] md:px-6 md:py-4">
              <span className="text-xs sm:text-sm xl:text-base">
                The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.
              </span>
              <button aria-label="More options">
                <HiOutlineDotsHorizontal className="pl-1 md:text-xl" />
              </button>
            </article>

            <article className="flex items-center justify-between rounded-lg border px-2 py-1 text-[#C9FF3B] md:px-6 md:py-4">
              <span className="text-xs sm:text-sm xl:text-base">
                The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.
              </span>
              <button aria-label="More options">
                <HiOutlineDotsHorizontal className="pl-1 md:text-xl" />
              </button>
            </article>
          </section>
        </header>

        <section className="bg-stone-00 flex min-h-[60%] w-full flex-wrap gap-4 lg:flex-nowrap 2xl:justify-center">
          {/* Line Chart Section */}
          <section className="bg-sky-00 w-full lg:w-7/12 2xl:w-6/12">
            <h2 className="text-xl font-semibold xl:text-2xl">Graphs</h2>
            <div className="flex">
              <LineChart />
            </div>
          </section>

          {/* KPI Cards Section */}
          <section className="w-full lg:w-5/12 2xl:w-6/12">
            <header className="flex items-center justify-between">
              <h2 className="w-full text-xl font-semibold xl:text-2xl">Key Performance Indicators</h2>
              <button className="flex items-center gap-2 rounded-md border-[0.5px] border-[#5A5A5A] bg-[#242424] px-1 py-0.5 text-xs sm:py-1 lg:text-base xl:px-3 xl:text-lg">
                <span>Variables</span>
                <FaPlus className="text-sm xl:text-base" />
              </button>
            </header>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {Object.values(kpiData).map((kpi: KPI) => (
                <article key={kpi.heading} className="flex max-h-60 flex-col justify-between rounded-md border border-[#525252] bg-[#222324] p-4 xl:p-7">
                  <header>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium sm:text-base xl:text-lg">{kpi.heading}</h3>
                      <button aria-label={`Information about ${kpi.heading}`}>
                        <BsQuestionCircle className="text-[#BBBBBB]" />
                      </button>
                    </div>
                    <p className="py-1.5 text-xs text-[#BBBBBB] xl:py-2.5 xl:text-base">{kpi.description}</p>
                  </header>
                  <p className="text-right text-xl font-bold md:text-2xl xl:text-4xl">{kpi.highlight}</p>
                </article>
              ))}
            </div>
          </section>
        </section>
      </section>

      {/* Edit Variables Side Panel */}
      <EditVariableOverlay open={isOverlayOpen} onClose={() => setOverlayOpen(false)} />
    </>
  );
};

export default Dashboard;
