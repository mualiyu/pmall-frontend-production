const PaginationControls = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    pageSize,
    setPageSize,
    currentPage,
    totalPages,
    setCurrentPage,
  }) => {
    return (
      <>
        {/* Search & Filters */}
        <div className="filters">
        className="search__bar w-200" 
        </div>
  
        {/* Sticky Pagination Footer */}
        <div className="pagination-footer">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>
  
          <span>
            Page {currentPage} of {totalPages}
          </span>
  
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </>
    );
  };
  
  export default PaginationControls;
  