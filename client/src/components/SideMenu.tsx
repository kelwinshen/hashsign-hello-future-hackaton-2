import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface SideMenuProps {
  onMenuClick: (menu: string) => void;
  activeMenu: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ onMenuClick, activeMenu }) => {
  const contentMenu = [
    {
      name: "Create Agreement",
      icon: "carbon:document-add",
      menu: "create",
    },
    {
      name: "Completed Agreement",
      icon: "mdi:file-document-outline",
      menu: "completed",
    },
    {
      name: "Progress",
      icon: "tabler:progress",
      menu: "progress",
    },
    {
      name: "Materai Store",
      icon: "mdi:store-outline",
      menu: "store",
    
    },
  ];
  const navigate = useNavigate();
  return (
    <nav className="xl:w-1/6 bg-white relative pt-8">
      <ul className="flex flex-col gap-4 px-5">
        {contentMenu.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              if (item.menu == "store") {
                navigate("/stamp-store")
              } else {
                onMenuClick(item.menu!);
              }
            }}
            className={`flex items-center gap-2 cursor-pointer p-4 rounded-lg ${
              activeMenu === item.menu
                ? "bg-black/5 text-primaryColor font-medium"
                : "text-black hover:bg-black/5 hover:text-black"
            }`}
          >
            <Icon icon={item.icon} width="24" height="24" />
            <span className="hidden xl:block">{item.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;
