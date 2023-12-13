export default function Page({ params }: { params: { userId: string } }) {
  return <div className="">My Post: {params.userId}</div>
}