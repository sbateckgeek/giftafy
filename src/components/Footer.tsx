
import React from 'react';
import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="py-16 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-light tracking-tight text-white">
                <span className="text-primary">Gift</span>afy
              </span>
            </div>
            <p className="text-white/60 mb-4 text-sm">
              Making gift-giving meaningful with the power of AI.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-primary">Twitter</a>
              <a href="#" className="text-white/60 hover:text-primary">Instagram</a>
              <a href="#" className="text-white/60 hover:text-primary">LinkedIn</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/80">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/60 hover:text-primary text-sm">Features</a></li>
              <li><a href="#how-it-works" className="text-white/60 hover:text-primary text-sm">How It Works</a></li>
              <li><a href="#pricing" className="text-white/60 hover:text-primary text-sm">Pricing</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-primary text-sm">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/80">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-white/60 hover:text-primary text-sm">Blog</a></li>
              <li><a href="/about" className="text-white/60 hover:text-primary text-sm">About Us</a></li>
              <li><a href="/contact" className="text-white/60 hover:text-primary text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/80">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-primary text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary text-sm">Cookies Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Giftafy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
