import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Script = () => {
  const navigate = useNavigate();

  const scripts = [
    {
      id: 1,
      title: "Data Processor",
      description: "Automated data cleaning and transformation script for CSV files",
      language: "Python",
      complexity: "Intermediate",
      category: "Data Processing"
    },
    {
      id: 2,
      title: "File Organizer",
      description: "Automatically organize files in directories by type and date",
      language: "JavaScript",
      complexity: "Beginner",
      category: "File Management"
    },
    {
      id: 3,
      title: "API Monitor",
      description: "Monitor API endpoints and send alerts when downtime is detected",
      language: "Python",
      complexity: "Advanced",
      category: "Monitoring"
    },
    {
      id: 4,
      title: "Backup Manager",
      description: "Automated backup solution with compression and cloud storage",
      language: "Bash",
      complexity: "Intermediate",
      category: "System Administration"
    },
    {
      id: 5,
      title: "Log Analyzer",
      description: "Parse and analyze server logs to identify patterns and issues",
      language: "Python",
      complexity: "Advanced",
      category: "Analytics"
    },
    {
      id: 6,
      title: "Image Resizer",
      description: "Batch resize images with watermark and format conversion",
      language: "JavaScript",
      complexity: "Beginner",
      category: "Media Processing"
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Beginner":
        return "text-primary";
      case "Intermediate":
        return "text-yellow-500";
      case "Advanced":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto pt-8 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Script Collection
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our curated collection of automation scripts and tools
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

        {/* Scripts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <Card key={script.id} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300 group">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {script.language}
                  </span>
                  <span className={`text-xs font-medium ${getComplexityColor(script.complexity)}`}>
                    {script.complexity}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {script.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {script.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {script.category}
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                    View Script
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
    </div>
  );
};

export default Script;