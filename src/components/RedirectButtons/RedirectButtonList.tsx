import RedirectButton from "./RedirectButton";

export default function RedirectButtonList({
  searchParams,
  cid,
  clickid,
}: {
  searchParams: string[];
  cid: string;
  clickid: string;
}) {
  return (
    <div className="w-full">
      {searchParams.map((searchParam, index) => (
        <RedirectButton text={searchParam} key={index} isFirst={index === 0} cid={cid} clickid={clickid} />
      ))}
    </div>
  );
}
