import { Avatar, Button, ContextMenu, DropdownMenu } from "@radix-ui/themes";
import React, { useContext } from "react";
import { UserContext } from "../Providers";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NavbarMenu = () => {
  const user = useContext(UserContext);
  const { t: tr, i18n } = useTranslation();
  const navigate = useNavigate();
  const t = tr("dashboard.navbar") as any;
  if (!user) return null;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button>
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
            <DropdownMenu.Item onClick={() => navigate("/dashboard/add")}>
              {t.add}
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => navigate("/dashboard/edit")}>
              {t.edit}
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => navigate("/dashboard/price")}>
              {t.price}
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => navigate("/dashboard/discount")}>
              {t.discount}
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => navigate("/dashboard/theme")}>
              {t.theme}
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => navigate("/dashboard/footnote")}>
              {t.footnote}
            </DropdownMenu.Item>
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
