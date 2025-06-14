const DocumentPreview = ({ ipfsHash }: { ipfsHash?: string }) => {
  if (!ipfsHash) return <p>No document attached.</p>;

  return (
    <iframe
      src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
      width="100%"
      height="500px"
      className="border rounded"
    />
  );
};

export default DocumentPreview;
