import { useState, useMemo, useEffect } from "react";

const usePaginatedFilter = ({
  data = [],
  searchKey = "name",
  initialPageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item[searchKey]
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status == statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter, searchKey]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / pageSize),
    [filteredData, pageSize]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, pageSize]);

  return {
    paginatedData,
    currentPage,
    totalPages,
    pageSize,
    searchTerm,
    statusFilter,
    setCurrentPage,
    setPageSize,
    setSearchTerm,
    setStatusFilter,
    totalCount: filteredData.length,
  };
};

export default usePaginatedFilter;
