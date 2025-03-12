import type { Paragraph } from "@/store/api";

type ParagraphProps = {
  p: Paragraph;
};

const Paragraph: React.FC<ParagraphProps> = (props) => {
  return (
    <div className="my-4 flex flex-col gap-1">
      {props.p.heading && (
        <h3 className="text-3xl font-semibold">{props.p.heading}</h3>
      )}
      <p className="text-lg ">{props.p.content}</p>
    </div>
  );
};

export default Paragraph;
