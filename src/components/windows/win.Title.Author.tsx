import React, { useState } from "react";
import Window from "../home/Window";

const AuthorsWindow: React.FC = () => (
  <Window
    title="Authors"
    id="authors-window"
    canMinimize={false}
    canMaximize={false}
    canClose
  >
    <div className="my-4">
      <h3 className="sr-only">Authors</h3>
      <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 list-none text-[#2c3e50] text-sm sm:text-base">
        <li className="font-semibold">by III-ACSAD:</li>
        <li className="hover:text-[#0054e3] transition-colors cursor-pointer hover:underline">
          Baluyut
        </li>
        <li className="hover:text-[#0054e3] transition-colors cursor-pointer hover:underline">
          Siazon
        </li>
        <li className="hover:text-[#0054e3] transition-colors cursor-pointer hover:underline">
          Villarosa
        </li>
      </ul>
    </div>
  </Window>
);
export default AuthorsWindow;
