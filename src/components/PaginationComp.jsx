"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation"

  
  const PaginationComp = () => {
    const searchParams = useSearchParams()
    const PAGE = searchParams.get("page") ?? 1
    const PER_PAGE = searchParams.get("per_page") ?? 5
    console.log(typeof PAGE);
    

    

    return (
        <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`/dashboard?page=${parseInt(PAGE)-1}&per_page=${parseInt(PER_PAGE)}`} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={`/dashboard?page=${parseInt(PAGE)}&per_page=${parseInt(PER_PAGE)}`}>{parseInt(PAGE)}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`/dashboard?page=${parseInt(PAGE)+1}&per_page=${parseInt(PER_PAGE)}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
    )
  }
  
  export default PaginationComp
  