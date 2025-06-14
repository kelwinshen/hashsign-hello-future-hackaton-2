import { HoverEffect } from "@/components/ui/card-hover-effect";

interface signDocumentProps {
  title: string;
  description: string;
  link: string;
}

export function GridBenefits({ ProductBenefit } : { ProductBenefit: signDocumentProps[] }) {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={ProductBenefit} />
    </div>
  );
}
  
  
