import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScriptUploadDialog from "@/components/ScriptUploadDialog";
import ScriptFilters from "@/components/ScriptFilters";
import ScriptCard from "@/components/ScriptCard";
import ScriptDetailDialog from "@/components/ScriptDetailDialog";
import { useToast } from "@/hooks/use-toast";

const Script = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedComplexity, setSelectedComplexity] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  // State for user scripts and selected script
  const [userScripts, setUserScripts] = useState([]);
  const [selectedScript, setSelectedScript] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Load user scripts from localStorage on component mount
  useEffect(() => {
    const savedScripts = localStorage.getItem("userScripts");
    if (savedScripts) {
      setUserScripts(JSON.parse(savedScripts));
    }
  }, []);

  // Curated scripts (existing ones)
  const curatedScripts = [
    {
      id: 1,
      title: "Data Processor",
      description: "Automated data cleaning and transformation script for CSV files",
      language: "Python",
      complexity: "Intermediate",
      category: "Data Processing",
      tags: ["csv", "data", "automation"],
      content: "# Data Processing Script\nimport pandas as pd\n\n\ndef process_data(file_path):\n    # Load CSV file\n    df = pd.read_csv(file_path)\n    # Clean and transform data\n    df = df.dropna()\n    return df\n\nif __name__ == '__main__':\n    process_data('data.csv')",
      fileName: "data_processor.py"
    },
    {
      id: 2,
      title: "File Organizer",
      description: "Automatically organize files in directories by type and date",
      language: "JavaScript",
      complexity: "Beginner",
      category: "File Management",
      tags: ["files", "organization", "automation"],
      content: "// File Organizer Script\nconst fs = require('fs');\nconst path = require('path');\n\nfunction organizeFiles(directory) {\n  const files = fs.readdirSync(directory);\n  // Organization logic here\n  console.log('Files organized successfully!');\n}\n\norganizeFiles('./downloads');",
      fileName: "file_organizer.js"
    },
    {
      id: 3,
      title: "API Monitor",
      description: "Monitor API endpoints and send alerts when downtime is detected",
      language: "Python",
      complexity: "Advanced",
      category: "Monitoring",
      tags: ["api", "monitoring", "alerts"],
      content: "# API Monitor Script\nimport requests\nimport time\n\n\ndef monitor_api(url):\n    try:\n        response = requests.get(url, timeout=10)\n        if response.status_code == 200:\n            print(f'API {url} is up!')\n        else:\n            print(f'API {url} returned {response.status_code}')\n    except Exception as e:\n        print(f'API {url} is down: {e}')\n\nwhile True:\n    monitor_api('https://api.example.com')\n    time.sleep(60)",
      fileName: "api_monitor.py"
    },
    {
      id: 4,
      title: "Backup Manager",
      description: "Automated backup solution with compression and cloud storage",
      language: "Bash",
      complexity: "Intermediate",
      category: "System Administration",
      tags: ["backup", "compression", "cloud"],
      content: "#!/bin/bash\n# Backup Manager Script\n\nBACKUP_DIR=\"/home/backups\"\nSOURCE_DIR=\"/home/user/documents\"\nDATE=$(date +%Y%m%d_%H%M%S)\n\n# Create backup\ntar -czf \"$BACKUP_DIR/backup_$DATE.tar.gz\" \"$SOURCE_DIR\"\n\necho \"Backup completed: backup_$DATE.tar.gz\"",
      fileName: "backup_manager.sh"
    },
    {
      id: 5,
      title: "Log Analyzer",
      description: "Parse and analyze server logs to identify patterns and issues",
      language: "Python",
      complexity: "Advanced",
      category: "Analytics",
      tags: ["logs", "analysis", "patterns"],
      content: "# Log Analyzer Script\nimport re\nfrom collections import Counter\n\n\ndef analyze_logs(log_file):\n    with open(log_file, 'r') as f:\n        logs = f.readlines()\n    \n    # Extract IP addresses\n    ip_pattern = r'\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b'\n    ips = []\n    for log in logs:\n        ips.extend(re.findall(ip_pattern, log))\n    \n    # Count occurrences\n    ip_counts = Counter(ips)\n    print('Top IPs:', ip_counts.most_common(10))\n\nanalyze_logs('/var/log/access.log')",
      fileName: "log_analyzer.py"
    },
    {
      id: 6,
      title: "Image Resizer",
      description: "Batch resize images with watermark and format conversion",
      language: "JavaScript",
      complexity: "Beginner",
      category: "Media Processing",
      tags: ["images", "resize", "batch"],
      content: "// Image Resizer Script\nconst sharp = require('sharp');\nconst fs = require('fs');\nconst path = require('path');\n\nasync function resizeImages(inputDir, outputDir, width, height) {\n  const files = fs.readdirSync(inputDir);\n  \n  for (const file of files) {\n    if (file.match(/\\.(jpg|jpeg|png|gif)$/i)) {\n      await sharp(path.join(inputDir, file))\n        .resize(width, height)\n        .toFile(path.join(outputDir, file));\n      console.log(`Resized: ${file}`);\n    }\n  }\n}\n\nresizeImages('./input', './output', 800, 600);",
      fileName: "image_resizer.js"
    }
  ];

  // Combine all scripts
  const allScripts = [...curatedScripts, ...userScripts];

  // Filter and sort scripts
  const filteredScripts = useMemo(() => {
    let filtered = allScripts.filter(script => {
      const matchesSearch = script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           script.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (script.tags && script.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesLanguage = selectedLanguage === "all" || script.language === selectedLanguage;
      const matchesComplexity = selectedComplexity === "all" || script.complexity === selectedComplexity;
      const matchesCategory = selectedCategory === "all" || script.category === selectedCategory;

      return matchesSearch && matchesLanguage && matchesComplexity && matchesCategory;
    });

    // Sort scripts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.uploadedAt || b.id).getTime() - new Date(a.uploadedAt || a.id).getTime();
        case "oldest":
          return new Date(a.uploadedAt || a.id).getTime() - new Date(b.uploadedAt || b.id).getTime();
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "complexity":
          const complexityOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
          return complexityOrder[a.complexity] - complexityOrder[b.complexity];
        default:
          return 0;
      }
    });

    return filtered;
  }, [allScripts, searchTerm, selectedLanguage, selectedComplexity, selectedCategory, sortBy]);

  // Filter user scripts and curated scripts separately
  const filteredUserScripts = filteredScripts.filter(script => script.isUserUploaded);
  const filteredCuratedScripts = filteredScripts.filter(script => !script.isUserUploaded);

  const handleScriptUploaded = (newScript) => {
    setUserScripts(prev => [...prev, newScript]);
    toast({
      title: "Script Uploaded",
      description: "Your script has been successfully uploaded and is now available in your collection.",
    });
  };

  const handleViewScript = (script) => {
    setSelectedScript(script);
    setDetailDialogOpen(true);
  };

  const handleDeleteScript = (scriptId) => {
    const updatedScripts = userScripts.filter(script => script.id !== scriptId);
    setUserScripts(updatedScripts);
    localStorage.setItem("userScripts", JSON.stringify(updatedScripts));
    
    toast({
      title: "Script Deleted",
      description: "The script has been removed from your collection.",
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLanguage("all");
    setSelectedComplexity("all");
    setSelectedCategory("all");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-4">
      <div className="max-w-6xl mx-auto pt-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Script Collection
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore and manage your automation scripts and tools
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="hidden md:block"
          >
            Back to Home
          </Button>
        </div>

        {/* Upload Button */}
        <div className="mb-8">
          <ScriptUploadDialog onScriptUploaded={handleScriptUploaded} />
        </div>

        {/* Filters */}
        <ScriptFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          selectedComplexity={selectedComplexity}
          onComplexityChange={setSelectedComplexity}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={clearFilters}
        />

        {/* Scripts Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Scripts ({filteredScripts.length})</TabsTrigger>
            <TabsTrigger value="my-scripts">My Scripts ({filteredUserScripts.length})</TabsTrigger>
            <TabsTrigger value="curated">Curated ({filteredCuratedScripts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredScripts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">No scripts found</p>
                <p className="text-muted-foreground">Try adjusting your search or filters, or upload a new script.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScripts.map((script) => (
                  <ScriptCard
                    key={script.id}
                    script={script}
                    onView={handleViewScript}
                    onDelete={script.isUserUploaded ? handleDeleteScript : undefined}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-scripts" className="space-y-6">
            {filteredUserScripts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">No uploaded scripts yet</p>
                <p className="text-muted-foreground mb-6">Upload your first script to get started!</p>
                <ScriptUploadDialog onScriptUploaded={handleScriptUploaded} />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUserScripts.map((script) => (
                  <ScriptCard
                    key={script.id}
                    script={script}
                    onView={handleViewScript}
                    onDelete={handleDeleteScript}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="curated" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCuratedScripts.map((script) => (
                <ScriptCard
                  key={script.id}
                  script={script}
                  onView={handleViewScript}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile Back Button */}
        <div className="mt-12 text-center md:hidden">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>

      {/* Script Detail Dialog */}
      <ScriptDetailDialog
        script={selectedScript}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </div>
  );
};

export default Script;
