interface Props {
  values: Array<{ id: number; name: string }> | undefined;
}

const MediaTags = ({ values }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {values?.map((value) => (
        <span
          key={value.id}
          className="bg-zinc-800 rounded-lg text-white text-sm font-light px-3 py-2"
        >
          {value.name}
        </span>
      ))}
    </div>
  );
};

export default MediaTags;
