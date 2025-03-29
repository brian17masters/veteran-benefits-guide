
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-forestGreen text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8 overflow-hidden rounded bg-white flex items-center justify-center">
                <span className="text-forestGreen font-bold">FS</span>
              </div>
              <span className="font-bold text-lg">FidServe</span>
            </div>
            <p className="text-white/80 mb-4">
              Helping veterans navigate benefits and plan for their financial future.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Links</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/benefits" className="text-white/80 hover:text-white transition-colors">Benefits</Link></li>
              <li><Link to="/planning" className="text-white/80 hover:text-white transition-colors">Financial Planning</Link></li>
              <li><Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Resources</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">VA.gov</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Military OneSource</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Veterans Crisis Line</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">eBenefits</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Support</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>© {new Date().getFullYear()} FidServe. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This site is not affiliated with the U.S. Department of Veterans Affairs or any government agency.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
