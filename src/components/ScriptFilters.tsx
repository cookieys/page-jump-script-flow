
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface ScriptFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  selectedComplexity: string;
  onComplexityChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

const ScriptFilters = ({
  searchTerm,
  onSearchChange,
  selectedLanguage,
  onLanguageChange,
  selectedComplexity,
  onComplexityChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onClearFilters,
}: ScriptFiltersProps) => {
  const hasActiveFilters = selectedLanguage || selectedComplexity || selectedCategory || searchTerm;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search scripts..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filters:</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="Python">Python</SelectItem>
            <SelectItem value="JavaScript">JavaScript</SelectItem>
            <SelectItem value="Bash">Bash</SelectItem>
            <SelectItem value="PowerShell">PowerShell</SelectItem>
            <SelectItem value="Ruby">Ruby</SelectItem>
            <SelectItem value="Go">Go</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedComplexity} onValueChange={onComplexityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Complexity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Data Processing">Data Processing</SelectItem>
            <SelectItem value="File Management">File Management</SelectItem>
            <SelectItem value="Monitoring">Monitoring</SelectItem>
            <SelectItem value="System Administration">System Administration</SelectItem>
            <SelectItem value="Analytics">Analytics</SelectItem>
            <SelectItem value="Media Processing">Media Processing</SelectItem>
            <SelectItem value="Web Scraping">Web Scraping</SelectItem>
            <SelectItem value="Automation">Automation</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="complexity">Complexity</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScriptFilters;
