
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Copy, Heart, Share2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ScriptDetailDialogProps {
  script: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScriptDetailDialog = ({ script, open, onOpenChange }: ScriptDetailDialogProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();

  if (!script) return null;

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

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      description: `${script.title} ${isFavorited ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl">{script.title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-primary bg-primary/10">
                  {script.language}
                </Badge>
                <span className={`text-sm font-medium ${getComplexityColor(script.complexity)}`}>
                  {script.complexity}
                </span>
                <Badge variant="secondary">{script.category}</Badge>
                {script.isUserUploaded && (
                  <Badge variant="outline">My Script</Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{script.description}</p>
          </div>

          {script.tags && script.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {script.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {script.content && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Code</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyCode}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Code
                  </Button>
                  {script.fileName && (
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm whitespace-pre-wrap">
                  <code>{script.content}</code>
                </pre>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleFavorite}
                className={isFavorited ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${isFavorited ? "fill-current" : ""}`} />
                {isFavorited ? "Favorited" : "Add to Favorites"}
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-1" />
                Share Script
              </Button>
            </div>
            {script.uploadedAt && (
              <span className="text-sm text-muted-foreground">
                Uploaded: {new Date(script.uploadedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScriptDetailDialog;
