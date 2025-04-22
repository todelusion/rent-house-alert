"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProperties, searchProperties } from "@/lib/property-service";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";
import { PropertyFilters } from "@/components/property-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000,
    rooms: 0,
    riskLevel: "",
  });
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["properties", lastVisible, filters],
    queryFn: () => getProperties(lastVisible, 10, filters),
    enabled: !isSearching,
  });

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ["propertySearch", searchTerm],
    queryFn: () => searchProperties(searchTerm),
    enabled: isSearching && searchTerm.length > 0,
  });

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (data && !isSearching) {
      setAllProperties((prev) =>
        lastVisible ? [...prev, ...data.properties] : data.properties
      );
      setHasMore(data.hasMore);
      setLastVisible(data.lastVisible);
    }
  }, [data, isSearching]);

  useEffect(() => {
    if (searchResults && isSearching) {
      setAllProperties(searchResults);
      setHasMore(false);
    }
  }, [searchResults, isSearching]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setAllProperties([]);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setLastVisible(null);
    setAllProperties([]);
    setIsSearching(false);
  };

  const handleLoadMore = () => {
    refetch();
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setLastVisible(null);
    setAllProperties([]);
    refetch();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <PropertyFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className="w-full md:w-2/3">
              <form onSubmit={handleSearch} className="flex w-full mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="搜尋地址、社區或房東名稱..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit" className="ml-2">
                  搜尋
                </Button>
                {isSearching && (
                  <Button
                    type="button"
                    variant="outline"
                    className="ml-2"
                    onClick={handleClearSearch}
                  >
                    清除
                  </Button>
                )}
              </form>

              {isLoading || isSearchLoading ? (
                <div className="text-center py-12">載入中...</div>
              ) : error ? (
                <div className="text-center py-12 text-red-500">
                  發生錯誤，請稍後再試
                </div>
              ) : allProperties.length === 0 ? (
                <div className="text-center py-12">沒有找到符合條件的房源</div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {allProperties.map((property, index) => (
                    <PropertyCard key={index} property={property} />
                  ))}
                  {hasMore && !isSearching && (
                    <div className="flex justify-center mt-6">
                      <Button onClick={handleLoadMore}>載入更多</Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
