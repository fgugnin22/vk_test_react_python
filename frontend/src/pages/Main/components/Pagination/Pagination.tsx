import { Button } from "@/shared";

type PaginationProps = {
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  createHandler: (arg0: "previous" | "next") => () => void;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-auto">
      <Button
        disabled={props.isPrevDisabled}
        onClick={props.createHandler("previous")}
        className=" w-32"
      >
        Previous
      </Button>
      <Button
        disabled={props.isNextDisabled}
        onClick={props.createHandler("next")}
        className=" w-32"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
