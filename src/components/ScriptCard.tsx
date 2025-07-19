
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Heart, Share2, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ScriptCardProps {
  script: {
    id: number;
    title: string;
    description: string;
    language: string;
    complexity: string;
    category: string;
    tags?: string[];
    fileName?: string;
    content?: string;
    isUserUploaded?: boolean;
    uploadedAt?: string;
  };
  onView: (script: any) => void;
  onDelete?: (id: number) => void;
}

const ScriptCard = ({ script, onView, onDelete }: ScriptCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();

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

  const handleDownload = () => {
    if (script.content && script.fileName) {
      const blob = new Blob([script.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = script.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: `${script.fileName} is being downloaded.`,
      });
    }
  };

  const handleCopyCode = async () => {
    if (script.content) {
      try {
        await navigator.clipboard.writeText(script.content);
        toast({
          title: "Copied to Clipboard",
          description: "Script code has been copied to your clipboard.",
        });
      } catch (err) {
        toast({
          title: "Copy Failed",
          description: "Unable to copy script code.",
          variant: "destructive",
        });
      }
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/script/${script.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: script.title,
          text: script.description,
          url: shareUrl,
        });
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Script link copied to clipboard.",
        });
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied",
        description: "Script link copied to clipboard.",
      });
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      description: `${script.title} ${isFavorited ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  const handleDelete = () => {
    if (onDelete && script.isUserUploaded) {
      onDelete(script.id);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300 group">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary bg-primary/10">
              {script.language}
            </Badge>
            {script.isUserUploaded && (
              <Badge variant="secondary">My Script</Badge>
            )}
          </div>
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
        {script.tags && script.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {script.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            {script.category}
          </span>
          {script.uploadedAt && (
            <span className="text-xs text-muted-foreground">
              {new Date(script.uploadedAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary-foreground hover:bg-primary"
            onClick={() => onView(script)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          {script.content && (
            <>
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                Copy
              </Button>
            </>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleFavorite}
            className={isFavorited ? "text-red-500" : ""}
          >
            <Heart className={`h-4 w-4 mr-1 ${isFavorited ? "fill-current" : ""}`} />
            {isFavorited ? "Favorited" : "Favorite"}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          {script.isUserUploaded && onDelete && (
            <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScriptCard;
