"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/Container";
import Pagination from "@/components/common/Pagination";
import { teamMembers2 } from "@/utils/data";
import { SelectChevronDownIcon, TeamSearchIcon } from "@/utils/icons";

const ITEMS_PER_PAGE = 15;

function getTeamMemberInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

type TeamMemberCardImageProps = {
  name: string;
  image: string;
};

const TeamMemberCardImage: React.FC<TeamMemberCardImageProps> = ({ name, image }) => {
  const trimmed = image.trim();
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [trimmed]);

  const showPlaceholder = !trimmed || loadFailed;

  return (
    <>
      {!showPlaceholder && (
        <Image
          src={trimmed}
          alt={name.trim()}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          onError={() => setLoadFailed(true)}
        />
      )}
      {showPlaceholder && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d365e]/10 via-transparent to-[#e7dccd]/50"
          aria-hidden
        >
          <span className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0d365e]/35">
            {getTeamMemberInitials(name)}
          </span>
        </div>
      )}
    </>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.25 } },
};

type DepartmentFilterProps = {
  departments: string[];
  value: string;
  onChange: (value: string) => void;
};

function DepartmentFilter({ departments, value, onChange }: DepartmentFilterProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () => [{ value: "", label: "All Departments" }, ...departments.map((d) => ({ value: d, label: d }))],
    [departments],
  );

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? "All Departments";

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full sm:w-auto sm:min-w-[220px] shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Filter by department"
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white py-2.5 sm:py-3 pl-4 pr-10 text-left text-sm text-gray-700 outline-none transition-all duration-200 focus:border-[#0d365e] focus:ring-2 focus:ring-[#0d365e]/20"
      >
        <span className="truncate">{selectedLabel}</span>
        <span
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <SelectChevronDownIcon />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Departments"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value || "all"} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#0d365e] text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const TeamMembersSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const departments = useMemo(() => {
    const names = teamMembers2
      .map((m) => m.department.trim())
      .filter((d) => d.length > 0);
    return [...new Set(names)].sort();
  }, []);

  useEffect(() => {
    if (departments.length === 0 && departmentFilter) {
      setDepartmentFilter("");
    }
  }, [departments, departmentFilter]);

  const filteredMembers = useMemo(() => {
    return teamMembers2.filter((member) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        member.name.toLowerCase().includes(q) ||
        member.department.toLowerCase().includes(q) ||
        (member.designation?.toLowerCase().includes(q) ?? false);
      const matchesDepartment =
        !departmentFilter || member.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    });
  }, [searchQuery, departmentFilter]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMembers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMembers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, departmentFilter]);

  return (
    <section
      className="pb-12 sm:pb-16 md:pb-20 lg:pb-24"
      aria-labelledby="team-members-heading"
    >
      <Container>
        <h2 id="team-members-heading" className="sr-only">
          Team members
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
          <div className="relative flex-1 w-full min-w-0">
            <span
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden
            >
              <TeamSearchIcon />
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, or department..."
              aria-label="Search team members"
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg bg-white outline-none transition-all duration-200 focus:border-[#0d365e] focus:ring-2 focus:ring-[#0d365e]/20"
            />
          </div>
          {departments.length > 0 && (
            <DepartmentFilter
              departments={departments}
              value={departmentFilter}
              onChange={setDepartmentFilter}
            />
          )}
        </div>

        {/* Grid - image and content separated */}
        <AnimatePresence mode="popLayout">
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
              {paginatedMembers.map((member, index) => (
                <motion.article
                  key={member.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  layout
                >
                  <div className="group flex flex-col gap-4 sm:gap-5 rounded-xl">
                    {/* Image - separate block */}
                    <div className="relative w-full aspect-[6/7] overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-bl from-[#0d365e]/10 via-[#f5f3f0] to-[#e7dccd] border border-gray-100/80 shadow-sm">
                      <div className="relative h-full w-full">
                        <TeamMemberCardImage name={member.name} image={member.image} />
                      </div>

                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#0d365e]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-hidden
                      />
                    </div>

                    {/* Content - separate block */}
                    <div className="flex flex-col gap-2">
                      <h3 className="normal-case text-base sm:text-lg font-medium text-[#0d365e] group-hover:text-[#1a5a96] transition-colors duration-200">
                        {member.name.trim()}
                      </h3>
                      {member.designation && (
                        <p className="text-sm text-[#9f8870] group-hover:text-[#0d365e]/80 transition-colors duration-200">
                          {member.designation}
                        </p>
                      )}
                      <div
                        className="h-0.5 w-8 rounded-full bg-[var(--rocky-blue)]"
                        aria-hidden
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-16 sm:py-20 text-center rounded-2xl border-2 border-dashed border-gray-200 bg-white"
            >
              <p className="text-base text-gray-600">No team members match your search.</p>
              <p className="mt-2 text-sm text-gray-400">Try adjusting your search or filter.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredMembers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredMembers.length}
            pageSize={ITEMS_PER_PAGE}
            className="mt-8 sm:mt-10"
          />
        )}
      </Container>
    </section>
  );
};

export default TeamMembersSection;