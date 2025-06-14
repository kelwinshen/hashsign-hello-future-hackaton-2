import { StatusBar } from ".";
import { Issuer, Signer } from "../assets";

const DocumentInfo = ({
  title,
  owner,
  signatories,
  signedSignatories,
  eMaterai,
  serialNumber,
}: {
  title: string;
  owner: string;
  signatories: string[];
  signedSignatories: string[];
  eMaterai: string[];
  serialNumber: number[];
}) => {
  
  return (
    <div className="bg-white rounded-lg py-6 px-4 md:px-6 shadow-sm w-full max-w-4xl mx-auto">
      {/* Title Section */}
      <h3 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">
        Agreement Details
      </h3>

      {/* Agreement Title and E-Materai */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Title */}
        <div>
          <h4 className="text-base font-semibold text-gray-600">Title</h4>
          <p className="text-sm font-medium text-gray-800 leading-relaxed">
            {title}
          </p>
        </div>

        {/* E-Materai */}
        <div className="flex flex-col items-start">
          <h4 className="text-base font-semibold text-gray-600 mb-2">
            E-Materai
          </h4>
          {eMaterai.length == 1 ?  (
            <>
              <div className="text-gray-800 text-sm leading-relaxed">
                <p>
                  <strong>Address NFT:</strong> {eMaterai}
                </p>
                <p>
                  <strong>Serial Number:</strong> {serialNumber?.toString()}
                </p>
              </div>
              {/* Clickable NFT Image */}
              <div className="mt-4">
                <a
                  href={`https://hashscan.io/testnet/token/${eMaterai}/${serialNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/bafkreiglkbptfzquzh4vs3gsf5ijutaiq5xrnhhe5ufnbkajvamw6gfeo4`}
                    alt="E-Materai NFT"
                    className="w-24 h-24 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </a>
              </div>
            </>
          ) : (
            <p className="text-gray-500 italic">Not Attached</p>
          )}
        </div>
      </div>

      {/* Owner and Signers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
        {/* Owner */}
        <div>
          <h4 className="text-base font-semibold text-gray-600 mb-2">Owner</h4>
          <div className="flex items-center gap-2 text-gray-800 text-sm justify-center">
            <img src={Issuer} alt="Owner" className="w-8 h-8" />
            <p className="truncate">{owner}</p>
          </div>
        </div>

        {/* Signers */}
        <div>
          <h4 className="text-base font-semibold text-gray-600 mb-2">Signers</h4>
          {signatories.map((signer, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-1 mb-4 text-gray-800 text-sm"
            >
              <div className="flex items-center gap-2 justify-center">
                <img src={Signer} alt="Signer" className="w-8 h-8" />
                <div>
                  <p className="truncate">{signer}</p>
                  <StatusBar>
                    {signedSignatories.includes(signer) ? "Signed" : "Not Signed"}
                  </StatusBar>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentInfo;
