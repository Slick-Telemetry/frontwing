export default function SessionPage({
  params,
}: {
  params: { session: string };
}) {
  return <h1>{params.session}</h1>;
}
