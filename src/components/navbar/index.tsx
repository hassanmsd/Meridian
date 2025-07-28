import type React from "react";
import { Link } from "react-router-dom";

import ModeToggle from "./modeToggle";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-background border-b border-border p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="text-foreground font-bold text-xl">
          <Link to="/">Insight Board</Link>
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-center">
          <Link
            to="/linechart"
            className="text-foreground hover:text-primary transition-colors"
          >
            Line Chart
          </Link>
          <Link
            to="/radarchart"
            className="text-foreground hover:text-primary transition-colors"
          >
            Radar Chart
          </Link>
          <Link
            to="/datatable"
            className="text-foreground hover:text-primary transition-colors"
          >
            Data Table
          </Link>
        </div>

        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
