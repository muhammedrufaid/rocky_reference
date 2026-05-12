"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/Container";
import Pagination from "@/components/common/Pagination";
import { teamMembers } from "@/utils/data";
import { getTeamMemberSlug } from "@/utils/selectors";
import { SelectChevronDownIcon, TeamSearchIcon } from "@/utils/icons";

const ITEMS_PER_PAGE = 12;

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

const TeamMembersSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const departments = useMemo(() => {
    return [...new Set(teamMembers.map((m) => m.department))].sort();
  }, []);

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.department.toLowerCase().includes(searchQuery.toLowerCase());
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
        {/* Heading */}


        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 max-w-2xl">
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
              placeholder="Search by name or department..."
              aria-label="Search team members"
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg bg-white outline-none transition-all duration-200 focus:border-[#0d365e] focus:ring-2 focus:ring-[#0d365e]/20"
            />
          </div>
          <div className="relative w-full sm:w-auto sm:min-w-[220px] flex-shrink-0">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              aria-label="Filter by department"
              className="w-full pl-4 pr-10 py-2.5 sm:py-3 text-sm text-gray-700 border border-gray-200 rounded-lg bg-white appearance-none outline-none cursor-pointer transition-all duration-200 focus:border-[#0d365e] focus:ring-2 focus:ring-[#0d365e]/20"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              aria-hidden
            >
              <SelectChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Pagination - above cards */}
        {filteredMembers.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredMembers.length}
            pageSize={ITEMS_PER_PAGE}
            className="mb-6 sm:mb-8"
          />
        )}

        {/* Grid - image and content separated */}
        <AnimatePresence mode="popLayout">
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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
                  <Link
                    href={`/our-team/${getTeamMemberSlug(member)}`}
                    className="group flex flex-col gap-4 sm:gap-5 rounded-xl outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#0d365e]"
                  >
                    {/* Image - separate block */}
                    <div className="relative w-full aspect-[6/7] overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-bl from-[#0d365e]/10 via-[#f5f3f0] to-[#e7dccd] border border-gray-100/80 shadow-sm">
                      <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                      </div>

                      {/* Overlay on hover */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#0d365e]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-hidden
                      />

                      {/* Department badge */}
                      <span
                        className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium tracking-wider uppercase text-[#0d365e] bg-white/95 backdrop-blur-sm rounded-full border border-white/80 shadow-sm"
                      >
                        {member.department}
                      </span>

                    </div>

                    {/* Content - separate block */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base sm:text-lg font-medium text-[#0d365e] group-hover:text-[#1a5a96] transition-colors duration-200">
                        {member.name}
                      </h3>
                      {member.designation && (
                        <p className="text-sm text-[#9f8870] group-hover:text-[#0d365e]/80 transition-colors duration-200">
                          {member.designation}
                        </p>
                      )}
                      <div
                        className="h-0.5 w-8 rounded-full bg-[var(--rocky-blue)] transition-all duration-300 group-hover:w-12"
                        aria-hidden
                      />
                    </div>
                  </Link>
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
      </Container>
    </section>
  );
};

export default TeamMembersSection;