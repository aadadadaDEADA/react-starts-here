import { Code, Laptop, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Fast Development",
    description: "Build and iterate quickly with our intuitive development environment.",
    icon: Zap,
  },
  {
    title: "Modern Stack",
    description: "Use the latest web technologies and best practices out of the box.",
    icon: Laptop,
  },
  {
    title: "Clean Code",
    description: "Write maintainable code with TypeScript and modern React patterns.",
    icon: Code,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg bg-background hover:shadow-xl transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};