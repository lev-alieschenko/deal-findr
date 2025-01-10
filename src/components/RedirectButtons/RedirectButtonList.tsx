import RedirectButton from "./RedirectButton";

export default function RedirectButtonList({
  searchParams,
}: {
  searchParams: string[];
}) {
  return (
    <div className="w-full">
      {searchParams.map((searchParam, index) => (
        <RedirectButton text={searchParam} key={index} />
      ))}
    </div>
  );
}
