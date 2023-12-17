import CommentForm from "./form";
import CommentList from "./list";
import useComments from "../../hooks/useComment";

export default function Comment() {
  const { text, setText, comments, onSubmit, onDelete } = useComments();

  return (
    <div className="mt-20">
      <CommentForm
        text={text}
        setText={setText}
        onSubmit={(e, rating) => onSubmit(e, rating)} // Pass rating to onSubmit
      />
      <CommentList comments={comments} onDelete={onDelete} />
    </div>
  );
}
