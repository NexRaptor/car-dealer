import PregledAutomobila from "@/components/car-preview";
import React from "react";

const PagePrewiev = ({ params }: { params: { id: number } }) => {
  return <PregledAutomobila id={params.id} />;
};

export default PagePrewiev;
