const PagePropertyID = async ({ params }) => {
  const { id } = await params;
  return <div>PagePropertyID {[id]}</div>;
};

export default PagePropertyID;
