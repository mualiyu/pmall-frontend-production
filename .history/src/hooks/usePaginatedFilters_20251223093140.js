import { useState, useMemo } from "react";

const usePaginatedFilter = ({
  data = [],
  searchKey = "",
  statusKey = "status",
  statusOptions = [], 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredData = useMemo(() => {
    let result = [...data];

    // if (searchTerm && searchKey) {
    //   result = result.filter((item) =>
    //     item?.[searchKey]
    //       ?.toLowerCase()
    //       .includes(searchTerm.toLowerCase())
    //   );
    // }

    if (searchTerm && searchKey) {
      const keys = Array.isArray(searchKey) ? searchKey : [searchKey];

      result = result.filter((item) =>
        keys.some((key) =>
          String(item?.[key] ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }

    if (statusFilter !== "") {
      result = result.filter(
        (item) => String(item?.[statusKey]) === String(statusFilter)
      );
    }

    return result;
  }, [data, searchTerm, statusFilter, searchKey, statusKey]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return {
    paginatedData,
    currentPage,
    totalPages,
    pageSize,
    searchTerm,
    statusFilter,
    statusOptions, 
    setSearchTerm,
    setStatusFilter,
    setCurrentPage,
    setPageSize,
  };
};

export default usePaginatedFilter;
