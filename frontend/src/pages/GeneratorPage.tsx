import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BookOpen, ArrowLeft, Loader2, Copy, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const GeneratorPage = () => {
  const [abstract, setAbstract] = useState("");
  const [titleLength, setTitleLength] = useState("Medium");
  const [style, setStyle] = useState("Creative");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTitle, setGeneratedTitle] = useState("");

  const handleGenerate = async () => {
    if (!abstract.trim()) {
      toast({
        title: "Abstract Required",
        description: "Please enter your research abstract to generate a title.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          abstract,
          title_length: titleLength,
          style: style,
        }),
      });
      const data = await response.json();
      setGeneratedTitle(data.title);

      toast({
        title: "Title Generated!",
        description: "Your research title has been successfully generated.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your title. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTitle);
    toast({
      title: "Copied!",
      description: "Title copied to clipboard.",
    });
  };

  const regenerateTitle = () => {
    if (!isGenerating) {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fefcf3 0%, #fdf8f0 50%, #fcf5ed 100%)' }}>
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 hover:bg-amber-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              
              <span className="text-xl font-bold text-gray-800">Research Title Generator</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Generate Your Research Title
            </h1>
            <p className="text-lg text-gray-600">
              Paste your research abstract below and let AI create compelling titles for your work.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white border border-amber-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Research Abstract</CardTitle>
                <CardDescription className="text-gray-600">
                  Enter your research abstract to generate an impactful title
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Textarea
                    placeholder="Paste your research abstract here... The more detailed your abstract, the better the generated title will be."
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    className="min-h-[200px] resize-none border-amber-200 focus:border-gray-600 focus:ring-gray-600 bg-amber-25"
                    style={{ backgroundColor: '#fffef9' }}
                  />
                  <div className="text-sm text-gray-500 mt-2">
                    Characters: {abstract.length}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium text-gray-800" htmlFor="title-length-select">
                      Title Length
                    </Label>
                    <select
                      id="title-length-select"
                      value={titleLength}
                      onChange={e => setTitleLength(e.target.value)}
                      className="w-full mt-1 p-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 bg-amber-25 text-gray-800"
                      style={{ backgroundColor: '#fffef9' }}
                    >
                      <option value="Medium">Medium</option>
                      <option value="Long">Long</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-base font-medium text-gray-800" htmlFor="style-select">
                      Style
                    </Label>
                    <select
                      id="style-select"
                      value={style}
                      onChange={e => setStyle(e.target.value)}
                      className="w-full mt-1 p-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 bg-amber-25 text-gray-800"
                      style={{ backgroundColor: '#fffef9' }}
                    >
                      <option value="Neutral">Neutral</option>
                      <option value="Creative">Creative</option>
                      <option value="Technical">Technical</option>
                      
                    </select>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !abstract.trim()}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Title...
                    </>
                  ) : (
                    'Generate Title'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="bg-white border border-amber-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Generated Title</CardTitle>
                <CardDescription className="text-gray-600">
                  Your AI-generated research title will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="flex items-center justify-center h-48 border-2 border-dashed border-amber-200 rounded-xl bg-amber-25" style={{ backgroundColor: '#fffef9' }}>
                    <div className="text-center">
                      <Loader2 className="h-12 w-12 animate-spin text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-700">Analyzing your abstract...</p>
                      <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                    </div>
                  </div>
                ) : generatedTitle ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                      <p className="text-lg font-medium text-gray-800 leading-relaxed">
                        {generatedTitle}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="flex-1 border-amber-200 text-gray-700 hover:bg-amber-50"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Title
                      </Button>
                      <Button
                        onClick={regenerateTitle}
                        variant="outline"
                        className="flex-1 border-amber-200 text-gray-700 hover:bg-amber-50"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 border-2 border-dashed border-amber-200 rounded-xl bg-amber-25" style={{ backgroundColor: '#fffef9' }}>
                    <div className="text-center">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Your generated title will appear here</p>
                      <p className="text-sm text-gray-400 mt-2">Enter an abstract and click generate to start</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tips Section */}
          <Card className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-lg">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Tips for Better Results</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>• Detailed Abstracts:</strong> Include methodology, findings, and implications
                </div>
                <div>
                  <strong>• Temperature Control:</strong> Lower values for formal titles, higher for creative ones
                </div>
                <div>
                  <strong>• Clear Context:</strong> Mention your research field and target audience
                </div>
                <div>
                  <strong>• Key Findings:</strong> Highlight your most significant discoveries
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GeneratorPage;
