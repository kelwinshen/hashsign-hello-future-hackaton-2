import { Icon } from "@iconify/react/dist/iconify.js";
import StatusBar from "./statusBar";


interface AllDocumentProps {
  documentContent: {
    id: number;
    role: string;
    nameDocument: string;
    agreementStatus: string;
    signStatus: string;
  }[];
  onRowClick: (id: number) => void; // Function to handle row click
}

const AllDocument: React.FC<AllDocumentProps> = ({ documentContent, onRowClick }) => {
  return (
    <section className="px-2 md:px-8">
      {/* Header */}
      <div className="border-b border-black/30 py-8">
        <h3 className="text-xl font-semibold">Agreements</h3>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto pb-8">
        <table className="w-full table-auto border-collapse text-left mt-4">
          {/* Table Head */}
          <thead>
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-black text-center">ID</th>
              <th className="px-4 py-3 text-sm font-medium text-black">Agreement Name</th>
              <th className="px-4 py-3 text-sm font-medium text-black text-center">
                Your Sign Status
              </th>
              <th className="px-4 py-3 text-sm font-medium text-black text-center">
                Agreement Status
              </th>
              <th className="px-4 py-3 text-sm font-medium text-black"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {documentContent.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-primaryColor/10 cursor-pointer"
                onClick={() => onRowClick(item.id)} // Handle row click
              >
                <td className="px-4 py-3 text-center">{item.id}</td>
                <td className="px-4 py-3 flex flex-row items-center gap-2">
                  <img src={item.role} alt="Role Icon" width={30} height={30} />
                  {item.nameDocument}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBar>{item.signStatus}</StatusBar>
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBar>{item.agreementStatus}</StatusBar>
                </td>
                <td className="hidden md:flex px-4 py-3 text-black cursor-pointer">
                  <Icon icon="solar:menu-dots-bold" width={24} height={24} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllDocument;
