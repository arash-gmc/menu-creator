import { Avatar, Button, ContextMenu, DropdownMenu } from "@radix-ui/themes";
import React, { useContext } from "react";
import { UserContext } from "../../../Providers";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const manageMenuLinks: string[] = [
  "add",
  "edit",
  "price",
  "discount",
  "theme",
  "footnote",
];

const NavbarMenu = () => {
  const { t: tr, i18n } = useTranslation();
  const t = tr("dashboard.navbar") as any;

  const user = useContext(UserContext);
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="outline-none">
          <Avatar
            fallback={user.name[0].toUpperCase()}
            color="indigo"
            variant="solid"
            className="rounded-full"
            size="4"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => navigate("/dashboard")}>
          {t.home}
        </DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>{t.manage}</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            {manageMenuLinks.map((link) => (
              <DropdownMenu.Item
                key={link}
                onClick={() => navigate("/dashboard/" + link)}
              >
                {t[link]}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Item>{t.setting}</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>{t.signout}</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavbarMenu;
