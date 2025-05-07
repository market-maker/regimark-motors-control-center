
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DebtorsSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const DebtorsSearch: React.FC<DebtorsSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <Input
        placeholder="Search customers..."
        className="pl-10 w-full md:w-64"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default DebtorsSearch;
