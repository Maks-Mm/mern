import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-6 p-4">
        <NavLink to="/">
        <img
            alt="Logo"
            className="h-10 sm:h-12 max-w-full"
            src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
          />
        </NavLink>

        <NavLink
          className="inline-flex items-center justify-center h-9 rounded-md border border-input bg-background px-3 sm:px-4 text-sm sm:text-md font-medium hover:bg-slate-100"
          to="/create"
        >
          Create Employee
        </NavLink>
      </nav>
    </div>
  );
}
