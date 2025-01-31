import RedirectButton from "./RedirectButton";

export default function RedirectButtonList({
  searchParams,
  cid,
}: {
  searchParams: string[];
  cid: string;
}) {
  return (
    <div className="w-full">
      {searchParams.map((searchParam, index) => (
        <RedirectButton text={searchParam} key={index} isFirst={index === 0} cid={cid} />
      ))}
    </div>
  );
}
