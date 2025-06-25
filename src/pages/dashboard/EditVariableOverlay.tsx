import React, { useState, useRef } from 'react';
import OverlayPanel from '../../components/OverlayPanel';
import { variableGroups, type Variable } from '../../mock-data/dashboardData';

import { RxCross2 } from 'react-icons/rx';
import { IoMdSearch } from 'react-icons/io';
import { IoSparklesSharp, IoCheckmarkSharp } from 'react-icons/io5';
import { TbReload } from 'react-icons/tb';
import { FiPlus, FiInfo } from 'react-icons/fi';
import { FaAngleDown } from 'react-icons/fa6';

export interface EditVariableOverlayProps {
  open: boolean;
  onClose: () => void;
}

// Overlay component to allow users to select and edit variable groups
const EditVariableOverlay: React.FC<EditVariableOverlayProps> = ({ open, onClose }) => {
  const [variableCategory1, setVariableCategory1] = useState([2, 3]);
  const [variableCategory2, setVariableCategory2] = useState([2, 3, 6]);
  const [variableCategory3, setVariableCategory3] = useState([2, 3]);

  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const hoverTimerRef = useRef<number | null>(null);

  // Toggle selection of variables for a given category
  const handleVariableCategoryToggle = (id: number, setter: React.Dispatch<React.SetStateAction<number[]>>) => {
    setter((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Show tooltip-style info panel after hovering over item for 1.5s
  const handleMouseEnter = (id: number) => {
    if (id === 2) {
      hoverTimerRef.current = window.setTimeout(() => {
        setShowInfoPanel(true);
      }, 1500);
    }
  };

  const handleMouseLeave = (id: number) => {
    if (id === 2) {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      setShowInfoPanel(false);
    }
  };

  return (
    <OverlayPanel open={open} onClose={onClose}>
      <aside className="flex h-full flex-col px-2 py-3 sm:p-5 xl:px-10 xl:py-12">
        {/* Header with close button */}
        <header className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl">Edit Variables</h2>
          <button className="text-lg hover:text-[#cdcdcd] sm:text-xl md:text-2xl xl:text-3xl" onClick={onClose} aria-label="Close panel">
            <RxCross2 />
          </button>
        </header>

        {/* Top control bar: Search, Autofill, Rerun */}
        <section className="flex gap-4 py-2 md:py-4 xl:py-7">
          <div className="relative flex w-[70%] items-center xl:text-lg">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md border border-[#5A5A5A] bg-[#242424] py-1 pr-3 pl-10 text-white placeholder:text-white focus:border-[#8f8e8e] focus:outline-none"
            />
            <IoMdSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-white" />
          </div>

          <button className="flex items-center gap-2 rounded-md border bg-[#242424] px-2 py-0.5 text-sm xl:px-5 xl:py-1 xl:text-lg">
            <IoSparklesSharp className="rotate-90" />
            <span>Autofill</span>
          </button>

          <button className="flex items-center gap-2 rounded-md border bg-[#708340]/25 px-2 py-0.5 text-sm text-[#C9FF3B] xl:px-5 xl:py-1 xl:text-lg">
            <TbReload className="text-xl" />
            <span>Rerun</span>
          </button>
        </section>

        {/* Variable group sections */}
        <section className="flex flex-col gap-3 xl:gap-5">
          <section className="flex flex-col justify-between rounded-md border border-[#5A5A5A] bg-[#161618]">
            <div className="px-6 pt-2 pb-6">
              {/* Render each variable category group */}
              {[
                { label: 'Variable category 1', data: variableGroups.VariableCategory1, state: variableCategory1, setter: setVariableCategory1 },
                { label: 'Variable category 2', data: variableGroups.VariableCategory2, state: variableCategory2, setter: setVariableCategory2 },
                { label: 'Variable category 3', data: variableGroups.VariableCategory3, state: variableCategory3, setter: setVariableCategory3 },
              ].map((group, i) => (
                <section key={i}>
                  <h2 className="pt-5 text-sm sm:text-base lg:text-lg xl:text-xl">{group.label}</h2>
                  <div className="flex flex-wrap">
                    {group.data.map((val: Variable) => (
                      <button
                        key={val.id}
                        className={`mt-2 mr-2 flex cursor-pointer items-center gap-4 rounded-2xl border px-3 py-0.5 text-xs sm:text-sm md:text-base lg:mt-4 lg:mr-3 lg:text-xl ${
                          group.state.includes(val.id) ? 'border-[#CCFF00] bg-[#708340]/25 text-[#C9FF3B]' : 'border-[#5A5A5A] bg-[#242424]'
                        }`}
                        onClick={() => handleVariableCategoryToggle(val.id, group.setter)}
                        onMouseEnter={() => handleMouseEnter(val.id)}
                        onMouseLeave={() => handleMouseLeave(val.id)}
                      >
                        <span>{val.title}</span>
                        <span className="flex items-center gap-1 text-sm">
                          <IoSparklesSharp className="rotate-90" />
                          {group.state.includes(val.id) ? <IoCheckmarkSharp className="text-lg" /> : <FiPlus className="text-lg" />}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Contextual Info Panel on Hover */}
            {showInfoPanel && (
              <aside className="translate-y-0 transform rounded-b-md border-t border-[#5A5A5A] bg-[#222324] px-7 py-6 opacity-100 transition-all duration-500 ease-in-out">
                <h2 className="flex items-center gap-4">
                  <span className="text-base sm:text-lg md:text-xl xl:text-2xl">Co2 Distribution</span>
                  <FiInfo className="text-lg" />
                </h2>
                <p className="py-2 text-sm text-[#BBBBBB] md:text-base xl:text-lg">
                  But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people
                  of all ages. Whether you're a student, a professional, or a senior citizen, Switch adapts to your needs and lifestyle.
                </p>
              </aside>
            )}
          </section>

          {/* Dropdown Sections (non-interactive for now) */}
          <section className="flex items-center justify-between rounded-md border border-[#5A5A5A] bg-[#222324] px-6 py-2 text-[#C8E972]">
            <h2 className="text-base md:text-lg lg:text-xl">Primary Variables</h2>
            <button className="rounded-2xl border px-1 py-0.5 lg:px-2.5 lg:py-1.5" aria-label="Toggle primary variables">
              <FaAngleDown />
            </button>
          </section>
          <section className="flex items-center justify-between rounded-md border border-[#5A5A5A] bg-[#222324] px-6 py-2 text-[#C8E972]">
            <h2 className="text-base md:text-lg lg:text-xl">Secondary Variables</h2>
            <button className="rounded-2xl border px-1 py-0.5 lg:px-2.5 lg:py-1.5" aria-label="Toggle primary variables">
              <FaAngleDown />
            </button>
          </section>
        </section>
      </aside>
    </OverlayPanel>
  );
};

export default EditVariableOverlay;
