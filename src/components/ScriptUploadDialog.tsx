
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  language: z.string().min(1, "Language is required"),
  complexity: z.string().min(1, "Complexity is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
});

interface ScriptUploadDialogProps {
  onScriptUploaded: (script: any) => void;
}

const ScriptUploadDialog = ({ onScriptUploaded }: ScriptUploadDialogProps) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      language: "",
      complexity: "",
      category: "",
      tags: "",
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target?.result as string);
      };
      reader.readAsText(selectedFile);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    const newScript = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      language: values.language,
      complexity: values.complexity,
      category: values.category,
      tags: values.tags?.split(",").map(tag => tag.trim()) || [],
      fileName: file.name,
      content: fileContent,
      uploadedAt: new Date().toISOString(),
      isUserUploaded: true,
    };

    // Save to localStorage
    const existingScripts = JSON.parse(localStorage.getItem("userScripts") || "[]");
    const updatedScripts = [...existingScripts, newScript];
    localStorage.setItem("userScripts", JSON.stringify(updatedScripts));

    onScriptUploaded(newScript);
    
    toast({
      title: "Success",
      description: "Script uploaded successfully!",
    });

    // Reset form and close dialog
    form.reset();
    setFile(null);
    setFileContent("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" className="mb-6">
          <Upload className="h-4 w-4 mr-2" />
          Upload Script
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload New Script</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Script Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter script title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Programming Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Python">Python</SelectItem>
                        <SelectItem value="JavaScript">JavaScript</SelectItem>
                        <SelectItem value="Bash">Bash</SelectItem>
                        <SelectItem value="PowerShell">PowerShell</SelectItem>
                        <SelectItem value="Ruby">Ruby</SelectItem>
                        <SelectItem value="Go">Go</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe what your script does" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="complexity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complexity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select complexity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="automation, csv, data, backup" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Upload Script File</FormLabel>
              <div className="flex items-center space-x-4">
                <Input
                  type="file"
                  accept=".py,.js,.sh,.bat,.ps1,.rb,.go,.php,.java,.cpp,.c,.cs"
                  onChange={handleFileUpload}
                  className="flex-1"
                />
                {file && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-1" />
                    {file.name}
                  </div>
                )}
              </div>
              {fileContent && (
                <div className="mt-4">
                  <FormLabel>File Preview</FormLabel>
                  <div className="bg-muted p-4 rounded-md max-h-40 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap">{fileContent.slice(0, 500)}...</pre>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Upload Script</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScriptUploadDialog;
