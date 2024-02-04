export default function DriverPage({ params }: { params: { driver: string } }) {
  return <h1>{params.driver}</h1>;
}
