"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { teamMembers } from "@/utils/data";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const TeamMembersSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");

  const departments = useMemo(() => {
    const depts = [...new Set(teamMembers.map((m) => m.department))].sort();
    return depts;
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

  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-white"
      aria-labelledby="team-members-heading"
    >
      <Container>
        {/* Section Heading */}
        <header className="mb-10 md:mb-12">
          <h2
            id="team-members-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
            style={{ color: "#0d365e" }}
          >
            Meet Our Team
          </h2>
          <p className="mt-3 text-sm md:text-base max-w-xl" style={{ color: "#555" }}>
            Browse our team of specialists across departments.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-12">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden
            >
              <SearchIcon />
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or department..."
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0d365e]/20 focus:border-[#0d365e] transition-colors"
              style={{ color: "#333" }}
              aria-label="Search team members"
            />
          </div>

          {/* Department Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0d365e]/20 focus:border-[#0d365e] transition-colors cursor-pointer"
              style={{ color: "#333" }}
              aria-label="Filter by department"
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
              <ChevronIcon />
            </span>
          </div>
        </div>

        {/* Team Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredMembers.map((member, index) => (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <Link
                  href={member.path ?? "#"}
                  className="group block"
                >
                  <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-5">
                      <p
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: "#717171" }}
                      >
                        {member.department}
                      </p>
                      <h3
                        className="mt-2 text-base font-semibold transition-colors group-hover:opacity-80"
                        style={{ color: "#0d365e" }}
                      >
                        {member.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div
            className="py-16 text-center rounded-xl border border-dashed border-gray-200"
            style={{ color: "#555" }}
          >
            <p className="text-base">No team members match your search.</p>
            <p className="mt-2 text-sm">Try adjusting your search or filter.</p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default TeamMembersSection;
