import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleScriptRedirect = () => {
    navigate("/script");
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Script Hub
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your one-stop destination for powerful scripts and automation tools. 
            Streamline your workflow with our curated collection.
          </p>
        </div>

        {/* CTA Section */}
        <div className="space-y-6">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleScriptRedirect}
            className="text-lg px-12 py-6 h-auto"
          >
            Explore Scripts
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Discover powerful automation tools and scripts
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Optimized scripts that run efficiently and save you time
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Reliable</h3>
            <p className="text-muted-foreground">
              Battle-tested scripts with comprehensive error handling
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Customizable</h3>
            <p className="text-muted-foreground">
              Easily modify and adapt scripts to fit your specific needs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
