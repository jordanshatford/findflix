interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <span className="bg-zinc-800 rounded-lg text-white text-sm font-light px-3 py-2 mr-2">
      {text}
    </span>
  );
};

export default Tag;
